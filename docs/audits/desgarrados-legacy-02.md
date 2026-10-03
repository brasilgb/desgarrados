# DESGARRADOS-LEGACY-02 — Nova arquitetura

Data: 2026-10-02.
Resultado: preparação arquitetural concluída. Schemas e fluxos abaixo são propostas para a nova aplicação; não foram instalados nem implementados como aplicação executável.

## Verificação do correio

`correio.md` não está rastreado, não existe em HEAD e não tem histórico Git disponível. Não é possível provar diferenças textuais contra uma versão anterior. A instrução atual é DESGARRADOS-LEGACY-02, enquanto o relatório anterior documentava DESGARRADOS-LEGACY-01; esta nova etapa foi processada.

SHA-256 do correio executado: `848f270ec699ac1713a5512ccbad99578fba1f3b221babd40b37a1272c909ace`. Em futuras execuções, comparar com este hash e a conclusão registrada antes de repetir o trabalho.

Auditoria anterior preservada em [docs/audits/desgarrados-legacy-01.md](docs/audits/desgarrados-legacy-01.md).

## 1. Estado inicial do repositório

- Branch: main; commit: `6328437f9bf4019f36eb9dc49f021cafa60bad33`.
- Working tree inicial: `?? correio.md` e `?? executed.md`; nenhuma alteração rastreada.
- Legado: Laravel 10, constraint ^10.10; lock auditado anteriormente em 10.14.1.
- Ambiente: PHP 8.4.24, Composer 2.9.5, Node 24.18.0, npm 11.16.0.
- vendor e node_modules ausentes; banco real não acessado.
- Admin legado permanece sem middleware declarado. Esta entrega não corrige o runtime antigo.
- Nenhuma branch/commit foi criado: execução documental e .git somente leitura no ambiente.

## 2. Estrutura escolhida

Preservar Laravel 10 na raiz. Criar futuramente aplicação com raiz independente em `apps/desgarrados-next/`, com manifests, locks, .env, banco, storage, testes e document root próprios. O deploy novo apontará para apps/desgarrados-next/public.

O item 19 permite priorizar arquitetura; nesta etapa o scaffold é adiado até revisar uma tag estável do kit e configurar um banco independente. Scripts de setup do kit consultado executam migrations.

```text
desgarrados/
├── app/, database/, resources/, routes/, public/  # legado preservado
├── docs/audits/desgarrados-legacy-01.md
├── correio.md
├── executed.md
└── apps/desgarrados-next/                        # futura base
    ├── app/{Models,Enums,Policies,Actions}/
    ├── app/Http/Controllers/{Admin,Public}/
    ├── app/Http/Requests/
    ├── app/Console/Commands/
    ├── bootstrap/{app,providers}.php
    ├── config/{database,filesystems}.php
    ├── database/{migrations,factories,seeders}/
    ├── resources/js/{pages,layouts,components,types}/
    ├── routes/{web,admin,console}.php
    └── tests/{Feature,Unit}/
```

Seguir skeleton Laravel 13: middleware/exceptions/rotas em bootstrap/app.php e providers em bootstrap/providers.php; console e agendamento conforme skeleton escolhido. Não recriar Http/Kernel.php do Laravel 10. Carregar admin.php explicitamente sob grupo web e proteção administrativa.

## 3. Versões propostas

| Componente | Alvo |
|---|---|
| Laravel | 13.x estável; kit observado declara ^13.17 |
| PHP | 8.4, usando inicialmente 8.4.24 disponível |
| MySQL | 8.4 LTS como proposta dentro de 8.x |
| Inertia Laravel / React | 3.x em ambos os lados |
| React / React DOM | 19.2.x |
| TypeScript | 5.x; baseline ^5.7.2 observado |
| Tailwind / plugin Vite | 4.x |
| Vite / laravel-vite-plugin | 8.x / 3.x |
| Node / npm | 24.18.0 / 11.16.0 disponíveis |
| PHPUnit | 12.x; baseline ^12.5.23 observado |

