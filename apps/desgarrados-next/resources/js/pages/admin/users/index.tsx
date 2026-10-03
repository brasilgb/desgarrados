import { Head, Link, router } from "@inertiajs/react";
export type AdminUser = {
    id: number;
    name: string;
    username: string | null;
    email: string;
    role: "admin" | "editor" | "user";
    is_active: boolean;
};
type Props = {
    users: {
        data: AdminUser[];
        prev_page_url: string | null;
        next_page_url: string | null;
        current_page: number;
        last_page: number;
    };
};
export default function Users({ users }: Props) {
    return (
        <>
            <Head title="Usuários" />
            <div className="mb-5 flex justify-between">
                <h1 className="text-2xl">Usuários</h1>
                <Link href="/admin/users/create">Criar usuário</Link>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr>
                            {["Nome", "Email", "Role", "Ativo", "Ações"].map(
                                (label) => (
                                    <th key={label} className="p-2">
                                        {label}
                                    </th>
                                ),
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user) => (
                            <tr key={user.id}>
                                <td className="p-2">{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.is_active ? "Sim" : "Não"}</td>
                                <td>
                                    <Link href={`/admin/users/${user.id}/edit`}>
                                        Editar
                                    </Link>
                                    <button
                                        className="ml-4"
                                        onClick={() => {
                                            if (
                                                window.confirm(
                                                    `Excluir ${user.name}?`,
                                                )
                                            )
                                                router.delete(
                                                    `/admin/users/${user.id}`,
                                                );
                                        }}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <nav aria-label="Paginação" className="mt-5 flex gap-4">
                {users.prev_page_url && (
                    <Link href={users.prev_page_url}>Anterior</Link>
                )}
                <span>
                    {users.current_page} / {users.last_page}
                </span>
                {users.next_page_url && (
                    <Link href={users.next_page_url}>Próxima</Link>
                )}
            </nav>
        </>
    );
}
