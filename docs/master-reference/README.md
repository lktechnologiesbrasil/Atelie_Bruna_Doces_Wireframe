# Master Reference: Ateliê Doces Bruna (homepage desktop)

As quatro Master Slices abaixo passaram pelo gate visual (realizado fora do repositório) e são a **fonte de verdade visual canônica** da homepage.

## Ordem canônica

| Ordem | Slice | Concepts | Seções | Imagem | Documento | Status |
|---|---|---|---|---|---|---|
| 1 | Slice 01 | 01–02 | Hero + Manifesto | `slice-01.webp` | [slice-01-hero-manifesto.md](slice-01-hero-manifesto.md) | `APPROVED` |
| 2 | Slice 02 | 03–04 | Bruna + Criações | `slice-02.webp` | [slice-02-bruna-criacoes.md](slice-02-bruna-criacoes.md) | `APPROVED` |
| 3 | Slice 03 | 05–06 | Encomendas + Histórias Reais | `slice-03.webp` | [slice-03-encomendas-historias.md](slice-03-encomendas-historias.md) | `APPROVED` |
| 4 | Slice 04 | 07–08 | Bastidores + CTA final + footer | `slice-04.webp` | [slice-04-bastidores-fechamento.md](slice-04-bastidores-fechamento.md) | `APPROVED` |

Sequência de leitura da página: header → Hero → Manifesto → Bruna → Criações → Encomendas → Histórias Reais → Bastidores → CTA final → footer.

## Correções aplicadas no gate

| Slice | Correções |
|---|---|
| 01 | Aplicação da logo no header |
| 02 | Repetição do bolo de chocolate no Concept 04 substituída por composição variada (bolo claro com morangos e outros produtos) |
| 03 | Copy redundante da transição Encomendas → Histórias Reais removida |
| 04 | Concept 07 em cacau; menos repetição do bolo no 08; fechamento como cena de embalagem/celebração; dados factuais do footer convertidos em placeholders |

## Decisão de fonte de verdade

- As imagens aprovadas prevalecem sobre qualquer especificação anterior, inclusive `docs/consistency-review.md` e a especificação original da Slice 01 (commit `889e6ca`).
- **Não se corrige a imagem.** Toda divergência entre especificação e imagem é registrada como `DESVIO ACEITO NO GATE` no documento da slice, e a documentação descreve o estado realmente aprovado.
- Os pixels das slices aprovadas não são alterados.

## O que é placeholder ou direção fotográfica

Aparecer numa slice aprovada **não torna nada real, oficial ou autorizado**. Durante a implementação, assets e dados reais substituem estes elementos:

| Elemento | Onde | Situação |
|---|---|---|
| Depoimentos e legendas de cliente | Slice 03 | **`[PLACEHOLDER]`**. Só entram em produção com depoimentos reais e autorizados |
| Pessoa retratada como "Bruna" | Slice 02 | **Direção fotográfica**; não é a Bruna. Usar foto real |
| Texto em 1ª pessoa e assinatura "Bruna" | Slice 02 | **`[PLACEHOLDER]`**; exigem aprovação/arquivo real |
| Todos os produtos (bolos, doces, brigadeiros, sobremesas) | Slices 01–04 | **Direção fotográfica**; serão substituídos pelo portfólio real |
| Mãos, bastidores, cenas de mesa e celebração | Slices 01–04 | **Direção fotográfica** |
| Logo aplicada em avental, caixas e embalagens | Slices 01–04 | **Não é arte final** |
| Wordmark do header, lockup do footer e selo | Slices 01, 04 | Aplicação visual; a logo definitiva vem do material oficial da Bruna |
| `[TELEFONE]`, `[INSTAGRAM]`, `[LOCALIZAÇÃO]`, `[E-MAIL]`, `[HORÁRIO]`, `© [ANO]` | Slice 04 | **`[PLACEHOLDER]`**; dados reais só com validação |
| Claims "feito à mão", "ingredientes reais/selecionados", "histórias verdadeiras", processo Converse → Criamos → Celebre | Slices 01–03 | **Não validados**; confirmar com a Bruna |

## Próximas etapas

1. Stitch técnico das quatro slices em `master-reference.webp` (sem regeneração nem redesenho).
2. Gate técnico da Master Reference.
3. Wireframe estrutural a partir da Master.
4. Só depois da revisão do wireframe: implementação.
