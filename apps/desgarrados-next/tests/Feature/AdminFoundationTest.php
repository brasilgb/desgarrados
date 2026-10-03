<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminFoundationTest extends TestCase
{
    use RefreshDatabase;

    private function user(UserRole $role = UserRole::Admin, array $data = []): User
    {
        return User::factory()->create(['role' => $role, 'is_active' => true, ...$data]);
    }

    private function payload(User $user, array $data = []): array
    {
        return ['name' => $user->name, 'email' => $user->email, 'username' => $user->username, 'role' => $user->role->value, 'is_active' => $user->is_active, ...$data];
    }

    public function test_guest_cannot_access_admin(): void
    {
        $this->get('/admin')->assertRedirect('/login');
    }

    public function test_regular_user_cannot_access_admin(): void
    {
        $this->actingAs($this->user(UserRole::User))->get('/admin')->assertForbidden();
    }

    public function test_editor_can_access_admin_but_not_users(): void
    {
        $editor = $this->user(UserRole::Editor);
        $this->actingAs($editor)->get('/admin')->assertOk()->assertInertia(fn (Assert $page) => $page->component('admin/dashboard')->where('capabilities.accessAdmin', true)->where('capabilities.manageUsers', false));
        $target = $this->user();
        $this->get('/admin/users')->assertForbidden();
        $this->get('/admin/users/create')->assertForbidden();
        $this->get("/admin/users/{$target->id}/edit")->assertForbidden();
        $this->put("/admin/users/{$target->id}", $this->payload($target))->assertForbidden();
        $this->delete("/admin/users/{$target->id}")->assertForbidden();
        $this->post('/admin/users', $this->payload($target))->assertForbidden();
    }

    public function test_admin_can_manage_users(): void
    {
        $admin = $this->user();
        $this->actingAs($admin)->get('/admin')->assertOk()->assertInertia(fn (Assert $page) => $page->where('capabilities.manageUsers', true)->missing('auth.user.password')->missing('auth.user.two_factor_secret'));
        $this->get('/admin/users')->assertOk();
        $this->get('/admin/users/create')->assertOk();
        $this->post('/admin/users', ['name' => 'New User', 'username' => 'new_user', 'email' => 'new@example.com', 'role' => 'editor', 'is_active' => true, 'password' => 'LongPassword123!', 'password_confirmation' => 'LongPassword123!'])->assertRedirect('/admin/users');
        $new = User::where('email', 'new@example.com')->firstOrFail();
        $this->assertTrue(Hash::check('LongPassword123!', $new->password));
        $this->assertNull($new->email_verified_at);
        $this->get("/admin/users/{$new->id}/edit")->assertOk();
        $this->put("/admin/users/{$new->id}", $this->payload($new, ['role' => 'user', 'is_active' => false]))->assertRedirect('/admin/users');
        $this->assertFalse($new->fresh()->is_active);
        $this->assertSame(UserRole::User, $new->fresh()->role);
        $this->delete("/admin/users/{$new->id}")->assertRedirect('/admin/users');
        $this->assertModelMissing($new);
    }

    public function test_inactive_user_cannot_login(): void
    {
        $user = $this->user(data: ['is_active' => false]);
        $this->post('/login', ['email' => $user->email, 'password' => 'password'])->assertSessionHasErrors('email');
        $this->assertGuest();
    }

    public function test_existing_session_is_revoked_after_deactivation(): void
    {
        $user = $this->user();
        $this->actingAs($user)->get('/admin')->assertOk();
        $user->is_active = false;
        $user->save();
        $this->get('/admin')->assertRedirect('/login');
        $this->assertGuest();
    }

    public function test_unverified_admin_is_blocked(): void
    {
        $this->actingAs($this->user(data: ['email_verified_at' => null]))->get('/admin')->assertRedirect('/email/verify');
    }

    public function test_privileges_are_not_mass_assignable(): void
    {
        $user = new User(['name' => 'User', 'email' => 'user@example.com', 'password' => 'password', 'role' => 'admin', 'is_active' => false]);
        $this->assertSame(UserRole::User, $user->role);
        $this->assertTrue($user->is_active);
        $user->save();
        $this->assertSame(UserRole::User, $user->fresh()->role);
        $this->assertTrue($user->fresh()->is_active);
    }

    public function test_regular_user_cannot_change_role_via_admin_or_profile(): void
    {
        $user = $this->user(UserRole::User);
        $this->actingAs($user)->put("/admin/users/{$user->id}", $this->payload($user, ['role' => 'admin']))->assertForbidden();
        $this->patch('/settings/profile', ['name' => $user->name, 'email' => $user->email, 'role' => 'admin', 'is_active' => false])->assertRedirect();
        $this->assertSame(UserRole::User, $user->fresh()->role);
        $this->assertTrue($user->fresh()->is_active);
    }

    public function test_admin_cannot_change_own_role_even_with_other_admin(): void
    {
        $admin = $this->user();
        $this->user();
        $this->actingAs($admin)->put("/admin/users/{$admin->id}", $this->payload($admin, ['role' => 'user']))->assertSessionHasErrors('role');
        $this->assertSame(UserRole::Admin, $admin->fresh()->role);
    }

    public function test_last_admin_cannot_be_deactivated_demoted_or_deleted(): void
    {
        $admin = $this->user();
        $this->actingAs($admin);
        $this->put("/admin/users/{$admin->id}", $this->payload($admin, ['is_active' => false]))->assertSessionHasErrors('role');
        $this->put("/admin/users/{$admin->id}", $this->payload($admin, ['role' => 'editor']))->assertSessionHasErrors('role');
        $this->delete("/admin/users/{$admin->id}")->assertSessionHasErrors('role');
        $this->delete('/settings/profile', ['password' => 'password'])->assertSessionHasErrors('role');
        $this->assertAuthenticatedAs($admin);
        $this->assertTrue($admin->fresh()->is_active);
    }

    public function test_admin_can_demote_or_deactivate_another_admin_when_one_remains(): void
    {
        $admin = $this->user();
        $other = $this->user();
        $this->actingAs($admin)->put("/admin/users/{$other->id}", $this->payload($other, ['role' => 'editor', 'is_active' => false]))->assertRedirect('/admin/users');
        $this->assertSame(UserRole::Editor, $other->fresh()->role);
    }

    public function test_duplicate_email_username_and_invalid_role_are_rejected(): void
    {
        $admin = $this->user(data: ['username' => 'existing']);
        $target = $this->user(UserRole::User);
        $this->actingAs($admin)->put("/admin/users/{$target->id}", $this->payload($target, ['email' => $admin->email, 'username' => 'existing', 'role' => 'invalid']))->assertSessionHasErrors(['email', 'username', 'role']);
        $this->post('/admin/users', ['name' => 'New', 'email' => $admin->email, 'username' => 'existing', 'role' => 'invalid', 'is_active' => true, 'password' => 'LongPassword123!', 'password_confirmation' => 'LongPassword123!'])->assertSessionHasErrors(['email', 'username', 'role']);
    }

    public function test_admin_edit_does_not_accept_password_or_verification_timestamp(): void
    {
        $admin = $this->user();
        $target = $this->user(UserRole::User);
        $this->actingAs($admin)->put("/admin/users/{$target->id}", $this->payload($target, ['password' => 'replacement', 'email_verified_at' => now()->toDateTimeString()]))->assertSessionHasErrors(['password', 'email_verified_at']);
        $this->assertTrue(Hash::check('password', $target->fresh()->password));
    }

    public function test_email_change_revokes_verification(): void
    {
        $admin = $this->user();
        $target = $this->user(UserRole::User);
        $this->actingAs($admin)->put("/admin/users/{$target->id}", $this->payload($target, ['email' => 'changed@example.com']))->assertRedirect('/admin/users');
        $this->assertNull($target->fresh()->email_verified_at);
    }

    public function test_create_admin_command_uses_interactive_password(): void
    {
        $this->artisan('app:create-admin')->expectsQuestion('Nome', 'Admin')->expectsQuestion('Email', 'admin@example.com')->expectsQuestion('Senha (mínimo 12 caracteres)', 'LongPassword123!')->expectsQuestion('Confirme a senha', 'LongPassword123!')->expectsOutput('Administrador criado.')->assertSuccessful();
        $admin = User::where('email', 'admin@example.com')->firstOrFail();
        $this->assertSame(UserRole::Admin, $admin->role);
        $this->assertTrue($admin->hasVerifiedEmail());
        $this->assertTrue(Hash::check('LongPassword123!', $admin->password));
    }

    public function test_create_admin_command_rejects_duplicate_email(): void
    {
        $user = $this->user();
        $this->artisan('app:create-admin')->expectsQuestion('Nome', 'Admin')->expectsQuestion('Email', $user->email)->expectsQuestion('Senha (mínimo 12 caracteres)', 'LongPassword123!')->expectsQuestion('Confirme a senha', 'LongPassword123!')->assertFailed();
        $this->assertDatabaseCount('users', 1);
    }

    public function test_real_login_attempts_are_rate_limited(): void
    {
        $user = $this->user(UserRole::User);
        for ($attempt = 0; $attempt < 5; $attempt++) {
            $this->post('/login', ['email' => $user->email, 'password' => 'wrong'])->assertSessionHasErrors('email');
        }
        $this->post('/login', ['email' => $user->email, 'password' => 'password'])->assertTooManyRequests();
        $this->assertGuest();
    }

    public function test_inactive_admin_does_not_satisfy_last_admin_invariant(): void
    {
        $active = $this->user();
        $this->user(data: ['is_active' => false]);
        $this->actingAs($active)->delete("/admin/users/{$active->id}")->assertSessionHasErrors('role');
        $this->assertModelExists($active);
    }
}
