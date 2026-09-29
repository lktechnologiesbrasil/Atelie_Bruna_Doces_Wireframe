# Ateliê Doces Bruna V2: Revisão global de consistência dos 8 concepts

> **Status:** referência canônica antes da criação da Master Reference.
> **Gate final:** **READY FOR MASTER REFERENCE**
> **Escopo:** somente consolidação da direção visual. Nenhuma implementação, wireframe ou alteração dos concepts.

Concepts analisados (`concepts/concept-01.webp` a `concept-08.webp`), lidos como seções consecutivas de uma única landing page longa:

1. 01 Hero / Impacto
2. 02 Manifesto / Essência
3. 03 Bruna / Autoria
4. 04 Criações / Desejo
5. 05 Encomendas / Experiência de pedido
6. 06 Histórias reais / Prova social
7. 07 Bastidores / Cuidado
8. 08 Fechamento / CTA final / Footer

---

## Decisão registrada: PLACEHOLDERS NÃO SÃO CONTEÚDO REAL

**Tudo o que aparece nos concepts foi produzido por geração visual. Aparecer em um concept não torna a informação verdadeira, oficial ou autorizada.**

Os itens abaixo **não podem ser tratados como dados oficiais da Bruna** e **não podem ir para a Master Reference como fato, nem para a produção**, sem validação explícita:

| Item | Onde aparece | Situação |
|---|---|---|
| Telefone `(11) 9 1234-5678` | 08 | **NÃO VALIDADO / PLACEHOLDER** (claramente fictício) |
| E-mail `atendimento@ateliedocesbruna.com` e domínio | 08 | **NÃO VALIDADO / PLACEHOLDER** |
| Endereço/localização ("São Paulo, SP", "atendimento sob encomenda") | 08 | **NÃO VALIDADO / PLACEHOLDER** |
| Horário ("Segunda a Sábado, 9h às 18h") | 08 | **NÃO VALIDADO / PLACEHOLDER** |
| Instagram `@ateliedocesbruna` | 08 | **NÃO VALIDADO / PLACEHOLDER** |
| Depoimentos (os 3 textos de citação) | 06 | **PLACEHOLDER**, não são avaliações reais |
| "Clientes" (legendas "CLIENTE ATELIÊ DOCES BRUNA / CELEBRAÇÃO ESPECIAL / ENCOMENDA PERSONALIZADA / PRESENTE AFETIVO") e pessoas fotografadas | 06 | **PLACEHOLDER**, não apresentar como clientes reais |
| Fotografia da Bruna | 03 | **DIREÇÃO VISUAL**, a pessoa gerada não é a Bruna; usar a Bruna real |
| Texto em primeira pessoa ("Eu sou a Bruna...") | 03 | **PLACEHOLDER**, precisa de aprovação da Bruna |
| Assinatura manuscrita "Bruna" | 03 | **PLACEHOLDER**, usar a assinatura real, se existir |
| Processo real de encomenda (Converse → Criamos → Celebre; briefing, prazos, sinal, canal) | 05 | **NÃO VALIDADO**, confirmar o fluxo real |
| Claim "ingredientes reais / de verdade / selecionados" | 01, 02, 04, 07 | **NÃO VALIDADO**, exige confirmação da Bruna |
| Claim "histórias verdadeiras" | 01, 02 | **NÃO VALIDADO**, entra em conflito com depoimentos placeholder |
| Claims "feito à mão" e "toque artesanal" | 01, 02, 03, 04 | **A CONFIRMAR** com a Bruna |
| Aplicações de marca geradas (avental, camiseta, caixa com fita, cartão, embalagens) | 02, 03, 05, 06, 07, 08 | **DIREÇÃO VISUAL**, nenhuma é arte final |
| Logo (wordmark do header e lockup do footer) | 01, 08 | Os concepts definem só a **aplicação visual**; a logo definitiva vem do **material oficial da Bruna** |

**Regra operacional:** todo item acima aparece na Master Reference, no wireframe e na implementação como `[PLACEHOLDER]` visível ou é omitido. Nunca como dado apresentado como real.

---

## 1. Veredito global