Laravel 13 aceita PHP 8.3–8.5, incluindo o runtime local. Fonte: [releases Laravel 13](https://laravel.com/framework/docs/13.x/releases). O kit atual usa Inertia 3, React 19 e Tailwind 4. Fonte: [starter kits oficiais](https://laravel.com/framework/docs/13.x/starter-kits).

Constraints foram verificadas no [package.json oficial](https://github.com/laravel/react-starter-kit/blob/main/package.json) e [composer.json oficial](https://github.com/laravel/react-starter-kit/blob/main/composer.json). A branch main é mutável: registrar tag/commit e locks na instalação. Não houve resolução Composer/npm, validação de servidor MySQL, engines ou build; a compatibilidade completa permanece a comprovar.

## 4. Dependências propostas

- Laravel: Eloquent, validação, policies, sessão, Storage e filas.
- Fortify: autenticação local, reset, verificação, confirmação de senha e 2FA.
- Inertia Laravel/React: ligação entre controllers e páginas.
- React/DOM, TypeScript, Vite, plugins React/Laravel e Tailwind: frontend/build.
- PHPUnit, Mockery e Faker: testes; Pint: formatação.
- Wayfinder/componentes acessíveis do kit: somente se usados nas rotas e interface.
- Sanitizador HTML com parser e allowlist no servidor: selecionar implementação mantida/compatível e testar antes de publicar rich text.

Não transportar automaticamente Breeze antigo, Sanctum, Moment, Datepicker, Animate.css, TinyMCE cloud ou pacote de permissões. Sanctum só se houver API autenticada com finalidade real.

O manifest atual inclui ferramentas adicionais como Vite Plus e Chisel; avaliar usos/scripts da tag escolhida antes de manter/remover. Preferir Vite padrão se atender à aplicação. Um único gerenciador frontend: npm com package-lock.json.

## 5. Arquitetura dos módulos

| Módulo | Responsabilidades e entidades |
|---|---|
| Core | Fortify, User, UserRole, UserPolicy, Settings |
| Conteúdo | Content, ContentKind, Category, Section e policies |
| Mídia | Image, Gallery, Audio, Playlist, policies e ação de upload |
| Comunidade | Comment, Message e moderação |
| Agenda | Event, agenda pública e policy |

Models/Enums/Policies nativos, controllers e Form Requests por função. Actions somente para operações concretas com transação, storage ou importação. Não criar repositories genéricos, services vazios ou framework modular.

### Decisão Posts e Pages

Escolha B: único model Content/tabela contents, com kind=post|page, telas e rotas específicas se úteis.

Evidências: Post.php define type=0 página/type=1 postagem; ambos os controllers usam Post; formulários compartilham título, resumo, TinyMCE, imagem, ativo e botões sociais. Posts acrescentam categorias múltiplas e opção “Abrir postagem”. PageController público também usa Post. Não há campos específicos suficientes para justificar duas tabelas nesta etapa.

Decisão baseada no comportamento/contratos, não apenas no banco compartilhado. Kind é definido no servidor; binding e policy impedem acessar post pela rota page ou trocar tipo pelo payload. Categorias aplicam-se inicialmente a posts. Preservar autoria, publicação e slug comum. Rotas públicas antigas incompletas não são prova de funcionamento.

`linked` é flag de abertura, conforme comentário do model/checkbox, não uma FK. Propor is_link_enabled booleano e confirmar efeito público antes da migração.

## 6. Schema canônico proposto

Convenções: utf8mb4; PK BIGINT UNSIGNED gerada no destino; FKs do mesmo tipo; timestamps UTC Laravel em entidades; campos NOT NULL salvo “?”; status VARCHAR com enum PHP e CHECK quando aplicável. Slugs normalizados, validados e únicos; não alterar automaticamente quando título mudar.

### Users

| Campo | Tipo / nullable / default | Restrição / cast / finalidade |
|---|---|---|
| id | bigint unsigned, não, gerado | PK nova |
| name | varchar(150), não, sem default | nome público |
| username | varchar(50), sim, NULL | unique, normalizado, identificador opcional |
| email | varchar(254), não, sem default | unique, normalizado; login |
| email_verified_at | timestamp, sim, NULL | datetime |
| password | varchar(255), não, sem default | hashed, hidden |
| role | varchar(20), não, user | UserRole(admin/editor/user); índice(role,is_active) |
| is_active | boolean, não, true | boolean, bloqueio de acesso |
| avatar_image_id | bigint unsigned, sim, NULL | FK images SET NULL; índice |
| remember_token | varchar(100), sim, NULL | hidden, sessão |
| created_at / updated_at | timestamps geridos por Laravel | datetime |
| campos 2FA Fortify | text/text/timestamp, sim, NULL | segredo/recovery encrypted e hidden; confirmação datetime |

Criar users primeiro sem avatar; após images, adicionar FK avatar em migration posterior para evitar ciclo. Não usar legacy_id na tabela: mapping central.

Mass assignment de perfil/registro exclui role/is_active/author_id; alteração de privilégios exige request/policy próprios.

Mapeamento futuro legacy.users: id → mapping; name/email normalizados; username/role/avatar/active só lidos se existirem no schema real. Os quatro campos são usados no código mas ausentes na migration original. Papéis numéricos são contraditórios: formulário indica admin=0 enquanto a listagem interpreta de outra maneira. Papel desconhecido gera conflito; nunca promover automaticamente, usar user inativo se houver importação em quarentena.

Não inventar autor, fundir emails duplicados nem copiar sessões/tokens/2FA. Preservar hash de senha somente se algoritmo/política forem compatíveis; caso contrário exigir reset. Verificação de email exige origem confiável.

### Domínio

| Tabela | Campos principais | Integridade/casts |
|---|---|---|
| categories | parent_id?, name(150), slug(191), description text?, sort_order unsigned int default 0, is_active bool default true | slug unique global; parent FK RESTRICT; índice(parent_id,sort_order); bool/int |
| contents | kind(16), author_id?, title(255), slug(191), summary text?, body_html longtext, featured_image_id?, status(20) default draft, published_at?, show_social_buttons bool default false, is_link_enabled bool default true | unique(kind,slug); índice(kind,status,published_at); author/image FKs SET NULL; enums/datetime/bool |
| category_content | category_id, content_id | PK composta; FKs CASCADE só no pivô; índice inverso(content_id,category_id); associação page rejeitada |
| images | uploaded_by?, disk(32), path(512), original_name(255)?, mime(100), size_bytes unsigned bigint, width/height unsigned int?, checksum char(64), title(255)?, description text?, alt_text(255)? | unique(disk,path); checksum index não unique; usuário SET NULL; int |
| galleries | title(255), slug(191), description text?, cover_image_id?, status default draft, published_at? | slug unique; índice(status,published_at); cover SET NULL; enum/datetime |
| gallery_image | gallery_id, image_id, sort_order unsigned int default 0 | PK composta; FKs CASCADE só no pivô; índice(gallery_id,sort_order) e image_id |
| audios | uploaded_by?, disk/path/original_name/mime/size_bytes/checksum como images, title(255)?, duration_seconds decimal(10,3)? | unique(disk,path); checksum index; usuário SET NULL; int/decimal |
| playlists | title(255), slug(191), genre(100)?, description text?, cover_image_id?, status default draft, published_at? | slug unique; cover SET NULL; índice(status,published_at); legacy gender → genre |
| audio_playlist | audio_id, playlist_id, sort_order unsigned int default 0 | PK composta; FKs CASCADE só no pivô; índice(playlist_id,sort_order) e audio_id |
| comments | content_id?, user_id?, author(150), email(254)?, body text, status default pending, moderated_by?, moderated_at? | content FK RESTRICT; usuários SET NULL; índice(content_id,status,created_at); enum/datetime |
| messages | name(150), email(254)?, state(2)?, city(150)?, body text, status default pending, moderated_by?, moderated_at? | moderador SET NULL; índice(status,created_at); enum/datetime |
| events | title(255), slug(191), state(2)?, city(150)?, venue(255)?, starts_at datetime, ends_at datetime?, timezone(64) default America/Sao_Paulo, description_html longtext?, cover_image_id?, status default draft | slug unique; índice(status,starts_at); cover SET NULL; UTC; ends_at >= starts_at |
| settings | id=1, title(255)?, description text?, logo_image_id?, address text?, meta_description text?, contacts json?, map_url(2048)? | singleton CHECK/aplicação; logo SET NULL; contacts array cast; sem secrets |
| sections | key(64), category_id?, title(150)?, sort_order unsigned int default 0, is_active bool default true | key unique; categoria RESTRICT; índice(is_active,sort_order); bool/int |

Textos (n) significam VARCHAR(n). Todas as entidades recebem timestamps; pivôs só se houver necessidade demonstrada.

Enums: ContentKind(post,page), UserRole(admin,editor,user), PublicationStatus(draft,published,archived), ModerationStatus(pending,approved,rejected), EventStatus(draft,published,cancelled,archived). Status de mídia agrupada e conteúdo têm varchar(20); nenhum status numérico mágico. Publicação exige published e published_at <= agora.

Categorias: parent NULL define raiz; lista adjacente basta. Validar auto-parent/ancestrais em transação e serializar alterações concorrentes para evitar ciclos. Exclusão com descendentes exige reparent explícito. Ordenação por sort_order/id. Profundidade/uso real precisam do inventário.

Comentários sem vínculo no legado preservam content_id NULL e permanecem fora do público até associação/moderação. Messages privadas por padrão; confirmar significado do checkbox situation antes de mapear aprovado/lido.

Sections: transformar section1…section5 em linhas home-1…home-5 com category_id mapeado, conforme seleção de categorias/home. Settings maps/contacts exigem conversão para URL HTTPS/dados estruturados, sem HTML arbitrário. Múltiplas linhas reais exigem resolução, não usar first() silenciosamente.

URLs antigas: inventariar e criar redirects legacy_path unique → destination_path quando necessário; conflito de slug terá resolução determinística e registro de origem.

## 7. Estratégia de autenticação

Fortify com guard web/sessão local; login por email, hash seguro, rotação de sessão no login, invalidação/regeneração CSRF no logout, reset, verificação, confirmação de senha e rate limit.

Registro público desabilitado inicialmente; se habilitado, role=user definido pelo servidor. Primeiro admin via comando explícito com senha interativa/segredo temporário; nenhuma senha fixa em seed. Preparar 2FA administrativo para produção.

Conta inativa não autentica; middleware bloqueia inclusive sessões existentes após desativação. Reautenticar operações sensíveis de email/senha/privilégios/2FA.

## 8. Estratégia de autorização

Roles simples no banco + policies Laravel suficientes; sem pacote externo.

| Ação | Admin | Editor/autor | User |
|---|---|---|---|
| Painel | sim, ativo/verificado | sim, ativo/verificado | não |
| Users, roles, settings | sim | não | não |
| Criar conteúdo/mídia/evento | sim | conforme policy | não |
| Alterar conteúdo próprio | sim | conforme ownership/estado | não |
| Alterar conteúdo alheio | sim | não por padrão | não |
| Publicar/moderar | sim | não inicialmente | não |

Gate access-admin para painel; policies viewAny/view/create/update/delete e publish/moderate por recurso. Grupo admin com web, auth, conta ativa, verified e can:access-admin; cada endpoint exige sua policy. Prefixo URL não constitui autorização.

Evitar bypass global que permita violar invariantes: último admin ativo, ciclos e arquivo válido continuam obrigatórios. Não aceitar role/author_id arbitrários. Filtrar consultas por capacidades e propriedade; menus React apenas refletem autorização do servidor.

## 9. Estratégia de mídia

Storage/Flysystem com disk privado de quarentena fora do document root; mídia pública validada no disk public (storage/app/public). Banco guarda disk/path relativos; URLs via Storage, permitindo futuro S3/CDN.

Diretórios images/YYYY/MM, audio/YYYY/MM e variants; nomes UUID/ULID com extensão derivada do MIME real. Nome original é metadado. Nunca aceitar path do usuário ou usar timestamp isolado.

Proposta inicial: JPEG/PNG/WebP até 10 MiB e 12.000 px por eixo, com limite adicional de pixels; MP3/Ogg/WAV até 100 MiB. Verificar MIME real, extensão coerente e decodificação. Rejeitar SVG, HTML, scripts/executáveis; outros formatos exigem necessidade/testes. Alinhar limites PHP/proxy/aplicação.

Servidor serve /storage estaticamente e nunca executa upload via PHP/CGI; nosniff e document root exclusivo public. Arquivos privados exigem autorização.

Remoção por Storage após commit, com log/retry e checagem de todos os vínculos. Cascades de pivô não apagam arquivo compartilhado. Upload/banco precisam compensação pois transação SQL não inclui filesystem.

| Origem detectada | Destino futuro |
|---|---|
| public/storage/uploads: featured/avatar | images + FKs canônicas |
| public/storage/galleries | images, gallery_image e capas |
| public/storage/playlists | audios ou images conforme MIME |
| public/storage/agenda | images + capa de events |
| public/storage/logo | images + settings.logo_image_id |
| public/images, photos, icones e demais assets | inventário/licença/checksum → asset estático ou mídia |

Validar realpath de public/storage (symlink ou pasta). Exclusão de avatar usa caminho divergente public/uploads no legado. Nenhum arquivo foi movido/destruído.

## 10. Estratégia de conteúdo HTML

HTML não confiável: sanitização server-side com parser/allowlist em toda gravação/importação. body_html/description_html armazenam versão sanitizada; original preservado em snapshot privado de auditoria.

Permitir parágrafos, headings limitados, listas, ênfase, blockquote e tabelas se necessárias. Remover script/on*/style arbitrário/forms/objetos/SVG e protocolos javascript/data. Links HTTP/HTTPS e mailto validado; target blank com noopener/noreferrer.

Imagens embutidas referenciam mídia autorizada; mapear URLs antigas após validação, reportar ausentes. Não buscar URL externa automaticamente durante importação. Iframes desabilitados inicialmente; eventual embed exige provedor/atributos restritos e CSP.

React renderiza HTML somente por componente controlado alimentado com conteúdo sanitizado; resto escapado. TinyMCE pode ser preservado após revisão de licença/integração, sem herdar chave cloud fixa.

## 11. Estratégia de conexão com banco legado

Conexão nomeada legacy, com LEGACY_DB_HOST/PORT/DATABASE/USERNAME/PASSWORD, credenciais distintas e usuário MySQL SELECT somente; preferir snapshot/réplica consistente.

Permissões reais do servidor devem negar escrita/DDL, não apenas convenção do código. Leituras explícitas DB::connection('legacy'); migrations/models de destino usam banco novo.

Verificar que origem/destino não são mesmo schema antes da importação. Nunca migrar conexão legacy nem executar importação no setup/deploy. Secrets fora de Git/logs; .env.example somente placeholders.

## 12. Estratégia de importação

Futuro comando explícito com dry-run por padrão, apply deliberado, entidade/lote/run e lock concorrente. Não implementado nem executado nesta etapa.

Ordem: snapshot/inventário → usuários → categorias/ancestrais → mídia → contents → galerias/playlists/eventos → pivôs → settings/sections → comentários/mensagens. Avatar/referências resolvidos em segunda passagem.

Leitura em lotes por ID, normalização, validação/sanitização, transação no destino com mapping. Filesystem usa staging/compensação. Origem permanece intocada.

Idempotência por mapping/checksums; reexecução sem mudança não duplica registros/pivôs. Se origem e destino mudaram desde a última importação, registrar conflito sem sobrescrever edição. Ausência no legado não implica deletar destino.

Controle: import_runs(id UUID PK, source, mode, status, started_at, finished_at?, counts JSON); import_issues(id, run_id FK, entity, legacy_id?, code, resumo, resolution?). Logs com run/entidade/IDs/contagens, sem senha/token/conteúdo pessoal completo.

Conflitos: email/slug duplicado, role/flag desconhecido, ciclo/órfão, comentário sem vínculo, arquivo ausente/inseguro, sanitização, URL ambígua e data inválida. Comparar contagens/vínculos/checksums antes da publicação.

## 13. Estratégia de rastreamento de IDs legados

Escolha: legacy_mappings, suficiente para posts/pages na mesma origem e referências convergentes de mídia.

Campos: id bigint PK; source(64); entity(64); legacy_id(191); target_type(64); target_id bigint unsigned; source_hash/target_hash char(64); import_run_id UUID FK; imported_at timestamp. Unique(source,entity,legacy_id); índice(target_type,target_id).

Target_type tem allowlist estável, não classe PHP fornecida pelo usuário. Relação polimórfica não tem FK genérica SQL: validar existência no importador/testes e preservar mapping para auditoria.

legacy.posts.id → content, kind validado; não duplicar mapping post/page. Pivôs usam pares mapeados/PK composta; section slots têm identidade source-row/slot. IDs novos independentes dos antigos.

## 14. Estrutura frontend

Starter kit React/Inertia/TypeScript/Tailwind seguindo tag escolhida. PublicLayout, AdminLayout com navegação por capabilities e AuthLayout.

Base inicial: home mínima, login/reset/verificação, painel autorizado, perfil e 403/404. Componentes: botões, inputs/labels, erros, flash, navegação, paginação e confirmação acessível; usar só componentes necessários.

Props tipadas com identidade mínima/capabilities, sem secrets/campos privados. Rotas server-side e listas paginadas. Interface funcional primeiro; design definitivo posteriormente. Avaliar SSR ao migrar público sem exigir infraestrutura SSR para a primeira base.

## 15. Estratégia de testes

PHPUnit/factories, banco descartável próprio e CI MySQL 8.x para constraints reais. RefreshDatabase jamais em conexão legacy/produção.

Cobertura inicial obrigatória: login válido/inválido/rate limit; logout e sessão inválida; visitante redirecionado; user recebe 403; admin entra; editor respeita ownership; user inativo/não verificado bloqueado; mudança de role/author_id negada; último admin protegido; request rejeita email duplicado/enum/data/upload inválido; policies verificadas via endpoints HTTP.

Antes de migrar cada módulo: comportamento essencial testado. Mídia/HTML exigem casos MIME falso, XSS, arquivo compartilhado e compensação. Importador futuro exige reexecução sem duplicação, conflito sem overwrite, órfãos, hash e origem SELECT-only. Validar typecheck/build Vite da base antes de dados.

## 16. Riscos encontrados

- Sem correio anterior não há diff textual; hash registrado permite comparação futura.
- Banco real pode divergir de migrations; schema/users/roles e flags precisam inventário.
- Admin legado desprotegido; arquitetura proposta não modifica sua exposição.
- Binding de Page/Post sem filtro, autoria ausente, pivôs/slugs sem unicidade e comentários órfãos.
- Arquivos/realpaths/licenças/execução no servidor não verificados; nomes timestamp e unlink manual.
- Settings/Sections assumem first(); múltiplas linhas precisam resolução.
- HTML/maps/embeds precisam sanitização/conversão.
- Dependências ausentes: runtime/build/compatibilidade completa não comprovados.
- Starter kit possui scripts que executam migrations; revisar antes de instalar.
- Agenda antiga não declara timezone; confirmar origem antes de UTC.
- Mensagens/e-mails exigem acesso privado e logs sem conteúdo pessoal.

## 17. Arquivos criados

`docs/audits/desgarrados-legacy-01.md`: cópia integral da auditoria anterior. Nenhum scaffold, migration executável ou importador criado.

## 18. Arquivos alterados

`executed.md`: relatório DESGARRADOS-LEGACY-02. Correio e todos os arquivos Laravel 10 preservados.

## 19. Comandos executados

Inspeções: git status --short; git branch --show-current; git rev-parse HEAD/short; git diff --stat; git log --all --oneline -- correio.md; git cat-file -e HEAD:correio.md; git log -4 --oneline; rg --files/rg -n; sed de instruções, controllers, models, migrations, frontend, routes, manifests, storage e testes.

Ambiente: php -v; composer --version; node --version; npm --version; verificações de vendor/node_modules; sha256sum correio.md. Consulta HEAD:correio.md retornou 128 pela ausência do arquivo no commit.

Fontes externas: documentação Laravel 13 e manifests oficiais do starter kit. Escritas com apply_patch; verificações documentais finais. Não houve install/update, migration, importação, conexão ao banco, deploy ou movimento de mídia.

## 20. Testes executados

Nenhum PHPUnit/build executado: dependências ausentes e entrega documental. Verificação da entrega: 21 seções, hash do correio preservado, cópia integral da auditoria e ausência de alterações rastreadas no legado. Essas verificações não validam runtime/schema/servidor.

## 21. Próxima etapa recomendada

DESGARRADOS-NEXT-01: criar base isolada apps/desgarrados-next de tag estável oficial revisada, environment/storage/banco próprios e locks resolvidos; revisar scripts antes da instalação.

Implementar UserRole/schema users, Fortify, middleware conta ativa, gate do painel, UserPolicy, layouts mínimos e testes de login/logout/autorização. Rodar testes/typecheck/build antes de qualquer migração de negócio.

Obter snapshot SELECT-only/inventário de arquivos e URLs para validar roles, flags, hierarquia e timezone. Depois implementar mídia/sanitização e importador dry-run testado.

Estado final: preparação arquitetural concluída e relatório salvo; scaffold, testes funcionais e importação pertencem à implementação futura.
