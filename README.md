# Panorama — Portal de notícias

## Objetivo

Panorama é um MVP de portal de notícias estático, feito para apresentar notícias fictícias em uma interface responsiva. É possível filtrar por Tecnologia, Esportes e Economia, buscar pelo título, abrir notícias em um modal de leitura, marcar notícias como lidas e alternar entre temas claro e escuro, sem backend. Publicação e exclusão ficam disponíveis no modo administrador simulado.

O painel de cotações exibe valores simulados para USD, EUR e IBOV, sem chamadas a APIs externas. Notícias publicadas, estados de leitura, exclusões e a preferência de tema ficam salvos no `localStorage` do navegador.

## Estrutura de arquivos

- `index.html` — estrutura semântica da página, painel de cotações, busca, filtros, controles de tema e modais.
- `script.js` — notícias iniciais e cotações simuladas; lógica de renderização, busca, filtros, leitura, publicação, exclusão e preferências locais.
- `style.css` — estilos responsivos para os temas claro e escuro, cabeçalho, cotações, cartões, filtros e modais.
- `assets/placeholder.svg` — imagem ilustrativa local usada nas notícias.
- `CLAUDE.md` — diretrizes e requisitos de implementação do projeto.

## Como rodar

Não é necessário instalar dependências, configurar um servidor ou fazer uma compilação. Abra `index.html` diretamente em um navegador moderno. O JavaScript e as imagens são carregados de arquivos locais. Notícias publicadas, estados de leitura, exclusões e a preferência de tema ficam armazenados no navegador usado para abri-lo.

## Funcionalidades

- Listagem de notícias com busca por título e filtros por categoria.
- Leitura do conteúdo completo em modal; ao abrir, a notícia é marcada como lida automaticamente.
- Alternância manual entre “Lida” e “Não lida” nos cartões e no modal, com selo visual para notícias lidas e filtro “Apenas não lidas”.
- Formulário para publicar notícias e botão discreto para excluí-las após confirmação; ambas as alterações são persistidas localmente.
- Acesso inicia em modo leitor; o login demonstrativo `admin` / `1234` libera publicação e exclusão. A autenticação é apenas didática e não oferece segurança real.
- Quadro de cotações ilustrativas de USD, EUR e IBOV, incluindo variação e indicação de alta ou baixa.
- Botão no cabeçalho para alternar tema claro/escuro, com preferência salva localmente.
- Layout responsivo e controles acessíveis por teclado.

## Uso de prompts

O desenvolvimento foi orientado por prompts em etapas:

1. Definir o projeto no `CLAUDE.md`: site estático de notícias usando HTML5, CSS3 e JavaScript puro, dados mockados, layout responsivo, filtros por categoria e modal; inicializar o Git e criar o primeiro commit.
2. Construir a versão inicial da página com seis notícias fictícias, apresentando a lista e permitindo ler o conteúdo completo; testar e registrar a versão em um commit.
3. Adicionar botões de filtro para Todas, Tecnologia, Esportes e Economia, busca por título e modal acionado por “Ler mais”; testar e fazer commit.
4. Criar um visual enxuto de portal de notícias, com cabeçalho, grade responsiva, filtros estilizados e modal centralizado; validar e registrar em um commit.
5. Adicionar um formulário para publicar notícias no navegador, atualizar a lista e persistir os dados localmente.
6. Adicionar um painel responsivo de cotações simuladas para USD, EUR e IBOV, sem APIs externas.
7. Implementar estados de leitura com persistência local, alternância nos cartões e no modal, selo “Lida” e filtro de não lidas.
8. Adicionar alternância entre tema claro e escuro, usando variáveis CSS e salvando a preferência no navegador.
9. Adicionar um botão discreto para excluir notícias dos cartões, pedir confirmação e persistir a remoção.
10. Simular acesso de leitor e administrador, ocultando e bloqueando ações de publicação e exclusão até autenticar.
11. Documentar o objetivo, os arquivos, as funcionalidades e a execução do projeto, além de registrar no README como os prompts orientaram as etapas.

As solicitações foram implementadas e refinadas em sequência. A validação incluiu listagem, filtros e busca, modal e estado de leitura, publicação, painel de cotações, alternância e persistência do tema e apresentação em telas menores.
