import { Link, usePage, router } from "@inertiajs/react";
import type { PropsWithChildren } from "react";
export default function AdminLayout({ children }: PropsWithChildren) {
    const { capabilities, flash, errors } = usePage().props;
    return (
        <div className="mx-auto max-w-5xl p-6">
            <header className="mb-8 flex flex-wrap gap-5">
                <Link href="/">Desgarrados</Link>
                {capabilities.accessAdmin && <Link href="/admin">Painel</Link>}
                {capabilities.manageUsers && (
                    <Link href="/admin/users">Usuários</Link>
                )}
                <Link href="/settings/profile">Perfil</Link>
                <button onClick={() => router.post("/logout")}>Sair</button>
            </header>
            {flash.success && (
                <p role="status" className="mb-4 text-green-700">
                    {flash.success}
                </p>
            )}
            {errors.role && (
                <p role="alert" className="mb-4 text-red-700">
                    {errors.role}
                </p>
            )}
            <main>{children}</main>
        </div>
    );
}
