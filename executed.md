# DESGARRADOS-NEXT-01 — Fundação Laravel 13

Data: 2026-10-02. Fundação implementada em `apps/desgarrados-next/`, com testes e build aprovados. As auditorias online de dependências estão bloqueadas pela rede; a etapa fica parcial até sua conclusão.

## Verificação do correio

O conteúdo mudou em relação à execução anterior: o SHA-256 anterior era `848f270ec699ac1713a5512ccbad99578fba1f3b221babd40b37a1272c909ace`, registrado no relatório DESGARRADOS-LEGACY-02. O SHA-256 atual é `4fc7792100b4c638f0bef829778b004bdb40421cff5e58101b84193a0951800e`. O título passou para DESGARRADOS-NEXT-01, cuja execução está registrada aqui.

`correio.md` continua não rastreado e não está em HEAD; a comparação usa o hash registrado, não um diff textual de versões Git. O relatório arquitetural anterior foi preservado integralmente em [docs/audits/desgarrados-legacy-02.md](docs/audits/desgarrados-legacy-02.md). A auditoria LEGACY-01 também permanece preservada.

Em nova execução, comparar este hash **e o estado parcial**: o hash igual não significa etapa concluída; retomar as pendências sem recriar/sobrescrever a aplicação existente.

## 1. Estado inicial

- Branch `main`; HEAD `6328437f9bf4019f36eb9dc49f021cafa60bad33`.
- `git status --short`: `?? correio.md`, `?? docs/`, `?? executed.md`.
- `git diff --stat` vazio; nenhum arquivo rastreado do legado alterado.
- `apps/desgarrados-next/` não existia. Foi criada sem sobrescrever implementação anterior.
- Laravel 10 da raiz preservado. Nenhuma migration, instalação de dependências ou acesso ao banco do legado.
- Ambiente PHP/Node disponível; GitHub, Packagist e npm não resolvem DNS pelo terminal. Caches locais foram examinados antes de instalar.

## 2. Versões instaladas

| Componente | Versão |
|---|---|
| PHP CLI | 8.4.24 |
| Composer | 2.9.5 |
| Laravel framework | 13.32.0 |
| Fortify | 1.39.0 |
| Inertia Laravel | 3.3.4 |
| Inertia React / plugin Vite | 3.7.1 |
| React / React DOM | 19.3.0 |
| TypeScript | 5.9.3 |
| Tailwind | 4.3.3 |
| Vite | 8.3.0 |
| laravel-vite-plugin | 3.2.0 |
| plugin React Vite | 6.1.1 |
| Wayfinder PHP | 0.1.21 |
| PHPUnit | 12.5.35 |
| Pint | 1.32.1 |
| Node / npm | 24.18.0 / 11.16.0 |

Versões e referências exatas preservadas em `composer.lock` e `package-lock.json`. Constraint PHP `^8.4`; framework `^13.32`, resolvido pelo lock para tag estável v13.32.0. `composer validate --strict` aprovado.

## 3. Starter kit utilizado

