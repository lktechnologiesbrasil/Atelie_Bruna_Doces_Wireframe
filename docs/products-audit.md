# ATELIÊ DOCES BRUNA — CATÁLOGO REAL

Data da auditoria: 2026-10-05T08:15:25.271Z (2026-10-05)

Fonte: **Yooga** (cardápio público) · **Menu de Bolos oficial: NÃO AUDITADO** (inacessível, ver abaixo)

> Somente leitura de dados públicos. Nada foi pedido, nada foi adicionado ao carrinho, ninguém foi autenticado e o código do site não foi alterado. Nomes, descrições e preços estão **exatamente como publicados** (erros de digitação incluídos).

## Como foi coletado, e limites

- O app Yooga é uma aplicação Angular que, com a **loja fechada** ("Loja fechada - Abre amanhã às 12:30") e o seletor "Agendamento", **não desenha nenhuma categoria na tela**. Os dados vêm de uma chamada pública, `GET delivery2.yooga.com.br/v2/stores/ateliedocesbruna/menu`, que o próprio app usa (descoberta no código do app). Foi essa resposta que auditei; o JSON bruto está em `docs/products-audit-raw/`.
- **Não há detalhe de produto separado:** o modal do Yooga é montado com o mesmo objeto da lista (o código do app não tem endpoint de item). Logo, todas as opções/complementos de todos os 54 itens estão neste levantamento.
- **Disponibilidade:** o Yooga não expõe um indicador de "indisponível". Itens esgotados não aparecem; portanto **não há produtos indisponíveis registrados** e isso significa "nenhum sinalizado", não "todos em estoque". A loja estava **fechada** no momento da auditoria.
- **Sabores/tamanhos como variação:** **não existem** no Yooga desta loja. Cada sabor é um produto separado. As únicas opções estruturadas são "Adicionais", "Calda extra" e "Complementos" (do Açaí).
- **Menu de Bolos:** o link do Linktree é um arquivo do Google Drive que exige login Google (HTTP 401). Não foi autenticado. O projeto irmão (`Ateliê_Doce_Bruna/Docs`) já registra o mesmo bloqueio. **Nenhum dado desse menu foi lido ou inferido.** Para auditá-lo precisamos que a Bruna envie o arquivo ou deixe o link público ("qualquer pessoa com o link").

## Resumo

- número de categorias: **17**
- número de produtos: **54**
- número de variações (sabor/tamanho como variação): **0**
- grupos de opções/complementos: **7** (20 opções ao todo; 12 nomes distintos)
- produtos indisponíveis: **0 sinalizados** (o Yooga não expõe o campo)
- produtos com preço promocional: **4** · destacados "MOST_ORDERS": **3**
- produtos sem imagem: **2** (Cookie tradicional; Geladinho Sensação)
- imagens únicas: **52** (nenhuma compartilhada entre produtos); resolução **231–500 px** (altura 500 px, exceto uma paisagem 500×411): **baixa para uso em tela cheia no site**
- itens exclusivos do Menu de Bolos: **desconhecido** (menu inacessível)

### Dados da loja encontrados no mesmo levantamento

- Endereço no Yooga: **Alameda dos Ipes, 45 - Primavera Garden - Itapeva / MG** (CEP 37655000). Mais completo que o já registrado (inclui número 45 e bairro Primavera Garden); ainda **precisa de confirmação da Bruna**.
- Telefone no Yooga: 35984235184 (igual ao WhatsApp já usado).
- Pedido mínimo R$ 22,00 · entrega grátis acima de R$ 180 · 25–200 min · retirada habilitada · taxa de R$ 3 a R$ 15 por raio (1 a 4 km).
- O cadastro Yooga tem **redirect para `ateliedocesbruna.com.br`** (indício de um domínio já existente ou planejado; **não verificado**).
- O horário em `schedule_json` traz datas absolutas de ago/set/2026 (não é grade semanal confiável); **não** resolve a divergência de horários.

