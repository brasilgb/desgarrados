# DESGARRADOS-NEXT-01 — Evidências locais

Data: 2026-10-02. Comandos executados em apps/desgarrados-next. Nenhum check remoto/browser foi realizado.

## PHPUnit

```json
{"tool":"phpunit","result":"passed","tests":57,"passed":57,"assertions":261,"duration_ms":2178}
```

## Pint

```json
{"tool":"pint","result":"passed"}
```

## TypeScript

Exit code 0.

```text
> types:check
> tsc --noEmit
```

## Vite

Exit code 0. Trecho final:

```text
public/build/assets/app-B_kX5wgt.js                   160.02 kB │ gzip:  49.35 kB
public/build/assets/jsx-runtime-nEZigawT.js           345.30 kB │ gzip: 107.95 kB

✓ built in 1.28s
```

## Smoke test real

Kernel HTTP da aplicação, sem withoutVite: / e /login responderam 200, com /build/assets/ no HTML. Nenhuma inspeção visual em navegador.

## Composer validate

composer validate --strict: exit code 0, ./composer.json is valid.

## Composer audit

Falhou; relatório de segurança não obtido.

```text
https://repo.packagist.org could not be fully loaded (curl error 6 while downloading https://repo.packagist.org/packages.json: Could not resolve host: repo.packagist.org), package information was loaded from the local cache and may be out of date
The following exception probably indicates you are offline or have misconfigured DNS resolver(s)

In CurlDownloader.php line 401:
                                                                               
  curl error 6 while downloading https://packagist.org/api/security-advisorie  
  s/: Could not resolve host: packagist.org                                    
                                                                               

audit [--no-dev] [-f|--format FORMAT] [--locked] [--abandoned ABANDONED] [--ignore-severity IGNORE-SEVERITY] [--ignore-unreachable]
```

## npm audit

Falhou; relatório de segurança não obtido.

```text
npm warn audit request to https://registry.npmjs.org/-/npm/v1/security/advisories/bulk failed, reason: getaddrinfo EAI_AGAIN registry.npmjs.org
undefined
npm error audit endpoint returned an error
npm error A complete log of this run can be found in: /tmp/desgarrados-next-npm-logs/2026-10-02T20_19_17_052Z-debug-0.log
```

## Preservação

git diff --exit-code: 0. Branch main e HEAD 6328437f9bf4019f36eb9dc49f021cafa60bad33 preservados. correio.md SHA-256: 4fc7792100b4c638f0bef829778b004bdb40421cff5e58101b84193a0951800e.
