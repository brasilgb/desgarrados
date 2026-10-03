<?php

namespace App\Console\Commands;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class CreateAdmin extends Command
{
    protected $signature = 'app:create-admin';

    protected $description = 'Cria um administrador com senha interativa e email verificado';

    public function handle(): int
    {
        if (! $this->input->isInteractive()) {
            $this->error('Use um terminal interativo.');

            return self::FAILURE;
        }
        $data = ['name' => $this->ask('Nome'), 'email' => strtolower(trim($this->ask('Email') ?? '')), 'password' => $this->secret('Senha (mínimo 12 caracteres)'), 'password_confirmation' => $this->secret('Confirme a senha')];
        $validator = Validator::make($data, ['name' => ['required', 'string', 'max:255'], 'email' => ['required', 'email', 'max:255', 'unique:users,email'], 'password' => ['required', 'confirmed', Password::min(12)]]);
        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $error) {
                $this->error($error);
            }

return self::FAILURE;
        }
        $user = new User(collect($data)->only(['name', 'email', 'password'])->all());
        $user->role = UserRole::Admin;
        $user->is_active = true;
        $user->email_verified_at = now();
        $user->save();
        $this->info('Administrador criado.');

        return self::SUCCESS;
    }
}
