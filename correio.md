# DESGARRADOS-NEXT-01 — Criar base Laravel 13 isolada

A etapa DESGARRADOS-LEGACY-02 foi aprovada.

Agora iniciar a implementação real da nova aplicação Desgarrados.

A arquitetura aprovada está documentada em `executed.md`.

O legado Laravel 10 deve permanecer preservado na raiz.

A nova aplicação deve ser criada em:

`apps/desgarrados-next/`

---

# OBJETIVO DESTA ETAPA

Criar uma base Laravel 13 funcional, executável e testada contendo apenas a fundação:

- Laravel 13;
- PHP 8.4;
- Inertia;
- React;
- TypeScript;
- Vite;
- Tailwind;
- autenticação;
- usuários;
- roles;
- autorização;
- painel administrativo mínimo;
- layouts básicos;
- testes.

NÃO migrar ainda os módulos de conteúdo do legado.

Não implementar ainda:

- posts;
- pages;
- categories;
- galleries;
- images de negócio;
- playlists;
- audio;
- comments;
- messages;
- events;
- settings;
- sections;
- importador legado.

Nesta etapa queremos somente uma fundação moderna, segura e validada.

---

# 1. Segurança inicial do repositório

Antes de qualquer alteração:

- executar `git status`;
- registrar branch;
- registrar HEAD;
- confirmar que o Laravel 10 permanece intacto;
- verificar se `apps/desgarrados-next/` já existe.

Se existir conteúdo parcial nesta pasta, auditar antes de sobrescrever.

Não apagar arquivos do legado.

---

# 2. Criar a aplicação

Criar uma aplicação Laravel 13 independente dentro de:

`apps/desgarrados-next/`

Utilizar versão/tag estável oficial.

Evitar depender diretamente de branch `main` mutável.

Registrar:

- versão exata Laravel;
- versão PHP;
- versões principais do frontend;
- versão/tag/commit do starter kit utilizado.

Manter locks do Composer e npm.

Usar somente:

`npm`

Não criar yarn.lock.

---

# 3. Banco de desenvolvimento

Configurar banco independente para a nova aplicação.

Nunca apontar migrations/testes para o banco legado.

Sugestão de banco:

`desgarrados_next`

e banco de testes separado quando necessário.

`.env.example` deve possuir somente placeholders seguros.

Não versionar `.env`.

Se não houver MySQL disponível localmente, pode configurar ambiente de testes apropriado, mas documentar claramente a diferença.

---

# 4. Starter kit

Utilizar stack oficial:

- Laravel 13;
- Inertia;
- React;
- TypeScript;
- Tailwind.

Revisar scripts do starter kit antes de executá-los.

Não executar comandos destrutivos ou migrations em banco não confirmado.

Não adicionar Sanctum sem necessidade.

Não adicionar pacote externo de roles/permissions.

---

# 5. UserRole

Criar enum:

`App\Enums\UserRole`

Valores iniciais:

- admin
- editor
- user

Usar valores string persistidos no banco.

Não utilizar inteiros mágicos.

---

# 6. Users

Criar schema canônico inicial de usuários conforme arquitetura aprovada.

Campos mínimos:

- id;
- name;
- username nullable;
- email;
- email_verified_at;
- password;
- role;
- is_active;
- remember_token;
- timestamps;

e os campos necessários do Fortify/2FA caso o starter kit os utilize.

Ainda NÃO adicionar:

`avatar_image_id`

porque `images` será criada futuramente.

Regras:

- email unique;
- username unique nullable;
- role default user;
- is_active default true;
- password hidden/hashed;
- role cast para UserRole;
- is_active boolean.

Mass assignment não deve permitir alteração arbitrária de:

- role;
- is_active.

---

# 7. Autenticação

Implementar e validar:

- login;
- logout;
- reset de senha;
- confirmação de senha;
- verificação de e-mail;
- proteção de sessão;
- rate limit de login.

Registro público deve permanecer desabilitado inicialmente.

Usuários serão criados administrativamente.

Não criar usuário administrador com senha fixa em Seeder.

---

# 8. Conta ativa

Implementar proteção para impedir login/acesso de usuário com:

`is_active = false`

A proteção deve valer também para sessões previamente autenticadas.

Criar middleware ou abordagem equivalente compatível com Laravel 13.

---

# 9. Primeiro administrador

Criar um comando Artisan explícito, por exemplo:

`php artisan app:create-admin`

O comando deverá:

- solicitar nome;
- solicitar email;
- solicitar senha de maneira segura/interativa;
- criar usuário role=admin;
- marcar email como verificado quando apropriado;
- nunca possuir senha hardcoded;
- rejeitar email duplicado.

Documentar uso.

---

# 10. Autorização

Criar Gate:

`access-admin`

Regras iniciais:

### admin

Pode acessar painel administrativo.

### editor

Pode acessar painel administrativo, mas não gerenciamento de usuários.

### user

