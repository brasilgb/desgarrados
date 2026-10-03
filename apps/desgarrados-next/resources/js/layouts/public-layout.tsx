import { Link } from "@inertiajs/react";
import type { PropsWithChildren } from "react";
export default function PublicLayout({ children }: PropsWithChildren) {
    return (
        <div className="mx-auto max-w-5xl p-6">
            <header className="mb-8 flex justify-between">
                <Link href="/">Desgarrados</Link>
                <Link href="/login">Entrar</Link>
            </header>
            <main>{children}</main>
        </div>
    );
}