### Observação importante para a direção do site

O catálogo publicado no Yooga é de **salgados, fatias, caseirinhos, copos, coxinhas doces (brigadeiro com morango), geladinhos, açaí, cookies, cones e bebidas**. **Não há bolo inteiro** no delivery (o mais próximo: "Bolo de cenoura" tamanho família e "Bolos de pote"). Bolos sob encomenda estariam no Menu de Bolos, que não pôde ser lido. Isso reforça a decisão A/B/C sobre o produto-símbolo (ver `docs/bruna-validation-gate.md`).

## Categorias (ordem exibida pelo Yooga)

| # | Categoria | Produtos |
|---|---|---|
| 01 | COMBO DO DIA 😍😋 | 1 |
| 02 | SALGADOS DELICIOSOS  😍 | 6 |
| 03 | FATIAS | 2 |
| 04 | COXINHAS DOCES ;) | 6 |
| 05 | FATIAS DE BOLO✨ | 6 |
| 06 | CASEIRINHOS😍🥰 | 4 |
| 07 | EXCLUSIVOS 🍫🍫 | 2 |
| 08 | DOSES DA FELICIDADE🍫 | 7 |
| 09 | Quentinhos, combinam! | 2 |
| 10 | 🟣AÇAÍ 🍦✨ | 1 |
| 11 | GELADINHOS / PICOLÉ🍦😍✨ | 5 |
| 12 | BOLOS DE POTE | 2 |
| 13 | CONE TRUFADO | 2 |
| 14 | TAMANHO FAMILIA | 1 |
| 15 | BEBIDAS | 5 |
| 16 | ATENÇÂO🔴 | 1 |
| 17 | 🥰PRESENTEAR PODE & DEVE! | 1 |

## Categoria 01 — COMBO DO DIA 😍😋

_id Yooga 453111 · 1 produto(s)_

### COXINHA DE FRANGO+ COCA LATA zero  + COXINHA BELGA