**Funciona como um sistema único no nível de marca, mas ainda não como uma página contínua.** Colados como estão, o resultado seria uma sequência de 8 posters bonitos. A linguagem visual é sólida: mesma paleta, mesma tipografia, mesma fotografia quente e as mesmas curvas orgânicas. O que falta é ritmo e costura.

**A narrativa está certa.** A jornada tem abertura (01), tese (02), pessoa (03), desejo (04), processo (05), confiança (06), bastidores (07) e conversão (08). Duas observações:

- Bruna (03) antes das criações (04) é a decisão certa. A pessoa dá contexto ao produto.
- As seções 06 e 07 fazem quase o mesmo trabalho emocional: cuidado e afeto. A 07 funciona melhor como prova de artesanato do que como "mais emoção".

**Problemas reais, em ordem de gravidade:**

1. **Não há ritmo escuro/claro.** 01 e 08 são escuros e 02 a 07 são seis seções seguidas em creme. O pedido era "impacto → respiro → impacto → respiro", e hoje temos impacto → seis respiros → impacto.
2. **Quatro layouts são o mesmo.** 02, 04, 06 e 07 seguem "texto à esquerda, colagem de retângulos à direita". Somando 03, são cinco de sete com texto à esquerda e imagem à direita. Só a 05 quebra o padrão, com bolhas orgânicas.
3. **A mesma foto se repete.**
   - O bolo com drip e brigadeiro aparece em 01, 04, 05, 06 e 08.
   - A mão salpicando granulado aparece em 02 e no inset da 03.
   - A caixa com laço aparece em 02, 06, 07 e 08.
   - O tecido marrom aparece como faixa inferior em 02, 03, 04 e 05.

   Isso é limitação da geração, mas na produção mostraria a mesma foto seis vezes.
4. **Ornamento demais.**
   - Há seis selos circulares, cada um com um texto diferente ("Feito à mão com propósito", "Doce com propósito", "Celebrações que ficam", "Momentos especiais sempre com você").
   - A flor de linha aparece em 02, 03, 04, 05, 06 e 07, sempre no mesmo gesto: o fim de uma linha curva perto do texto.
5. **A margem esquerda muda em cada seção.** Medidas: 64, 85, 90, 100, 64, 67, 62 e 77px. A página precisa de um único eixo.
6. **Dois lockups de logo e duas navegações.**
   - O header do 01 usa o wordmark "d✿ces bruna" com "ATELIÊ" em cima e a flor no lugar do "o". Os concepts 02 a 08 usam o lockup empilhado (flor + "Ateliê Doces Bruna").
   - A nav do 01 é *A Marca, Bruna, Criações, Encomendas, Contato*. A do footer do 08 é *Início, Nossa Essência, Criações, Encomendas, Histórias Reais, Bastidores, Contato*.

Nada disso exige redesenho. São correções que a Master Reference resolve.

---

## 2. Design DNA final

### Cores

Os hex abaixo são **estimados a partir das imagens**. Devem ser extraídos do material oficial da Bruna.

| Papel | Token | Hex aproximado | Uso |
|---|---|---|---|
| **Primária** | Cacau | `#2B1810` | Headlines em fundo claro, fundo do 01/08 |
| **Primária** | Creme | `#FBF1E6` | Fundo dominante das seções claras |
| **Primária** | Chocolate | `#5A3020` | Corpo de texto, rodapé escuro |
| **Secundária** | Off-white | `#FFF8F0` | Cards, molduras de foto |
| **Secundária** | Blush | `#F8D5C4` | Botão primário, superfícies suaves |
| **Acento** | Caramelo | `#B96B45` | Itálicos das headlines, linhas finas, flor |
| **Acento (texto pequeno)** | Caramelo escuro | `#9A5233` | Microcopy e eyebrows |

O rosa-poeira do tecido é cor de fotografia, não de interface. Não vira token.

### Tipografia

