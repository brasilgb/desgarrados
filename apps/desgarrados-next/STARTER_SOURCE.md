# Proveniência

- Repositório: https://github.com/laravel/react-starter-kit
- Commit fixado: `87cce8705d712629ebddd70ccfbb06592ecbaac2`.
- Arquivo usado: distribuição Composer previamente em cache, `laravel-react-starter-kit-87cce87/`.
- Framework estável: https://github.com/laravel/framework/releases/tag/v13.32.0
- Referência framework no lock: `cdd8b33c246719acdd118c705ce8c7ab5ef48a96`.
- Scripts Composer/npm revisados antes da execução; instalação inicial `--no-scripts --no-plugins` / `--ignore-scripts`.
- Removidos scripts que disparavam migrations/publicação automaticamente. Descoberta de pacotes e migrations locais realizadas explicitamente.
- Vite Plus substituído por Vite padrão; removido download de fontes no build para funcionar offline.
- Licença MIT declarada no composer.json oficial e preservada no manifest.

Versões exatas e checksums das dependências constam em composer.lock/package-lock.json. A rede do terminal não resolve GitHub/Packagist/npm; pacotes foram obtidos de caches locais. Auditorias atuais online precisam ser repetidas quando houver rede.
