<?php

namespace App\Actions\Users;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class SaveUser
{
    /** Serialize mutations on all admin rows, in a consistent order. */
    private function lockAdmins(): void
    {
        User::where('role', UserRole::Admin->value)->orderBy('id')->lockForUpdate()->get();
    }

    private function preserveAdmin(User $user, string $role, bool $active): void
    {
        if ($user->role === UserRole::Admin && $user->is_active && ($role !== UserRole::Admin->value || ! $active)
            && ! User::where('role', UserRole::Admin->value)->where('is_active', true)->whereKeyNot($user->id)->exists()) {
            throw ValidationException::withMessages(['role' => 'É necessário preservar pelo menos um administrador ativo.']);
        }
    }

    public function update(User $user, array $data, ?User $actor = null): User
    {
        return DB::transaction(function () use ($user, $data, $actor) {
            $this->lockAdmins();
            $user = User::whereKey($user->id)->lockForUpdate()->firstOrFail();
            if ($actor && $actor->id === $user->id && $data['role'] !== $user->role->value) {
                throw ValidationException::withMessages(['role' => 'Você não pode alterar sua própria role.']);
            }
            $this->preserveAdmin($user, $data['role'], (bool) $data['is_active']);
            $user->fill(collect($data)->only(['name', 'username', 'email'])->all());
            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }
            $user->role = UserRole::from($data['role']);
            $user->is_active = $data['is_active'];
            $user->save();

            return $user;
        }, 3);
    }

    public function delete(User $user): void
    {
        DB::transaction(function () use ($user) {
            $this->lockAdmins();
            $user = User::whereKey($user->id)->lockForUpdate()->firstOrFail();
            $this->preserveAdmin($user, UserRole::User->value, false);
            $user->delete();
        }, 3);
    }
}