- **Serif editorial de alto contraste** para headlines, 2 a 3 linhas.
- **A mesma serif em itálico, em caramelo**, para a segunda metade da frase. É a assinatura tipográfica: *momentos*, *cuidado e memória*, *uma ideia só sua*. Regra: **uma** ideia em itálico por headline, sempre no fim.
- **Sans geométrica** para corpo e UI, em 16–18px.
- **Uppercase com tracking largo** só para eyebrows, botões e rótulos, com mínimo de 12px.
- **Script manuscrito**: máximo de 2 ocorrências na página (`feito à mão` e a assinatura "Bruna"). Os demais scripts viram serif itálico.
- Não introduzir novas famílias tipográficas.

### Formas

- **Onda orgânica** como divisória entre seções, sempre com o topo curvo pertencendo à seção *de baixo*.
- **Molduras fotográficas:** retângulos com borda off-white e sobreposição em 02, 04, 06 e 07, e blobs orgânicos só na 05.
- **Linha fina caramelo** conectando elementos, só onde ela guia o olhar (05).
- **Botão pill em blush.** O variante outline serve para a ação secundária.

### Flor, selos, linhas e microfrases

| Elemento | Papel | Onde fica | Onde some |
|---|---|---|---|
| **Flor (linha grande)** | Assinatura, uma vez por "capítulo" | 03 (junto à assinatura da Bruna) e 05 (fim da jornada), talvez 08 | 02, 04, 06, 07 |
| **Flor (símbolo pequeno)** | Marca | Eyebrow do 01, logo, footer | Uso decorativo |
| **Selo circular** | Só um, com um texto | 01, no hero. Opcionalmente repete no 08 | 02, 03, 04, 06 |
| **Linhas orgânicas** | Guiam o scroll | 05 (jornada) e uma ponte curta entre seções | Como enfeite solto |
| **Lettering manuscrito** | Voz pessoal | `feito à mão` (01/02) e a assinatura da Bruna (03) | O resto |
| **Microfrases** | Fecham seções | Poucas: transição 07→08 | Cards de bolo, rodapé duplicado |

### Logo

- Referência oficial: **wordmark horizontal no header** (01) e **lockup empilhado no footer** (08). As duas versões precisam existir no kit da Bruna.
- Se o kit oficial só tiver uma, usar essa nos dois lugares. Não desenhar outra.
- **Não criar nova identidade.** Os concepts só definem a aplicação visual; a logo definitiva vem do material oficial.
- As aplicações secundárias que apareceram (avental, camiseta, caixa, cartão) são **direção de aplicação, não arte final**. Cada uma exige o arquivo real.

### Requisitos visuais de acessibilidade

- **Contraste:** o caramelo `#B96B45` sobre creme dá cerca de 3,6:1 (estimativa). Serve para texto grande, mas falha para microcopy. Usar o caramelo escuro (~5:1) em texto pequeno.
- **Tamanho mínimo:** o microcopy do 05 (`OCASIÃO · SABORES…`, ~9px), das legendas do 06 e do footer do 08 está abaixo do razoável. Piso: 12px em uppercase, 16px em corpo.
- **Texto sobre foto:** as legendas do 07 (`INGREDIENTES DE VERDADE`, `CUIDADO ATÉ O ÚLTIMO DETALHE`) ficam em branco pequeno sobre foto ocupada. Precisam de scrim ou de sair da foto.
- **Textos secundários do 08** (`Fale pelo WhatsApp`, `Acompanhe no Instagram`) são cinza claro sobre creme e devem escurecer.
- **Botão blush:** o texto precisa ser cacau ou chocolate, não caramelo.
- **CTAs:** alvo de toque ≥ 44px, foco visível em todos os elementos clicáveis e `prefers-reduced-motion` respeitado.
- **Numerais 01/02/03 do 05:** são blush de baixo contraste, o que é aceitável como decoração se o título carregar o passo (CONVERSE, CRIAMOS, CELEBRE).
- Navegação por teclado fica para a etapa de implementação.

---

## 3. Matriz dos 8 concepts

