import { Head, usePage } from "@inertiajs/react";
export default function Dashboard() {
    const { auth } = usePage().props;
    return (
        <>
            <Head title="Administração" />
            <h1 className="mb-4 text-2xl font-semibold">
                Painel administrativo
            </h1>
            <p>
                {auth.user.name} — {auth.user.role}
            </p>
        </>
    );
}
