import { Head, Link, usePage } from "@inertiajs/react";
export default function Welcome() {
    const { capabilities } = usePage().props;
    return (
        <>
            <Head title="Desgarrados" />
            <h1 className="text-3xl font-semibold">Desgarrados</h1>
            <p className="my-4">Bem-vindo.</p>
            {capabilities.accessAdmin && (
                <Link href="/admin">Abrir painel administrativo</Link>
            )}
        </>
    );
}
