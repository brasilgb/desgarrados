import { Head, Link, useForm, usePage } from "@inertiajs/react";
import type { FormEvent } from "react";
import type { AdminUser } from "./index";
type Props = { user: AdminUser | null; roles: AdminUser["role"][] };
export default function UserForm({ user, roles }: Props) {
    const { auth } = usePage().props;
    const form = useForm({
        name: user?.name ?? "",
        username: user?.username ?? "",
        email: user?.email ?? "",
        role: user?.role ?? "user",
        is_active: user?.is_active ?? true,
        password: "",
        password_confirmation: "",
    });
    const submit = (event: FormEvent) => {
        event.preventDefault();
        if (user) {
            form.transform(
                ({
                    password: _password,
                    password_confirmation: _confirmation,
                    ...data
                }) => data,
            );
            form.put(`/admin/users/${user.id}`);
        } else {
            form.post("/admin/users", {
                onFinish: () => form.reset("password", "password_confirmation"),
            });
        }
    };
    return (
        <>
            <Head title={user ? "Editar usuário" : "Criar usuário"} />
            <h1 className="mb-5 text-2xl">
                {user ? "Editar usuário" : "Criar usuário"}
            </h1>
            <form onSubmit={submit} className="max-w-lg space-y-4">
                {(["name", "username", "email"] as const).map((key) => (
                    <label key={key} className="block">
                        {
                            {
                                name: "Nome",
                                username: "Username",
                                email: "Email",
                            }[key]
                        }
                        <input
                            className="mt-1 block w-full rounded border p-2"
                            type={key === "email" ? "email" : "text"}
                            required={key !== "username"}
                            value={form.data[key]}
                            onChange={(e) => form.setData(key, e.target.value)}
                        />
                        {form.errors[key] && (
                            <span role="alert">{form.errors[key]}</span>
                        )}
                    </label>
                ))}
                <label className="block">
                    Role
                    <select
                        className="ml-3 rounded border p-2"
                        disabled={user?.id === auth.user.id}
                        value={form.data.role}
                        onChange={(e) =>
                            form.setData(
                                "role",
                                e.target.value as AdminUser["role"],
                            )
                        }
                    >
                        {roles.map((role) => (
                            <option key={role}>{role}</option>
                        ))}
                    </select>
                    {form.errors.role && (
                        <span role="alert">{form.errors.role}</span>
                    )}
                </label>
                <label className="block">
                    <input
                        type="checkbox"
                        checked={form.data.is_active}
                        onChange={(e) =>
                            form.setData("is_active", e.target.checked)
                        }
                    />{" "}
                    Conta ativa
                </label>
                {form.errors.is_active && (
                    <p role="alert">{form.errors.is_active}</p>
                )}
                {!user &&
                    (["password", "password_confirmation"] as const).map(
                        (key) => (
                            <label className="block" key={key}>
                                {key === "password"
                                    ? "Senha"
                                    : "Confirmar senha"}
                                <input
                                    className="mt-1 block w-full rounded border p-2"
                                    type="password"
                                    autoComplete="new-password"
                                    minLength={12}
                                    required
                                    value={form.data[key]}
                                    onChange={(e) =>
                                        form.setData(key, e.target.value)
                                    }
                                />
                                {form.errors[key] && (
                                    <span role="alert">{form.errors[key]}</span>
                                )}
                            </label>
                        ),
                    )}
                <div className="flex gap-4">
                    <button
                        className="rounded bg-black px-4 py-2 text-white"
                        disabled={form.processing}
                    >
                        Salvar
                    </button>
                    <Link href="/admin/users">Cancelar</Link>
                </div>
            </form>
        </>
    );
}