| # | Manter | Ajustar | Remover | Validar conteúdo | Asset real |
|---|---|---|---|---|---|
| **01 Hero** | Composição, headline, header, curva final | Só um selo; a faixa `feito à mão` fica no topo do 02, não repetida | Nada relevante | "Feito à mão", "ingredientes reais" | Bolo/produto real; logo oficial |
| **02 Manifesto** | Headline, colagem, copy | Sem flor grande nem selo; foto da mão não pode repetir no 03 | Selo `Doce com propósito`, flor | "Ingredientes reais", "toque artesanal" | Fotos reais de processo e embalagem |
| **03 Bruna** | Layout de retrato, assinatura, primeira pessoa | Inset diferente (não repetir o do 02); selo sai | Selo | **Texto em 1ª pessoa precisa ser aprovado pela Bruna**; assinatura | **Bruna real**, obrigatório |
| **04 Criações** | Headline (a melhor da página), colagem | Precisa de estrutura própria (ver §1); um bolo por foto | Selo, flor | "Ingredientes selecionados"; portfólio real | **Produtos reais** de cada categoria |
| **05 Encomendas** | Jornada 01/02/03, numerais, linhas | Micro-rótulos maiores; teaser de baixo alinhado à headline do 06 | Nada | **Processo real** (prazo, sinal, canal) | Bruna e bastidores reais |
| **06 Histórias** | Cards de citação, hierarquia | Layout espelhado (foto à esquerda); selo sai; citações marcadas como placeholder | Selo, flor | **Todos os depoimentos são placeholders** | Depoimentos reais autorizados |
| **07 Bastidores** | Trio de fotos, headline | Fica escuro para quebrar a sequência de cremes; legendas com scrim | "Agora falta apenas o seu momento" (duplicado com o 08) | "Ingredientes de verdade" | **Processo real**, embalagem real |
| **08 CTA+Footer** | Fundo escuro, dois CTAs, estrutura de footer | Nav igual à do header; textos secundários mais escuros | Cartão `Mais do que doces...`; tagline duplicada no footer | **Telefone, e-mail, horário, endereço, @ e "São Paulo"** | Logo, embalagem real |

### Fotografia: classificação

| Categoria | Obrigatoriamente real | Direção visual temporária aceitável | Puramente decorativa |
|---|---|---|---|
| Produtos (bolos, doces, sobremesas) | **Sim**, produtos reais da Bruna | Só como layout provisório | Texturas ao fundo |
| Bruna (03) | **Sim** | Não | Não |
| Bastidores / processo (05, 07) | **Sim** | Provisório | Não |
| Embalagens (caixa, fita) | **Sim**, embalagens reais | Provisório | Não |
| Prova social (06) | **Sim**, material real/autorizado | Não deve ir a produção como real | Não |
| Tecido, flores, cerâmica, cacau em pó | Não | Sim | Sim |

Necessário shot list com variedade: cada seção precisa de fotos diferentes, sem reaproveitar o mesmo bolo.

### Inventário de copy

| Concept | Headline | Observação |
|---|---|---|
| 01 | Mais que doces, momentos inesquecíveis. | Forte. Aparece de novo no footer do 08 |
| 02 | Cada criação carrega afeto, cuidado e memória. | Trio de abstratos, mas cabe no manifesto |
| 03 | A delicadeza da marca começa em quem a criou. | Boa, sem repetição |
| 04 | Criações que começam nos olhos e ficam na memória. | **A melhor da página** |
| 05 | Cada celebração começa com uma ideia só sua. | Boa |
| 06 | Momentos especiais, lembrados com doçura. | "Momentos" repete o 01 e o 08 |
| 07 | O cuidado que transforma ingredientes em memórias. | "Cuidado" repete o 02; "memórias" repete 02 e 04 |
| 08 | Agora falta apenas o seu momento. | Boa como fechamento |

**Repetições a ajustar (só estas):**

- **"momento(s)":** aparece em 01, 05 (corpo), 06, 08 e no footer. Sugestão: trocar a 06 por algo como *"Quem viveu, lembra com doçura."* e manter "momento" no 01 e no 08.
- **"memória(s)":** aparece em 02, 04, 07 e no cartão do 08. Sugestão: a 07 pode virar *"O cuidado que transforma ingredientes em presente."* ("presente" também é a caixa com laço).
- **"Mais que/do que doces":** aparece no 01, na microcopy do 07, no cartão do 08 e no footer do 08. Deixar só no 01 e no footer.

Essas trocas são **sugestões, não decisões aprovadas**. A aprovação é do responsável pelo projeto.

