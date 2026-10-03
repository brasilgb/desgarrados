# DESGARRADOS-LEGACY-01 — Auditoria do projeto legado

Data da auditoria: 2026-10-02  
Escopo: inspeção estática do repositório, sem atualização de framework, sem instalação de dependências e sem execução de migrations.

## 1. Resumo executivo

O repositório já é uma aplicação Laravel 10.14.1, criada/alterada principalmente entre 2022 e 2023, com Inertia.js, React, TypeScript, Vite e Tailwind. O código contém um CMS/editorial para conteúdo regional, galeria, áudio/playlists, agenda, mensagens e administração de usuários.

Há valor funcional reaproveitável, principalmente no domínio e no layout administrativo. Porém, o sistema não deve ser colocado em produção como está. O risco mais grave é que o grupo `/admin` em `routes/web.php` não usa `auth`, `verified`, autorização por papel ou policy; portanto, as operações administrativas estão expostas à camada de rota. Também há divergência entre a migration de `users` e `User.php`/`UserController.php`, validação insuficiente em vários endpoints e inconsistências entre controllers, nomes de páginas Inertia e rotas públicas.

Recomendação: preservar o banco e o vocabulário funcional como referência, criar uma base Laravel moderna e migrar os módulos em fatias, começando por autenticação/autorização, testes de caracterização e importação segura dos dados. Não recomendo um upgrade direto do repositório sem primeiro corrigir os bloqueadores de segurança e os contratos de dados.

## 2. Laravel e PHP encontrados

- `composer.json`: `laravel/framework ^10.10`; `composer.lock`: Laravel `v10.14.1`.
- Estrutura Laravel 10 tradicional: `bootstrap/app.php`, `app/Http/Kernel.php`, `config/`, migrations anônimas e `routes/`.
- Restrição declarada: PHP `^8.1`; PHP disponível no ambiente: `8.4.24`; Composer: `2.9.5`.
- O PHP originalmente usado não pode ser provado somente pelo repositório; os commits e dependências indicam ambiente de desenvolvimento de 2023 compatível com PHP 8.1/8.2.
- `artisan` não pôde ser executado porque `vendor/autoload.php` não existe. Nenhuma dependência foi instalada.

## 3. Stack frontend

- Inertia React `^1.0`, React `^18.2`, TypeScript `^5.0.2`, Vite `^4.0`, `laravel-vite-plugin ^0.7.5`, PostCSS, Autoprefixer e Tailwind CSS `^3.2.1`.
- Componentes: Headless UI, React Select, React Datepicker, React Icons, TinyMCE e Animate.css; utilitários Axios e Moment.
- Build: `tsc && vite build && vite build --ssr`.
- Existem simultaneamente `package-lock.json` e `yarn.lock`, aumentando o risco de instalações divergentes.
- `node_modules` não está instalado; `npm ls` reportou as dependências como ausentes.

## 4. Banco de dados

- Configuração exemplo: MySQL (`DB_CONNECTION=mysql`), banco `desgarrados`.
- Não foi verificada conexão nem estado dos dados; nenhum comando de banco foi executado.
- Há 18 migrations: autenticação Laravel, conteúdo, mídia, comunicação e agenda.
- Fila, cache e sessão no exemplo usam `sync`, `file` e `file`.

## 5. Dependências principais

- `laravel/framework 10.14.1`, `laravel/sanctum ^3.2`, `inertiajs/inertia-laravel ^0.6.3`, `tightenco/ziggy ^1.0`, Guzzle e Tinker.
- Desenvolvimento: Breeze, PHPUnit 10, Pint, Sail, Collision e Ignition.
- Não foi executada análise de vulnerabilidades porque as dependências PHP não estão instaladas. O lock é de 2023 e deve ser reavaliado antes de exposição pública.

## 6. Estrutura e funcionalidades

O projeto contém 29 controllers, 13 models, 18 migrations, 46 páginas/componentes TSX e 11 arquivos de teste. Não foram encontrados Services, Repositories, Jobs, Notifications ou Listeners de negócio relevantes.

| Módulo | Evidência | Avaliação |
|---|---|---|
| Registro, login, logout, reset, confirmação e verificação de e-mail | `routes/auth.php`, controllers Auth e testes Feature | aparentemente funcional e reaproveitável |
| Perfil | `ProfileController`, páginas Profile e testes | reaproveitável após revisão |
| Dashboard/admin | controllers e layouts BackEnd | parcialmente implementado |
| Usuários | `UserController` e páginas Users | risco alto por autorização e schema |
| Posts/páginas | `PostController`, `PageController`, categorias | regra editorial reaproveitável; lógica duplicada |
| Categorias hierárquicas | `Category` e migration autorreferente | reaproveitável, precisa normalização |
| Galerias/imagens | `Gallery`, `Image`, pivô e uploads | parcialmente funcional; paths precisam revisão |
| Playlists/áudios | `Playlist`, `Audio` e pivô | parcialmente funcional; validação precisa revisão |
| Comentários, mensagens e agenda | models, CRUDs e páginas administrativas | CRUD administrativo presente; fluxos públicos não demonstrados |
| Configurações/seções | `Settings`, `Section` e home | parcialmente implementado |
| API | apenas `/api/user` com Sanctum | esqueleto, sem API de domínio |