Kit [oficial Laravel React](https://github.com/laravel/react-starter-kit), fixado no commit `87cce8705d712629ebddd70ccfbb06592ecbaac2`, a partir da distribuição Composer previamente em cache. A aplicação não depende da branch main mutável. As tags antigas v1.0.x não representam o kit Laravel 13; utilizou-se commit fixo do kit e release estável do framework.

SHA-256 do ZIP utilizado: `a93bf649102e24e196f69b4bd6be3665a038073c3217890a5dd188e0a7a5f7c2`. Framework [v13.32.0 oficial](https://github.com/laravel/framework/releases/tag/v13.32.0), referência `cdd8b33c246719acdd118c705ce8c7ab5ef48a96`. A documentação [dos starter kits](https://github.com/laravel/docs/blob/13.x/starter-kits.md) foi consultada.

Scripts revisados antes de execução. Composer inicial instalado com `--no-scripts --no-plugins`; npm com `--ignore-scripts`, preservado também em `.npmrc`. Removidos scripts de setup, post-update e post-create-project que disparavam migrations/publicações automaticamente. Package discovery e migrations foram executados explicitamente. Vite Plus substituído por Vite convencional; retirada configuração de download de fontes no build. Não foram adicionados Sanctum nem pacote de roles/permissions. Componentes, Fortify/2FA/passkeys e ferramentas auxiliares do kit foram mantidos.

Proveniência registrada também em `STARTER_SOURCE.md`.

## 4. Estrutura criada

Aplicação independente com `app`, `bootstrap`, `config`, `database`, `public`, `resources`, `routes`, `storage`, `tests`, manifests e locks próprios. Backend inclui `Enums`, `Policies`, `Actions/Users`, `Http/Controllers/Admin`, `Http/Requests/Admin` e comando Artisan. Frontend inclui páginas administrativas e layouts público/admin, além do AuthLayout do kit.

Instruções executáveis em [apps/desgarrados-next/README.md](apps/desgarrados-next/README.md). Document root próprio: `apps/desgarrados-next/public`. Nenhum módulo de conteúdo/importador implementado. Rotas `settings/*` herdadas são preferências do titular da conta, sem implementar o módulo settings de negócio.

## 5. Banco configurado

Desenvolvimento usa SQLite exclusivo em `apps/desgarrados-next/database/database.sqlite`. PDO SQLite está disponível. A conexão padrão do kit aponta para esse arquivo dentro da aplicação. Migrations executadas explicitamente somente nessa base; cinco migrations concluídas. Banco local e `.env` ignorados pelo Git.

PHPUnit usa SQLite `:memory:` com configuração forçada no `phpunit.xml`. `TestCase::createApplication` recusa qualquer configuração diferente antes de RefreshDatabase; isso protege inclusive contra config em cache apontando para outro banco.

MySQL não foi utilizado nem acessado. `.env.example` documenta futura conexão independente `desgarrados_next`, com placeholders seguros. SQLite não comprova comportamento de constraints/locks sob MySQL; validar concorrência em MySQL separado é pendência. Cookie de sessão exclusivo `desgarrados_next_session`, com sessões criptografadas e storage próprio.

## 6. UserRole

`App\Enums\UserRole`, enum string: `admin`, `editor`, `user`. Persistência textual e cast no User. Valores inválidos rejeitados pelos Form Requests; nenhum inteiro mágico.

## 7. Schema users

`id`, `name`, `username` nullable/unique, `email` unique, `email_verified_at`, `password`, `role` default user, `is_active` default true, remember token e timestamps. Colunas Fortify de 2FA e tabela passkeys do kit mantidas. `avatar_image_id` não criado.

Password com cast hashed e oculto; role com cast UserRole e is_active boolean. Fillable limitado a nome, username, email e senha; `role` e `is_active` não aceitam mass assignment. Definição de privilégios é explícita em código autorizado. Seeder não cria usuário/senha.

## 8. Autenticação

Fortify oferece login/logout, reset, confirmação de senha, verificação de email, renovação/invalidação de sessão, rate limit de cinco tentativas por minuto por email/IP, 2FA e passkeys do kit.

Registro público desabilitado: GET/POST `/register` retornam 404 e a UI de registro foi removida. Login usa callback que exige conta ativa e valida hash. Administradores criam usuários; criação envia notificação de verificação. Alteração de email revoga verificação e, no fluxo administrativo, envia nova notificação. Mailer local `log`; configurar SMTP para entrega real.

`php artisan app:create-admin` solicita nome/email/senha oculta/confirmação, exige 12 caracteres, rejeita email duplicado e cria admin ativo/verificado. Só aceita fluxo interativo, sem senha hardcoded ou parâmetro de senha. README informa que a marcação verificada pressupõe confirmação administrativa da titularidade pelo operador. Nenhum admin real foi criado durante esta execução; os usuários de teste são descartáveis.

## 9. Middleware de conta ativa

`EnsureActiveAccount` anexado ao grupo web em `bootstrap/app.php`. Inativo com sessão existente é desconectado, tem sessão invalidada/token CSRF regenerado e recebe redirecionamento para login. Assim, todas as rotas web do novo app, inclusive as administrativas/Fortify, passam por essa proteção.

## 10. Gate administrativo

`access-admin` exige conta ativa, email verificado e role admin/editor. Role user não acessa `/admin`. Visitante é redirecionado pelo auth. Gate definido no AppServiceProvider; não existe bypass global de admin sobre invariantes.

## 11. UserPolicy

`viewAny`, `view`, `create`, `update`, `delete` exigem admin ativo/verificado. Descoberta automática Laravel, comprovada pelos testes de endpoints. Editor e user não administram usuários.

`SaveUser` centraliza update/delete em transação, bloqueia linhas de admins em ordem de ID e depois o alvo, com retries. Não aceita alteração da própria role e impede rebaixar, desativar ou remover o último admin ativo. Admin inativo não conta para a preservação. A exclusão pelo perfil também utiliza a mesma ação e só faz logout depois de validar/executar a exclusão. Locks/retries implementados; concorrência MySQL real ainda não exercitada.

## 12. Administração de usuários

Listagem paginada (15), criação, edição, ativação/desativação, alteração de role e exclusão. Páginas React funcionais, labels, erros de validação, confirmação de exclusão e flash de sucesso. Navegação de paginação anterior/próxima.

StoreUserRequest/UpdateUserRequest exigem autorização, email/username únicos, role válida e boolean para conta ativa. Criação aceita senha explícita com confirmação/hash. Edição administrativa proíbe senha e email_verified_at. Mudança de senha exige fluxo de segurança do titular/reset. Ação de exclusão exibe o erro do último admin na UI.

## 13. Rotas

`routes/admin.php` carregado por `routes/web.php`, que o skeleton Laravel 13 carrega no grupo web. Grupo admin acrescenta auth, verified e can:access-admin; conta ativa está no middleware web global. Cada ação de usuários aplica sua policy, diretamente ou via Form Request.

Sete rotas administrativas: painel; listagem/criação de formulário/gravação de usuário; edição/atualização/exclusão. Prefixo `/admin` não é usado como autorização. Rotas públicas, conta, auth e health do skeleton mantidas.

## 14. Layouts

PublicLayout para página pública mínima; AuthLayout oficial para autenticação; AdminLayout para painel/usuários com navegação por capacidades. AppLayout do kit mantido para preferências do titular. `/dashboard` oferece acesso ao painel quando autorizado. Sem dashboard de negócio.

## 15. Capabilities

Inertia compartilha `accessAdmin` via Gate e `manageUsers` via UserPolicy. Compartilha identidade mínima (id, nome, email, verificação, role, conta ativa), sem password, token, secrets 2FA ou dados internos completos. Menus usam capabilities; servidor aplica autorização em cada endpoint. Props TypeScript atualizadas.

## 16. Testes criados

`AdminFoundationTest`: visitante/user/editor/admin no painel; CRUD autorizado; negação de endpoints para editor; inativo no login e sessão existente; email não verificado; mass assignment; tentativa de role via admin/perfil; própria role; último admin em update/delete/perfil, inclusive com outro admin inativo; alteração de outro admin; email/username duplicados e role inválida em criação/edição; senha/verificação proibidas no update; email alterado; comando admin interativo/duplicado; rate limit por tentativas HTTP reais; capabilities sem secrets.

RegistrationTest adaptado para negar registro. Mantidos testes oficiais de login válido/inválido/logout/rate limit, reset, confirmação, verificação/reenvio, 2FA, dashboard e preferências de conta. Isolamento de banco reforçado no TestCase/phpunit.xml.

## 17. Resultado PHPUnit

**57 testes aprovados, 261 assertions, zero falhas**, execução final após correções e testes adicionais. SQLite `:memory:`; nenhuma migration no legado. Testes backend usam `withoutVite`; validação de assets é separada.

Também renderizadas páginas `/` e `/login` diretamente pelo kernel real fora do TestCase: **HTTP 200**, HTML contendo URLs dos assets gerados. Não foi realizada inspeção visual em navegador nem teste end-to-end da UI.

## 18. Resultado typecheck

`npm run types:check` (`tsc --noEmit`): **aprovado**. Corrigido encadeamento indevido de `useForm.transform`, que retorna void no Inertia 3; chamada put realizada separadamente. Execução final após formatação do frontend registrada nas evidências.

## 19. Resultado build

`npm run build`: **aprovado**, Vite 8.3.0, 2.313 módulos, manifest e assets em `public/build`. Wayfinder gerou helpers automaticamente. Nenhum download de fontes necessário. Assets e helpers gerados permanecem ignorados no Git.

## 20. Resultado auditorias

- Pint aplicado e `vendor/bin/pint --test` aprovado.
- `composer validate --strict` aprovado, sem avisos após ajuste de constraint; lock preserva framework exato instalado.
- `composer audit`: **bloqueado**. DNS de repo.packagist.org/packagist.org indisponível; endpoint de advisories não alcançado. Tentativa COMPOSER_DISABLE_NETWORK também recusou a consulta de segurança.
- `npm audit`: **bloqueado**, EAI_AGAIN em registry.npmjs.org no endpoint de advisories.
- Instalações offline imprimiram zero vulnerabilities; isso **não equivale a uma auditoria atual bem-sucedida**, pois os endpoints não puderam ser consultados.

Não se afirma ausência de vulnerabilidades. Repetir auditorias online e resolver findings antes de considerar a etapa concluída.

## 21. Arquivos criados

Todos os arquivos da aplicação são novos em relação ao Git da raiz, incluindo manifests/locks, migrations, fontes, rotas e testes. Inventário integral dos arquivos não ignorados: [docs/audits/desgarrados-next-01-files.txt](docs/audits/desgarrados-next-01-files.txt).

Documentação adicional criada: `docs/audits/desgarrados-legacy-02.md` (cópia integral do relatório anterior), inventário e evidências de validação desta etapa. `.env`, SQLite, vendor, node_modules e builds locais também foram criados, mas não integram o inventário versionável.

Dependências diretas em composer.json/package.json: framework, Fortify, Inertia, Tinker, Wayfinder e ferramentas auxiliares do kit; React/ReactDOM, TypeScript, Tailwind, Vite/plugin Laravel/plugin React, componentes Radix, utilitários e dependências auxiliares. Lists/versões transitivas nos dois locks. Somente npm; nenhum yarn.lock criado e removido o manifesto pnpm herdado do kit.

## 22. Arquivos alterados

`executed.md` substituído por este relatório após preservar a arquitetura aprovada. Dentro do novo scaffold, adaptados User, migration users, providers Fortify/App, config Fortify, middleware Inertia, bootstrap, exclusão de perfil, seeder, testes/props, páginas/layouts, README, scripts Composer/npm e Vite. Arquivos são novos para o repositório raiz; alterações referem-se à distribuição inicial do kit.

Nenhum arquivo rastreado do Laravel 10 alterado: `git diff --exit-code` retornou 0 antes/depois. `correio.md` preservado com o mesmo hash da abertura desta execução. Nenhum commit/branch/deploy criado.

## 23. Comandos executados

- Segurança/inspeção: git status --short; git branch --show-current; git rev-parse HEAD; git diff --stat/--exit-code; rg --files; sha256sum; leitura de relatórios/manifests/middleware/rotas/testes; inspeção PHP/Composer/Node/npm/PDO.
- Rede: curl para GitHub/Packagist; npm ping; composer diagnose. Falhas DNS documentadas, sem tentativa de alterar configuração de rede.
- Bootstrap: extração da distribuição oficial fixada por commit; revisão de scripts; Composer update --no-scripts --no-plugins --prefer-dist --no-interaction em modo offline/cache temporário; ajustes de manifest/lock e composer update --lock; npm install --offline --ignore-scripts em cache temporário.
- Cache npm: a cópia ampla inicial excedeu /tmp; removida somente a cópia temporária criada nesta execução. Cópia seletiva de entradas registry; normalização de headers de cache temporário e filtragem temporária de versões para tarballs efetivamente disponíveis. Manifests de pacotes e tarballs não tiveram código alterado; originais em ~/.npm preservados. Locks gerados com referências registry e integrities normais. Isso resolveu diferenças de metadados/cache e versões sem tarball disponível.
- Aplicação: php artisan key:generate; package:discover; wayfinder:generate --with-form; criação do SQLite exclusivo; php artisan migrate --force nessa aplicação; config:clear; route:list --path=admin.
- Qualidade: vendor/bin/phpunit; vendor/bin/pint/--test; npm run types:check; npm run build; composer validate --strict; composer audit; npm audit. Prettier 3.9.6 via npm exec, usando tarball cacheado, somente nos arquivos frontend criados/adaptados.
- Verificação: renderização pelo kernel de / e /login com assets reais; comparação da cópia do relatório anterior; inventário de arquivos; git diff/status e hash final do correio.

Falhas iniciais foram corrigidas: dependência de manifest Vite nos testes backend, defaults do User em memória, assert anterior ao default explícito e chamada TypeScript de transform. Resultados finais constam acima. Nenhum teste falhando foi ignorado.

## 24. Problemas encontrados

Bloqueio externo remanescente: DNS/rede para registries e endpoints de segurança. Dependências foram instaladas via caches existentes; isso não comprova atualização dos advisories. Problemas de cache/espaço temporário foram resolvidos sem alterar caches originais ou legado.

A pasta .github da aplicação contém workflow ajustado para PHP 8.4/Node 24 e setup explícito; por estar aninhada, não é descoberta automaticamente pelo GitHub Actions do monorepo. É um template para futura integração, sem executar CI remoto nesta etapa.

## 25. Pendências

1. Disponibilizar rede/DNS e executar `composer audit` e `npm audit`; corrigir findings e revalidar os checks afetados. Este é o bloqueio que impede fechar a etapa.
2. Validar em MySQL independente o schema e a proteção concorrente do último admin, quando esse ambiente estiver disponível. SQLite foi o ambiente local/testes desta entrega.
3. Antes de uso real: configurar email, executar comando interativo para o primeiro admin e revisar ambiente/deploy/document root. Não foi criado admin com senha fixa.
4. Integrar o template CI à raiz do monorepo se desejado; validar interface em navegador. Não foram apresentados como checks executados.

## 26. Próxima etapa recomendada

Concluir as auditorias e pendências de validação desta fundação. Somente depois planejar DESGARRADOS-NEXT-02 com escopo aprovado. Nenhum módulo de conteúdo, mídia de negócio, importador ou migrations do legado foi iniciado.

Estado Git final: branch `main`, mesmo HEAD; `?? apps/`, `?? correio.md`, `?? docs/`, `?? executed.md`; diff rastreado vazio. Arquivos da nova base ainda não commitados, conforme solicitado.

**DESGARRADOS-NEXT-01 PARCIAL — BLOQUEIOS DOCUMENTADOS**
