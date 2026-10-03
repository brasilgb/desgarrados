<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Users\SaveUser;
use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreUserRequest;
use App\Http\Requests\Admin\UpdateUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        Gate::authorize('viewAny', User::class);

        return Inertia::render('admin/users/index', ['users' => User::orderBy('id')->paginate(15, ['id', 'name', 'username', 'email', 'role', 'is_active', 'email_verified_at'])]);
    }

    public function create()
    {
        Gate::authorize('create', User::class);

        return Inertia::render('admin/users/form', ['roles' => UserRole::cases(), 'user' => null]);
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $user = new User(collect($data)->only(['name', 'username', 'email', 'password'])->all());
        $user->role = UserRole::from($data['role']);
        $user->is_active = $data['is_active'];
        $user->save();
        $user->sendEmailVerificationNotification();

        return to_route('admin.users.index')->with('success', 'Usuário criado. Verificação de email enviada.');
    }

    public function edit(User $user)
    {
        Gate::authorize('update', $user);

        return Inertia::render('admin/users/form', ['user' => $user->only(['id', 'name', 'username', 'email', 'role', 'is_active']), 'roles' => UserRole::cases()]);
    }

    public function update(UpdateUserRequest $request, User $user, SaveUser $save)
    {
        $email = $user->email;
        $user = $save->update($user, $request->validated(), $request->user());
        if ($email !== $user->email) {
            $user->sendEmailVerificationNotification();
        }

        return to_route('admin.users.index')->with('success', 'Usuário atualizado.');
    }

    public function destroy(User $user, SaveUser $save)
    {
        Gate::authorize('delete', $user);
        $save->delete($user);

        return to_route('admin.users.index')->with('success', 'Usuário excluído.');
    }
}