Não foram encontradas implementações de curtidas, seguidores, busca geral, integração externa de negócio, notificações, jobs de mídia ou compartilhamento persistido.

## 7. Mapa das principais tabelas

| Tabela | Finalidade e relações |
|---|---|
| `users` | autenticação; `name`, `email`, senha e timestamps |
| `password_reset_tokens`, `failed_jobs`, `personal_access_tokens` | suporte Laravel para reset, filas e Sanctum |
| `categories` | categorias/subcategorias via `category_id` autorreferente |
| `posts` | título, resumo, conteúdo, imagem destacada, flags `social/active/type/linked` |
| `category_post` | muitos-para-muitos entre categorias e posts |
| `galleries`, `images`, `gallery_image` | galerias, arquivos de imagem e pivô muitos-para-muitos |
| `playlists`, `audios`, `audio_playlist` | playlists, arquivos de áudio e pivô muitos-para-muitos |
| `sections` | cinco posições numéricas para composição da home |
| `settings` | título, descrição, logo, endereço, mapa, contatos e metadados |
| `comments` | autor, e-mail, conteúdo e situação/moderação |
| `messages` | nome, estado, cidade, mensagem e situação |
| `schedules` | evento, localidade, início/fim, capa e status |

Inconsistências importantes:

- `users` não possui `username`, `role` nem `avatar`, embora esses campos estejam no model/controller e sejam usados na administração.
- Campos booleanos/status são `integer`/`tinyInteger`, sem defaults, casts ou enums.
- Slugs, e-mails de conteúdo e vínculos importantes não têm índices/unique explícitos.
- Tabelas pivô não têm chave composta nem índice único, permitindo duplicidade.
- Arquivos são strings curtas (`50`) sem contrato documentado de storage.
- `posts.linked` é inteiro sem foreign key ou semântica documentada.
- Migrations usam timestamps manuais e tipos diferentes de `id`, exigindo teste de compatibilidade antes da importação.

## 8. Autenticação e autorização

O Breeze fornece autenticação de sessão, CSRF, rate limit no login e reset de senha. Sanctum está instalado, mas a API contém apenas o endpoint padrão `/api/user`.

Problema crítico: em `routes/web.php`, `Route::group(['prefix' => 'admin'], ...)` não possui `middleware('auth')`. A rota de dashboard e os resources CRUD estão sem proteção declarada. Também não há policies, gates, middleware de papel ou verificação efetiva de `role`; comentários no `UserController` não constituem controle de acesso.

## 9. Integrações externas

Guzzle está disponível, mas não foi identificada integração de negócio ativa. Configurações de Pusher, AWS, Mailgun e Postmark são placeholders de ambiente; não há uso comprovado nas funcionalidades auditadas. Mail é usado pelo fluxo padrão de autenticação/reset, condicionado à configuração externa.

## 10. Problemas encontrados

- Admin sem middleware de autenticação/autorização.
- Model, controller e migration de usuário incompatíveis.
- Controllers repetem validação, mensagens, redirects e manipulação de arquivos.
- Alguns actions REST são stubs ou não retornam resposta claramente (`show/edit/update` em imagens e partes de Home/Settings).
- `PageController` usa `Post` como parâmetro/model para páginas, indicando contrato não definido entre “página” e “post”.
- Controllers front-end existem, mas as rotas públicas correspondentes não estão registradas; apenas `/` está registrado além de admin/auth.
- Páginas React contêm links placeholder (`#`, strings vazias) e textos demonstrativos.
- Não há testes de caracterização para posts, mídia, agenda, comentários, mensagens ou autorização.
- `composer.lock` e `package-lock.json` existem, mas runtime/build não foram validados porque os artefatos instalados não estão no checkout.

## 11. Riscos de segurança

- **Crítico — autorização:** resources `/admin/*` sem `auth`/policy.
- **Alto — controle de acesso:** `role` aparece no código, mas não existe na migration e não há enforcement.
- **Alto — uploads:** imagens/áudios são gravados em paths públicos com validação desigual; algumas regras só exigem presença. Revisar MIME real, extensão, tamanho, nomes, diretório e execução de arquivos.
- **Alto — integridade:** deleções manuais com `unlink` e cascades podem perder arquivos/relacionamentos sem transação ou fila.
- **Médio — XSS:** conteúdo rich text não tem sanitização demonstrada; saída deve ser tratada como HTML não confiável.
- **Médio — validação:** faltam frequentemente `string`, limites, `email`, `date`, `exists`, `boolean` e `unique`.
- **Médio — dependências:** versões antigas e não instaladas impedem confirmar advisories; executar auditoria Composer/npm na próxima fase.

