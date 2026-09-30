# Skills de projeto: procedência

As pastas abaixo são cópias **sem alteração** do repositório público [rtadewald/skills](https://github.com/rtadewald/skills), base definida para o workflow deste projeto.

| Skill | Origem | Commit upstream |
|---|---|---|
| `img-to-html/` | https://github.com/rtadewald/skills/tree/main/img-to-html | `99d0b39ce50b109f8b8484047f92e7943ac6c23d` |
| `to-wireframe/` | https://github.com/rtadewald/skills/tree/main/to-wireframe | `99d0b39ce50b109f8b8484047f92e7943ac6c23d` |

- Obtidas via GitHub API (`gh api .../contents/<path>?ref=<commit>`), em 2026-09-30.
- Integridade: o `git hash-object` de cada arquivo é igual ao SHA do blob upstream.
- **Não editar** os arquivos dessas pastas. Para atualizar, copiar de novo de um commit upstream e atualizar esta tabela.

## Invocação

As duas skills declaram `disable-model-invocation: true`: só o usuário as invoca (`/img-to-html`, `/to-wireframe`). Quando o agente as executa por pedido do usuário sem invocação formal, registra a execução como **manual, seguindo o `SKILL.md`**.
