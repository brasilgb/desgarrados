import { Head, Link, usePage } from "@inertiajs/react";
export default function Dashboard() {
    const { auth, capabilities } = usePage().props;
    return (
        <>
            <Head title="Minha conta" />
            <div className="p-6">
                <h1 className="text-2xl">Olá, {auth.user.name}</h1>
                {capabilities.accessAdmin && (
                    <Link className="mt-4 block" href="/admin">
                        Abrir painel administrativo
                    </Link>
                )}
            </div>
        </>
    );
}
