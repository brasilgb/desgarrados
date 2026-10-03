# Desgarrados Next — fundação

Aplicação independente em Laravel 13.32.0 / PHP 8.4, baseada no starter kit React oficial fixado em `87cce8705d712629ebddd70ccfbb06592ecbaac2` (sem acompanhar main). Inertia 3, React, TypeScript, Vite e Tailwind. A aplicação Laravel 10 na raiz é preservada.

Execute todos os comandos **nesta pasta**, `apps/desgarrados-next`:

```bash
composer install
npm ci
cp .env.example .env
php artisan key:generate
# SQLite local exclusivo desta aplicação:
touch database/database.sqlite
php artisan migrate
php artisan app:create-admin
npm run build
php artisan serve --port=8001
```

Para desenvolvimento do frontend, execute `npm run dev` em outro terminal. O document root é o `public/` desta aplicação. Não execute scripts/migrations na raiz do legado. Os scripts automáticos de setup/migration do kit foram removidos; migrations exigem comando explícito.

O banco padrão de desenvolvimento é `database/database.sqlite`, ignorado pelo Git. Para MySQL, provisionar schema e credenciais exclusivos, configurar `DB_CONNECTION=mysql`, `DB_DATABASE=desgarrados_next`, `DB_USERNAME` e `DB_PASSWORD` no `.env`. Nunca usar banco/credenciais do legado. Testes exigem SQLite `:memory:` e recusam outra configuração, inclusive configuração em cache. A garantia concorrente do último admin utiliza transação, locks de linhas e retries; a validação em MySQL com requests concorrentes ainda depende de um servidor independente.

O comando `app:create-admin` solicita nome, email e senha oculta com confirmação (mínimo 12 caracteres), rejeita email existente e cria admin ativo/verificado. A verificação é administrativa: o operador deve confirmar a identidade e titularidade do email. Não há seeder de usuários nem senha fixa. Registro público desabilitado. Usuários criados no painel recebem email de verificação; mudanças de email revogam verificação. O mailer local `log` grava links em `storage/logs`; configurar SMTP real via variáveis antes de produção.

`/dashboard` é a área da conta. `/admin` requer usuário ativo/verificado, role admin/editor. `/admin/users` exige admin. Alterações próprias de role são recusadas. Não é permitido apagar, rebaixar ou desativar o último admin ativo, inclusive pelo perfil. A edição administrativa não aceita senha; mudanças de senha seguem o fluxo explícito de segurança do titular ou reset. 2FA e passkeys do kit foram mantidos. As rotas `settings/*` são preferências de **conta** do kit; nenhum módulo de settings de negócio foi migrado.

Capabilities e identidade mínima são fornecidas pelo servidor; a navegação apenas reflete gates/policies. `.env`, banco, vendor, node_modules, assets gerados e helpers Wayfinder não são versionados. Os dois locks são preservados.

Validação:

```bash
vendor/bin/phpunit
npm run types:check
npm run build
vendor/bin/pint --test
composer audit
npm audit
```

PHPUnit testa o backend sem depender do manifest Vite; o build é validado separadamente. Não foram implementados módulos de conteúdo nem importador. Consultar `../../executed.md` para resultados e limitações desta execução.

O workflow em `.github/` desta aplicação é um template; o GitHub Actions não descobre workflows em pastas aninhadas no monorepo. Sua integração à raiz é uma tarefa futura.