Nenhum `.env` real foi encontrado versionado; `.env.example` contém somente placeholders. CSRF, cookies/sessão, binding e rate limit do Breeze estão presentes em princípio, mas não foram exercitados por falta de `vendor`.

## 12. Código reaproveitável e código a substituir

Reaproveitável: vocabulário/entidades de domínio, migrations como fonte de dados, fluxo de autenticação Breeze, layout/componentes Inertia/React após atualização, relações Eloquent básicas e assets após confirmação de licença.

Substituir: rotas admin sem autenticação, manipulação manual de uploads/`unlink`, controllers CRUD repetitivos, campos mágicos de status, modelo de `sections` baseado em cinco colunas numeradas se a nova home permitir algo melhor, toolchain antiga após congelar comportamento e conteúdo placeholder.

## 13. Compatibilidade com Laravel atual

Na data da auditoria, a documentação oficial lista Laravel 13 como release atual, com PHP mínimo 8.3; Laravel 12 requer PHP 8.2–8.5 e Laravel 11 requer PHP 8.2–8.4. Laravel 10 está fora do período de correções de segurança desde 2025-02-04. Fontes: [política de releases](https://laravel.com/framework/docs/releases) e [upgrade para Laravel 13](https://laravel.com/framework/docs/13.x/upgrade).

O caminho conceitual Laravel 10 → 11 → 12 → 13 atravessa três majors. O PHP disponível (8.4) atende Laravel 13, mas o constraint do projeto precisa ser revisto. Laravel 11 traz novo skeleton/bootstrap e exige PHP 8.2; Laravel 12 atualiza dependências e exige Carbon 3; Laravel 13 exige PHP 8.3 e atualiza Tinker/PHPUnit. Também devem ser revisados Sanctum, Inertia, Ziggy, Breeze e Vite em conjunto.

Antes do upgrade, corrigir routes, schema drift, uploads e cobrir módulos com testes. O upgrade do framework isoladamente não corrige esses problemas. A mudança de defaults de sessão/serialização também pode invalidar sessões existentes e deve ser planejada.

## 14. Estratégias possíveis de modernização

### A — Upgrade incremental

Preserva histórico, migrations e telas, mas carrega inconsistências, exposição do admin, controllers acoplados e schema drift pelas três versões. Retrabalho médio/alto; bloqueio inicial de segurança e testes.

### B — Laravel novo + migração do legado

Permite skeleton atual, autenticação/autorização redesenhadas, contratos claros e importação testável. Exige importador, mapeamento e reconstrução progressiva. Retrabalho alto, porém risco mais controlável.

### C — Reaproveitamento parcial

Usa o legado como especificação e reaproveita apenas domínio/componentes/assets comprovados. Reduz superfície antiga, mas pode perder regras implícitas e exige descoberta funcional com usuários. Retrabalho médio/alto.

## 15. Recomendação técnica para a próxima etapa

Escolher **B**, com migração incremental de dados e funcionalidades:

1. Fazer snapshot somente leitura do banco legado e inventário de registros/arquivos.
2. Definir contrato canônico de usuário, papel, mídia, post, categoria, evento e status.
3. Implementar autenticação, policies e testes de acesso.
4. Criar testes de caracterização dos fluxos que devem ser preservados.
5. Criar importador idempotente para dados e arquivos, com relatório de erros.
6. Migrar primeiro conteúdo público e mídia; depois administração, comentários/mensagens e configurações.
7. Só então atualizar/substituir frontend e ativar deploy controlado.

Regra de negócio a preservar: modelo editorial do Desgarrados, categorias, conteúdo regional, galerias, música/playlists, agenda, mensagens e moderação de comentários. Implementação a substituir: Laravel 10, rotas administrativas abertas, controllers monolíticos, validação espalhada, storage manual, campos mágicos e UI placeholder.

## 16. Arquivos para a próxima fase

- `routes/web.php` e `routes/auth.php`: proteção, nomes e superfície pública.
- `app/Models/User.php`, `app/Http/Controllers/BackEnd/UserController.php` e migration de usuários: contrato e migração de dados.
- Controllers em `app/Http/Controllers/BackEnd/`: Form Requests, policies, serviços e respostas.
- `database/migrations/`: mapping, índices, defaults, enums/casts e pivôs.
- Models em `app/Models/`: relações, casts, foreign keys e mass assignment.
- Controllers de `Images`, `Gallery`, `Audio`, `Playlist`, `Post` e `Page`: upload, sanitização, paths e transações.
- `resources/js/Pages`, `Layouts` e `Components`: rotas faltantes, placeholders, acessibilidade e atualização.
- `composer.json`, `composer.lock`, `package.json`, `package-lock.json` e `yarn.lock`: plano de versões e escolha de um único gerenciador npm.
- `.env.example`, `config/filesystems.php`, `config/mail.php`, `config/services.php` e `tests/`.

## Conclusão

**AUDITORIA CONCLUÍDA — NENHUMA ATUALIZAÇÃO DO FRAMEWORK FOI REALIZADA.**