---

## 4. Transições

**Regra de costura.** Cada concept foi gerado com um trecho do vizinho: a base de cada imagem mostra uma faixa de foto (tecido, cerâmica, flores) e o topo da imagem seguinte mostra outra. Na Master, cada fronteira vira **uma única faixa de 120 a 180px**, com o topo curvo pertencendo à seção de baixo.

| Transição | Coerência | Cor dominante | Elemento que atravessa | Corte artificial? |
|---|---|---|---|---|
| **01 → 02** | Boa. O creme sobe sobre o hero com onda | Creme entrando no cacau | A faixa `feito à mão / ingredientes reais` **existe nos dois concepts** e deve aparecer uma só vez, na crista da onda | Só a duplicação |
| **02 → 03** | Boa, mas as duas pontas são o mesmo tecido marrom | Creme → creme | A linha fina do 02 (canto inferior direito) continua e vira a linha do 03 | Tecido repetido: usar outra textura |
| **03 → 04** | Coerente: pessoa → produto | Creme | A flor da assinatura da Bruna pode "soltar" a linha que guia até a 04 | Faixa parecida com a anterior |
| **04 → 05** | Suave. De desejo a "como pedir" | Creme → creme com toque blush | A linha longa do 04 (esquerda) vira a linha da jornada 01→02→03 | Nenhum |
| **05 → 06** | A jornada termina e o teaser "Histórias reais..." já abre a 06 | Creme → creme | O teaser da 05 deve ser **a mesma frase** da headline 06, ou sair | O teaser atual diverge da headline |
| **06 → 07** | Aqui a página precisa virar. A 07 entra **escura** | Creme → cacau | Uma onda escura sobe sobre o creme | A 06→07 hoje é creme para creme: falta virada |
| **07 → 08** | "Agora falta apenas o seu momento" pede continuidade | Cacau → cacau | A frase da 07 vira o eyebrow do 08 ("Agora falta apenas") | Duplicação; fica só no 08 |

Nas ondas: a forma continua, mas a amplitude varia, entre suave e mais marcada, para evitar repetição.

---

## 5. Placeholders

Lista completa na seção **"Decisão registrada: PLACEHOLDERS NÃO SÃO CONTEÚDO REAL"** no topo deste documento. Resumo por grupo:

- **Fatos e contato (Concept 08):** telefone, e-mail/domínio, @ do Instagram, horário, localização, "atendimento sob encomenda", ano do copyright.
- **Pessoas e voz:** foto da Bruna (03), texto em primeira pessoa, assinatura, depoimentos e clientes do 06, pessoas fotografadas.
- **Afirmações de marca a confirmar com a Bruna:** "ingredientes reais/de verdade/selecionados", "histórias verdadeiras", "feito à mão", "toque artesanal", etapas Converse → Criamos → Celebre e o processo real de encomenda, "confeitaria artesanal para momentos especiais".
- **Aplicações de marca geradas:** avental, camiseta, caixa com fita, cartão, embalagens com logo. Nenhuma é arte final.

---

## 6. Motion system (7 padrões)

| Padrão | Onde | Regra |
|---|---|---|
| **Type reveal** | Headlines de 02 a 08 | Máscara linha a linha (translateY 100%→0). O itálico entra ~80ms depois |
| **Image reveal** | Fotos e molduras | `clip-path` inset, 600–800ms, molduras com stagger |
| **Parallax sutil** | Fotos grandes (01, 03, 07) | ±20–40px por scroll, só em `transform` |
| **Linha orgânica** | 05 e pontes entre seções | Desenho via `stroke-dashoffset` ligado ao scroll |
| **Scroll journey** | 05 | Numerais 01→02→03 acendem em sequência, blobs entram alternados |
| **Scale cinemático** | Hero e imagem de destaque | 1.04→1.0, muito lento, uma vez |
| **Section transition** | Ondas entre seções | A curva sobe sobre a seção anterior (translateY + leve scale) |

Regras gerais: só `transform` e `opacity`; `prefers-reduced-motion` desliga parallax, linhas em scroll e scale, e mantém só fade curto; nada de animação em loop.

---

## 7. Estratégia responsiva