Não pode acessar painel administrativo.

Usuário deve estar:

- autenticado;
- ativo;
- verificado,

conforme fluxo definido.

---

# 11. UserPolicy

Criar `UserPolicy`.

Inicialmente:

### Admin

Pode:

- listar usuários;
- visualizar usuário;
- criar;
- editar;
- ativar/desativar;
- alterar role.

### Editor

Não administra usuários.

### User

Não administra usuários.

Adicionar proteção para impedir situações como:

- usuário alterar sua própria role via payload;
- usuário não autorizado alterar role;
- desativar arbitrariamente o último administrador ativo.

Criar regra para preservar pelo menos um admin ativo.

---

# 12. Rotas administrativas

Criar `routes/admin.php`.

Carregá-la conforme estrutura Laravel 13.

Grupo administrativo deve exigir:

- web;
- auth;
- email verificado;
- conta ativa;
- `can:access-admin`.

O prefixo pode ser:

`/admin`

Mas prefixo não deve ser tratado como segurança.

---

# 13. Painel mínimo

Criar página mínima:

`/admin`

Ela deve apenas comprovar:

- autenticação;
- layout administrativo;
- autorização;
- usuário atual;
- role atual.

Não criar dashboard complexo ainda.

---

# 14. Layouts

Criar somente estrutura inicial:

- PublicLayout;
- AuthLayout;
- AdminLayout.

AdminLayout deve possuir navegação baseada em capabilities recebidas do servidor.

Não confiar no frontend para autorização.

O frontend apenas esconde/exibe opções; o servidor decide acesso.

---

# 15. Capabilities

Fornecer ao Inertia uma estrutura mínima de permissões, por exemplo:

- accessAdmin;
- manageUsers;

Evitar enviar dados internos desnecessários.

Capabilities devem ser derivadas de policies/gates do backend.

---

# 16. Administração de usuários

Implementar CRUD administrativo mínimo de usuários:

- listagem;
- criação;
- edição;
- ativar/desativar;
- alteração de role.

Não é necessário avatar ainda.

Usar:

- Form Requests;
- Policies;
- paginação;
- validação server-side;
- mensagens flash.

Não permitir alteração de senha sem fluxo explícito.

Se senha for definida na criação, usar hash apropriado.

---

# 17. Testes obrigatórios

Esta etapa somente será considerada concluída se existirem testes para:

### Autenticação

- login válido;
- login inválido;
- logout;
- rate limit quando aplicável.

### Autorização

- visitante não acessa `/admin`;
- user não acessa painel;
- editor acessa painel;
- admin acessa painel;
- editor não administra usuários;
- admin administra usuários.

### Estado

- usuário inativo não autentica/acessa;
- usuário não verificado é bloqueado quando exigido.

### Segurança

- role não pode ser alterada por mass assignment;
- usuário comum não altera role;
- último admin ativo não pode ser removido/desativado/rebaixado.

### Validação

- email duplicado rejeitado;
- role inválida rejeitada;
- username duplicado rejeitado.

---

# 18. Qualidade

Executar:

- PHPUnit;
- typecheck TypeScript;
- build Vite;
- Pint ou equivalente;
- auditoria básica Composer;
- auditoria npm quando disponível.

Corrigir erros encontrados nesta fundação.

Não ignorar testes falhando.

---

# 19. Legado

O Laravel 10 da raiz não deve ser modificado por esta implementação, salvo documentação estritamente necessária.

Não executar migrations no banco legado.

Não copiar controllers/models antigos.

A nova base deve utilizar o legado apenas como referência.

---

# 20. Git

Ao final informar:

- arquivos novos;
- arquivos alterados;
- dependências adicionadas;
- branch atual;
- status do Git.

Não fazer commit automaticamente caso esse não seja o fluxo já adotado no projeto.

---

# 21. Relatório

Atualizar `executed.md` com:

# DESGARRADOS-NEXT-01 — Fundação Laravel 13

Incluir:

1. Estado inicial
2. Versões instaladas
3. Starter kit utilizado
4. Estrutura criada
5. Banco configurado
6. UserRole
7. Schema users
8. Autenticação
9. Middleware de conta ativa
10. Gate administrativo
11. UserPolicy
12. Administração de usuários
13. Rotas
14. Layouts
15. Capabilities
16. Testes criados
17. Resultado PHPUnit
18. Resultado typecheck
19. Resultado build
20. Resultado auditorias
21. Arquivos criados
22. Arquivos alterados
23. Comandos executados
24. Problemas encontrados
25. Pendências
26. Próxima etapa recomendada

Finalizar com uma das situações:

**DESGARRADOS-NEXT-01 CONCLUÍDO — FUNDAÇÃO LARAVEL 13 FUNCIONAL E TESTADA**

ou

**DESGARRADOS-NEXT-01 PARCIAL — BLOQUEIOS DOCUMENTADOS**

Não iniciar DESGARRADOS-NEXT-02 automaticamente.