- **Nome:** COXINHA DE FRANGO+ COCA LATA zero  + COXINHA BELGA
- **Preço:** R$ 39,00 · **promocional:** R$ 37,00
- **Descrição:** combo perfeito.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/c4d63e9233c3a380c81e565741bd12cc.jpeg (375×500 jpeg, 47 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 02 — SALGADOS DELICIOSOS  😍

_id Yooga 441882 · 6 produto(s)_

### Empada de frango

- **Nome:** Empada de frango
- **Preço:** R$ 16,00
- **Descrição:** Massa que derrete na boca,  com frango cremoso desfiado e requeijão.
- **Variações / opções:**
  - Grupo "Adicionais" — opcional, mín 0, máx 2
    - ketchup: R$ 0,10 (máx 5 un.)
    - Maionese: R$ 0,10 (máx 5 un.)
- **Imagem:** https://cdn-production.yooga.com.br/d8cca77bd8665514da0eee6f8636e77e.jpeg (375×500 jpeg, 73 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Coxinha de Costela c/ cream cheese

- **Nome:** Coxinha de Costela c/ cream cheese
- **Preço:** R$ 15,00
- **Descrição:** Coxinha recheada com costela desfiada e cream cheese original. ⏎ 
- **Variações / opções:**
  - Grupo "Adicionais" — opcional, mín 0, máx 2
    - ketchup: R$ 0,10 (máx 5 un.)
    - Maionese: R$ 0,10 (máx 5 un.)
- **Imagem:** https://cdn-production.yooga.com.br/e050c256b22dc660a252fcc2c347a259.jpeg (375×500 jpeg, 30 KB)
- **Destaque:** MOST_ORDERS
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Coxinha de frango c/ catupiry

- **Nome:** Coxinha de frango c/ catupiry 
- **Preço:** R$ 15,00
- **Descrição:** Coxinha de frango com catupiry Original crocante.
- **Variações / opções:**
  - Grupo "Adicionais" — opcional, mín 0, máx 2
    - ketchup: R$ 0,10 (máx 5 un.)
    - Maionese: R$ 0,10 (máx 5 un.)
- **Imagem:** https://cdn-production.yooga.com.br/b5352c095d6f4f1aa082ff8a47ad0966.jpeg (375×500 jpeg, 39 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Enrroladinho de salchicha

- **Nome:** Enrroladinho de salchicha
- **Preço:** R$ 12,00
- **Descrição:** massa crocante, com salchica
- **Variações / opções:**
  - Grupo "Adicionais" — opcional, mín 0, máx 2
    - ketchup: R$ 0,10 (máx 5 un.)
    - Maionese: R$ 0,10 (máx 5 un.)
- **Imagem:** https://cdn-production.yooga.com.br/046e14fb4254c7799730336d0115b2d7.jpeg (281×500 jpeg, 31 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Esfiha de carne

- **Nome:** Esfiha de carne
- **Preço:** R$ 11,00
- **Descrição:** Nossa massa bem fofinha, recheada com carne temperada, ideal para o seu lanche da tarde.  ⏎ 
- **Variações / opções:**
  - Grupo "Adicionais" — opcional, mín 0, máx 2
    - ketchup: R$ 0,10 (máx 5 un.)
    - Maionese: R$ 0,10 (máx 5 un.)
- **Imagem:** https://cdn-production.yooga.com.br/716ee9e66ed58e075c56b21f575a2dca.jpeg (375×500 jpeg, 33 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Esfiha de Frango com Catupiry

- **Nome:** Esfiha de Frango com Catupiry
- **Preço:** R$ 11,00
- **Descrição:** Massa fofinha com recheio de frango desfiado e catupiry.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/768320cad0d2ffac42b74fd45cf252b4.jpeg (375×500 jpeg, 42 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 03 — FATIAS

_id Yooga 438417 · 2 produto(s)_

### Fatia brownie Ninho com Nutella

- **Nome:** Fatia brownie Ninho com Nutella
- **Preço:** R$ 21,00
- **Descrição:** Nosso delicioso brownie coberto com muito creme de ninho e nutella purinha.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/7cfe9730e2dc460884db4d9a70e23d99.jpeg (375×500 jpeg, 33 KB)
- **Destaque:** MOST_ORDERS
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Fatia Brownie brigadeiro

- **Nome:** Fatia Brownie brigadeiro
- **Preço:** R$ 21,00
- **Descrição:** Nosso delicioso brownie molhadinho, com muito brigadeiro de cacau 50% cremosinho , finalizado com granulado belga.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/9c2f0932b6617fe6b4aba95dabe7ab5d.jpeg (281×500 jpeg, 37 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 04 — COXINHAS DOCES ;)

_id Yooga 438420 · 6 produto(s)_

### Coxinha de Ferrero

- **Nome:** Coxinha de Ferrero
- **Preço:** R$ 16,00
- **Descrição:** Massa de brigadeiro 50% cacau, morango selecionado envolto de castanha finalizada com ⏎ nutella.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/dd4ce04ca3ea7df0b6057ccd9f9f4db8.jpeg (300×500 jpeg, 46 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Coxinha de Ninho com Nutella

- **Nome:** Coxinha de Ninho com Nutella
- **Preço:** R$ 16,00
- **Descrição:** Massa de brigadeiro de ninho, morango selecionado finalizado com Nutella. ⏎ 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/d604bf159c3a9a9ec9025b5c4bdfe62a.jpeg (375×500 jpeg, 46 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Coxinha Belga

- **Nome:** Coxinha Belga
- **Preço:** R$ 16,00
- **Descrição:** Massa de brigadeiro 50% cacau, com morango selecionado envolto com granulado belga 110grs de pura delicia ⏎ 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/95b56a584346968f8c80c1d212a64797.jpeg (375×500 jpeg, 33 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### brigadeirão belga

- **Nome:** brigadeirão belga
- **Preço:** R$ 16,00
- **Descrição:** brigadeiro cremoso envolto com granulado belga 80gramas
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/31a40ce902e5437088212b63cacd0813.jpeg (375×500 jpeg, 44 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Alfajor doce de leite

- **Nome:** Alfajor doce de leite
- **Preço:** R$ 8,99
- **Descrição:** Aquele doce de leite que vocês amam, + a combinação perfeita do chocolate nobre. ⏎ Derrete na boca. 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/ccb4a79a5bd4623c2efbd6b1a8e731d4.jpeg (375×500 jpeg, 38 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Bombom cravejado

- **Nome:** Bombom cravejado
- **Preço:** R$ 18,00
- **Descrição:** brigadeiro de ninho, morango selecionado , chocolate nobre branco com lascas de caramelo.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/9e3e0647bdef50168374426bb6519e60.jpeg (375×500 jpeg, 63 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 05 — FATIAS DE BOLO✨

_id Yooga 578913 · 6 produto(s)_

### Fatia Chocolatuda

- **Nome:** Fatia Chocolatuda 
- **Preço:** R$ 24,00
- **Descrição:** Massa cacau 50% molhadinha, brigadeiro ao leite cremoso finalizada com granulado belga. ⏎ **(Acrescentar calda, para garantr seu bolo matlda))**
- **Variações / opções:**
  - Grupo "Calda extra (matilda)" — opcional, mín 0, máx 5
    - Calda EXTRA de chocolate (matilda): R$ 4,00 (máx 5 un.)
- **Imagem:** https://cdn-production.yooga.com.br/fc2ce19f307250909edaed3f2a9e91a7.jpeg (375×500 jpeg, 50 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Fatia Maracolate

- **Nome:** Fatia Maracolate
- **Preço:** R$ 24,00
- **Descrição:** massa cacau 50%, brigadeiro ao leite, brigadeiro de maracujá bem cremosinhooo.  ⏎ Fatia serve até 2 pessoas.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/aaff3ea46fda622db5b45fced62cd29a.jpeg (375×500 jpeg, 38 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Fatia DUO com morango

- **Nome:** Fatia DUO com morango
- **Preço:** R$ 24,00
- **Descrição:** Massa de cacau 50% molhadinha, brigadeiro de ninho, brigadeiro ao leite morangos finalizada com belga 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/efa2efedb4347578afd4b8b980d242b1.jpeg (375×500 jpeg, 63 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Fatia nutelluda

- **Nome:** Fatia nutelluda
- **Preço:** R$ 24,00
- **Descrição:** Massa de cacau molhadinha, brigadeiro cremoso de ninho e nutella pura. 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/a3e285b1c01d4a85e6ab66f6874f63ee.jpeg (375×500 jpeg, 31 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Fatia Limão siciliano c/ frutas vermelhas

- **Nome:** Fatia Limão siciliano c/ frutas vermelhas
- **Preço:** R$ 24,00
- **Descrição:** Massa de baunilha molhadinha, brigadeiro de limão siciliano com geleia de frutas vermelhas ⏎ 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/835fa13b2e2b75c672407f808749543d.jpeg (375×500 jpeg, 51 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Fatia matilda

- **Nome:** Fatia matilda
- **Preço:** R$ 28,00
- **Descrição:** Massa de chocolate 50% cacau, com 5 camadas de ganache de chocolate blend, acompanha caldinha.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/4b004c94601bd7d9a4d5fb53a3e92d4b.jpeg (375×500 jpeg, 55 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 06 — CASEIRINHOS😍🥰

_id Yooga 746352 · 4 produto(s)_

### - Caseirinho Ninho com nutella

- **Nome:** - Caseirinho Ninho com nutella
- **Preço:** R$ 29,00
- **Descrição:** Massa de chocolate bem molhadinha, nutella e creme de ninho. ⏎ (serve 2 pessoas )
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/778df72cf7b3c8a7e48813d36267eac4.jpeg (375×500 jpeg, 44 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### - Caseirinho ninho nutella e morango

- **Nome:** - Caseirinho ninho nutella e morango
- **Preço:** R$ 31,00
- **Descrição:** Massa de chocolate molhadinha, morango no meio com nutella, coberto com creme de ninho delicioso, finalizado com nutella e morango. (serve 2 pessoas )*
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/aec435115a9c8397029ce71069d3cbe0.jpeg (375×500 jpeg, 37 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### - Caseirinho de cenoura com cobertura de chocolate

- **Nome:** - Caseirinho de cenoura com cobertura de chocolate
- **Preço:** R$ 25,00
- **Descrição:** Massa de cenoura, com cobertura de brigadeiro de chocolate finalizado com granulado belga. ⏎ Perfeito para o seu café da tarde .
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/00ffa4eed400a7631278a9b64df42d09.jpeg (375×500 jpeg, 48 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### - Caseirinho de brigadeiro

- **Nome:** - Caseirinho de brigadeiro
- **Preço:** R$ 28,90
- **Descrição:** Massa de chocolate cacau 50% bem molhadinha, com um delicioso brigadeiro cremoso, finalizado com granulado belga. ⏎ *Serve 2 pessoas
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/9fdaacb7877bbc6f05ff30f78ddf2983.jpeg (375×500 jpeg, 31 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 07 — EXCLUSIVOS 🍫🍫

_id Yooga 441886 · 2 produto(s)_

### Cheesecake frutas vermelhas

- **Nome:** Cheesecake frutas vermelhas
- **Preço:** R$ 23,00
- **Descrição:** Uma fatia irresistível de cheesecake artesanal, com base de biscoito, recheio cremoso e suave de cream cheese, coberta com uma generosa camada de geleia de frutas vermelhas. Finalizada com morango fresco. 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/d426aa30b60bd3516dc94a3e636ddd11.jpeg (375×500 jpeg, 41 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Cheesecake maracujá

- **Nome:** Cheesecake maracujá
- **Preço:** R$ 21,00
- **Descrição:** Base de bolacha amategada, creme de queijo com maracuja, finalizado com geleia de maracuja.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/efc2190e71af338f16f3f597c12caf5f.jpeg (375×500 jpeg, 38 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 08 — DOSES DA FELICIDADE🍫

_id Yooga 438418 · 7 produto(s)_

### Copo Ninho com Morango

- **Nome:** Copo Ninho com Morango
- **Preço:** R$ 22,00
- **Descrição:** O copo é composto pelo nosso maravilhoso recheio de ninho, intercalando com mousse de ⏎ ninho, brownie molhadinho morangos selecionados. ⏎ 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/034f557ecdb934a9ad8bc383a0c331c0.jpeg (242×500 jpeg, 32 KB)
- **Destaque:** MOST_ORDERS
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Copo Ninho com Nutella

- **Nome:** Copo Ninho com Nutella
- **Preço:** R$ 22,00
- **Descrição:** O copo é composto pelo nosso maravilhoso recheio de ninho, intercalando com mousse de ⏎ ninho, brownie molhadinho e Nutella pura. ⏎ 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/35c7d3ce5d2ed825b59fb3030e269976.jpeg (299×500 jpeg, 32 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Torta de limão

- **Nome:** Torta de limão
- **Preço:** R$ 19,00
- **Descrição:** biscoito amanteigado, mousse de limão finalizado com chantininho.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/6743d634f57efb54fd2ee58b47d588c8.jpeg (375×500 jpeg, 31 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Supremo maracuja✨

- **Nome:** Supremo maracuja✨
- **Preço:** R$ 20,00
- **Descrição:** Trufa de maracujá, , brownie denso e molhadinho, creme 4 leites finalizado com chantininho e geleia de maracujá.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/3e148b04514aa477b5d84d0eff8a74bb.jpeg (375×500 jpeg, 38 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Copo ferrero

- **Nome:** Copo ferrero
- **Preço:** R$ 23,00
- **Descrição:** Creme de danette, mousse de chocolate, amendoim triturado, brownie denso e molhadinho Nutella e bombom ferrero. 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/22b5009017e15397caeda563495c60eb.jpeg (375×500 jpeg, 43 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Copo DUO com morangos

- **Nome:** Copo DUO com morangos
- **Preço:** R$ 22,00
- **Descrição:** Brigadeiro de ninho cremoso, brigadeiro ao leite, brownie molhado no morangos frescos. Perfeito para o seu dia! 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/0c706e49160695f7e4125f8182adf4f1.jpeg (375×500 jpeg, 38 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Copo Danette com morango

- **Nome:** Copo Danette com morango
- **Preço:** R$ 22,00
- **Descrição:** Creme de danette, mousse de chocolate brownie, morangos frescos.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/5481936d65656e67afe81d9b31ffa454.jpeg (375×500 jpeg, 29 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 09 — Quentinhos, combinam!

_id Yooga 746329 · 2 produto(s)_

### Cookie Nutella

- **Nome:** Cookie Nutella
- **Preço:** R$ 21,00
- **Descrição:** Nosso cookie americano recheado com pedaços de chocolate ao leite e nutella pura . 110gr
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/9a2d9239ef7f68bcdbcb413baebd85cb.jpeg (375×500 jpeg, 61 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Cookie tradicional

- **Nome:** Cookie tradicional
- **Preço:** R$ 20,00
- **Descrição:** Cookie tradicional americano com gotas de chocolate nobre ao leite.
- **Variações / opções:** nenhuma
- **Imagem:** sem imagem
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 10 — 🟣AÇAÍ 🍦✨

_id Yooga 900001 · 1 produto(s)_

### Açai 350ml

- **Nome:** Açai 350ml 
- **Preço:** R$ 16,00 · valor mínimo exibido: R$ 19,50 (preço + opção obrigatória mais barata)
- **Descrição:** Açai na bandeija, 350 ml puro.
- **Variações / opções:**
  - Grupo "Complementos" — obrigatório, mín 1, máx 5
    - Creme de ninho: R$ 4,50 (máx 5 un.)
    - Nutella pura: R$ 8,00 (máx 5 un.)
    - Morangos selecionados: R$ 4,00 (máx 5 un.)
    - Paçoca: R$ 4,00 (máx 5 un.)
    - Confete: R$ 4,00 (máx 5 un.)
    - Leite ninho (pó): R$ 3,50 (máx 5 un.)
    - Leite condensado: R$ 4,00 (máx 5 un.)
    - Granola: R$ 4,00 (máx 5 un.)
    - Brownie: R$ 5,00 (máx 5 un.)
- **Imagem:** https://cdn-production.yooga.com.br/76666f636dadd1f611093d19e28f2c6c.jpeg (375×500 jpeg, 31 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 11 — GELADINHOS / PICOLÉ🍦😍✨

_id Yooga 865789 · 5 produto(s)_

### COMBO FAMILIA  10 GELADINHOS

- **Nome:** COMBO FAMILIA  10 GELADINHOS 
- **Preço:** R$ 120,00 · **promocional:** R$ 114,00
- **Descrição:** Sabores sortidos, ou você pode escolher aqui nas observações os sabores desejados. ⏎ 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/01a4afef39dc3ef7c64dde16bf092a57.jpeg (296×500 jpeg, 30 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Geladinho Ninho com nutella

- **Nome:** Geladinho Ninho com nutella
- **Preço:** R$ 12,00
- **Descrição:** —
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/663664731d269890b94fb0a6df8cf2fe.jpeg (375×500 jpeg, 36 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Geladinho Pudim

- **Nome:** Geladinho Pudim
- **Preço:** R$ 12,00
- **Descrição:** —
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/a9b69bb5272d19762cb79847030c4058.jpeg (375×500 jpeg, 29 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Geladinho Cappuccino

- **Nome:** Geladinho Cappuccino
- **Preço:** R$ 12,00
- **Descrição:** —
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/7c878ad4bbc8046c678f2cafaef609e5.jpeg (375×500 jpeg, 46 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Geladinho Sensação

- **Nome:** Geladinho Sensação
- **Preço:** R$ 12,00
- **Descrição:** —
- **Variações / opções:** nenhuma
- **Imagem:** sem imagem
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 12 — BOLOS DE POTE

_id Yooga 438419 · 2 produto(s)_

### Bolo de Pote de Prestígio

- **Nome:** Bolo de Pote de Prestígio
- **Preço:** R$ 16,00 · **promocional:** R$ 15,00
- **Descrição:** Massa de chocolate 50% cacau, creme de coco finalizado com o maravilhoso brigadeiro ⏎ cremoso.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/95e66412d883d17112f83f17fbff0c0e.jpeg (231×500 jpeg, 31 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Bolo de Pote de Danette

- **Nome:** Bolo de Pote de Danette
- **Preço:** R$ 16,00 · **promocional:** R$ 14,90
- **Descrição:** Massa de chocolate 50% cacau, com camadas brigadeiro cremoso. ⏎ 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/fe9871fb7bb9456f472c6dd4750be3fd.jpeg (281×500 jpeg, 36 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 13 — CONE TRUFADO

_id Yooga 438421 · 2 produto(s)_

### Cone Trufado de Brigadeiro

- **Nome:** Cone Trufado de Brigadeiro
- **Preço:** R$ 8,00
- **Descrição:** Casquinha crocante banhada no chocolate, com um cremoso brigadeiro 50% cacau. ⏎ 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/c6ab9be564ca018df3270e58253f85ce.jpeg (375×500 jpeg, 45 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Cone Trufado de Maracujá

- **Nome:** Cone Trufado de Maracujá
- **Preço:** R$ 8,00
- **Descrição:** Casquinha crocante banhada no chocolate, com o delicioso brigadeiro de maracujá (da fruta). ⏎ 
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/abfc4ee77774ac08206d61c2cf643eee.jpeg (375×500 jpeg, 34 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 14 — TAMANHO FAMILIA

_id Yooga 923026 · 1 produto(s)_

### Bolo de cenoura

- **Nome:** Bolo de cenoura 
- **Preço:** R$ 70,00
- **Descrição:** bolo de cenoura com cobertura de brigadeiro cremoso, fofinho e perfeito para o lanche da tarde.  ⏎ Serve 8 a 10 pessoas.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/ed6ba0b566fc694bfc585d4a12c7f94e.jpeg (375×500 jpeg, 41 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 15 — BEBIDAS

_id Yooga 441887 · 5 produto(s)_

### Coca cola 200ml

- **Nome:** Coca cola 200ml
- **Preço:** R$ 5,00
- **Descrição:** Garrafinha
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/fd04f27360f7f35fff4cec53fa1e8768.jpeg (500×411 jpeg, 11 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Água

- **Nome:** Água
- **Preço:** R$ 5,00
- **Descrição:** —
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/0e8649fd0861e4463c4f6e5afc387279.png (350×500 png, 136 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Água com gás

- **Nome:** Água com gás
- **Preço:** R$ 5,00
- **Descrição:** —
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/9372752cf0fccbfdd76241376f3c414f.png (326×500 png, 135 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Coca LATA

- **Nome:** Coca LATA
- **Preço:** R$ 8,00
- **Descrição:** lata 350ml
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/a23f104ba5cc0f9018d476ff8ecbe655.png (412×500 png, 191 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

### Coca Zero 350ml

- **Nome:** Coca Zero 350ml
- **Preço:** R$ 8,00
- **Descrição:** zero
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/8b6a8170c20c9efea69dc87aba7e0ca0.png (490×500 png, 139 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 16 — ATENÇÂO🔴

_id Yooga 442641 · 1 produto(s)_

### Adicionar garfinho no pedido

- **Nome:** Adicionar garfinho no pedido
- **Preço:** R$ 0,01
- **Descrição:** *Se precisar de garfinho adicione aqui**
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/fc8a04bc913c13c2bcb33c92bf614f9a.png (500×351 png, 29 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Categoria 17 — 🥰PRESENTEAR PODE & DEVE!

_id Yooga 773392 · 1 produto(s)_

### CARTÃO PRESENTE

- **Nome:** CARTÃO PRESENTE
- **Preço:** R$ 2,00
- **Descrição:** Você pode escrever sua mensagem na observação e colocar o nome de quem vai receber.
- **Variações / opções:** nenhuma
- **Imagem:** https://cdn-production.yooga.com.br/aebc03fdd58f2a9310e0ccf9a50c01c3.jpeg (375×500 jpeg, 33 KB)
- **Destaque:** —
- **Disponibilidade:** listado no cardápio (sem indicador de indisponibilidade)
- **Fonte:** YOOGA

## Menu de Bolos (Linktree → Google Drive)

**Status: INACESSÍVEL.** URL: `https://drive.google.com/file/d/1fjVTnNeOb_QD1UHuiHMBGfEXtm6R3c4f/view?usp=drive_link`. Resposta HTTP 401 e redirecionamento para o login do Google. Não autentiquei (fora do escopo).

Não foi possível levantar: bolos, sabores, massas, recheios, tamanhos, pesos, quantidade de pessoas, preços nem regras de encomenda. **Nada foi inferido.**

## Visão consolidada e divergências Yooga × Menu de Bolos

- `YOOGA`: 54 itens · `MENU_BOLOS`: não auditado · `AMBOS`: não determinável.
- Divergências de preço/descrição: **não avaliáveis** sem o Menu de Bolos.
- **Dentro do próprio Yooga**, fatos a ter em conta (sem alterar nada):
  - "Fatias" (cat. 03) e "Fatias de bolo" (cat. 05) são categorias distintas: a 03 são brownies; a 05 são fatias de bolo.
  - Preços simbólicos que não são produtos de confeitaria: "Adicionar garfinho no pedido" R$ 0,01, "CARTÃO PRESENTE" R$ 2,00 e adicionais ketchup/maionese R$ 0,10.
  - "Coxinhas doces" são brigadeiro com morango (não salgado); "Salgados deliciosos" são salgados de fato (coxinhas, empada, esfihas).
  - Há bebidas (Coca-Cola) e nomes/descrições com marcas de terceiros (Nutella, Ferrero, Danette, Coca-Cola): ao reutilizar nomes ou fotos no site, ver a política de marcas de terceiros.
  - O "Combo Família" (10 geladinhos) e o combo do dia têm preço promocional; os sabores do Combo Família aparecem só em texto livre ("escolher nas observações"), **sem** opção estruturada.

## Validação da cobertura

- Soma dos produtos por categoria: 1 + 6 + 2 + 6 + 6 + 4 + 2 + 7 + 2 + 1 + 5 + 2 + 2 + 1 + 5 + 1 + 1 = **54** (confere com o total).
- Resposta com `type_query=null` e com `type_query=5908690` (único tipo agendável) é **byte a byte idêntica**: não há menu oculto por tipo de agendamento.
- O endpoint não é paginado (uma única resposta de 27 KB); não há lazy loading de dados.
- Nenhum nome de produto duplicado; nenhuma imagem compartilhada entre produtos.
- **Não foi possível rolar o cardápio na interface** porque, com a loja fechada, o app não renderiza as categorias; a conferência foi feita sobre a resposta da API que alimenta a interface.

## Arquivos

- `docs/products-audit.json`: estrutura completa (UTF-8).
- `docs/products-audit-raw/yooga-menu.json`: resposta bruta do menu (idêntica com `type_query=5908690`; o dump da loja e a cópia duplicada não foram versionados).
- `docs/products-audit-raw/image-dimensions.json`: URL → largura, altura, formato, bytes (as imagens **não** foram salvas no repositório).