| Concept | Desktop 1440 | Tablet ~768 | Mobile ~390 |
|---|---|---|---|
| **01** | Composição atual | Bolo desce, texto sobe | **Estratégia própria:** foto do bolo em cima ou como fundo com scrim forte; header vira hambúrguer + CTA; botão de largura total |
| **02** | Atual | Colagem passa para baixo do texto | Uma foto principal + duas menores em grade 2 colunas |
| **03** | Retrato com texto sobreposto | Retrato em cima, texto abaixo | Retrato full-bleed primeiro, texto e assinatura depois |
| **04** | Colagem em 4 fotos | 2×2 | **Estratégia própria:** carrossel horizontal com snap, foto grande, headline antes |
| **05** | Blobs em zigue-zague | Zigue-zague comprimido | **Estratégia própria:** lista vertical 01/02/03, com foto redonda por passo e linha vertical conectando |
| **06** | Cards sobrepostos | Grade 2 colunas | **Estratégia própria:** carrossel de depoimentos, um card por vez, foto principal em cima |
| **07** | Trio de fotos sobreposto | 2 colunas | **Estratégia própria:** foto grande + duas empilhadas, legendas fora da foto |
| **08** | CTA + footer em 4 colunas | 2 colunas | CTA primeiro, depois contato, depois nav, com botões de 48px |

Mobile é prioridade absoluta em leitura, foto grande, CTA e toque. Alvos de 44–48px e um só CTA principal visível por tela.

---

## 8. Master Reference: especificação

**Formato:** imagem única, vertical, **1440px de largura**, altura total ~8.100px.

**Grade:** conteúdo em 1280px com **margem lateral de 80px**, aplicada a todas as seções.

| Seção | Altura | Fundo | Nota |
|---|---|---|---|
| 01 Hero | 960 | Cacau (foto) | Header sobre a foto; selo único |
| 02 Manifesto | 920 | Creme | Sem selo nem flor grande; ponte `feito à mão` no topo |
| 03 Bruna | 1000 | Creme | Foto grande, assinatura e **a flor grande** |
| 04 Criações | 1120 | Creme | Seção mais longa; galeria com estrutura diferente do 02 |
| 05 Encomendas | 1100 | Creme/blush | Jornada própria; **a flor grande** fecha o percurso |
| 06 Histórias | 980 | Creme, layout espelhado | Cards de citação marcados como placeholder |
| 07 Bastidores | 1000 | **Cacau/escuro** | Vira a página; legendas com scrim |
| 08 CTA + Footer | 1040 (CTA ~640 + footer ~400) | Cacau → creme no footer | CTA final e footer com nav alinhada |

**Regras de montagem:**

- Uma faixa de transição de 120–180px por fronteira, com o topo curvo da seção de baixo.
- O tecido marrom aparece no máximo em 2 fronteiras. As outras usam flores, cerâmica e cacau em pó.
- Um selo circular só (01), e o 08 pode repetir esse mesmo selo.
- Flor grande só em 03 e 05.
- Todas as eyebrows com a mesma linha + label uppercase.
- Todos os itálicos em caramelo, na segunda metade da headline.
- Header e footer com a **mesma nav**.
- Fotos de produto sem repetição dentro da página, mesmo como direção visual.
- Textos de contato do 08 como `[PLACEHOLDER]` visível, não como dado.
- Marcar depoimentos do 06 como `[PLACEHOLDER]`.
- Alturas refletem a função de cada seção; não forçar alturas iguais.

---

## 9. Gate

# READY FOR MASTER REFERENCE

Nenhum bloqueador real. Os problemas acima (ritmo, repetição de foto e ornamento, margens, nav/logo, copy, placeholders) são correções de montagem, e a própria Master resolve todos eles. O que depende de dados externos (contatos, Bruna real, depoimentos, arquivo oficial da logo) bloqueia a **produção**, não a Master Reference.

---

## Próximo passo

Criar a Master Reference desktop da homepage, consolidando os 8 concepts aprovados e aplicando todas as correções definidas nesta revisão.

Somente após aprovação da Master Reference:
1. gerar wireframe;
2. validar arquitetura;
3. iniciar implementação.
