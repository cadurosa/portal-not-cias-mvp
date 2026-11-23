# Panorama — Portal de notícias

## Objetivo

Panorama é um MVP de portal de notícias estático, feito para apresentar notícias fictícias em uma interface responsiva. É possível filtrar por Tecnologia, Esportes e Economia, buscar pelo título e abrir cada notícia em um modal de leitura.

## Estrutura de arquivos

- `index.html` — estrutura semântica da página, controles de busca e filtro e modal.
- `script.js` — seis notícias mockadas e lógica de renderização, busca, filtros e leitura.
- `style.css` — estilos responsivos para cabeçalho, cartões, filtros e modal.
- `assets/placeholder.svg` — imagem ilustrativa local usada nas notícias.
- `CLAUDE.md` — diretrizes e requisitos de implementação do projeto.

## Como rodar

Não é necessário instalar dependências, configurar um servidor ou fazer uma compilação. Abra `index.html` diretamente em um navegador moderno. O JavaScript e as imagens são carregados de arquivos locais.

## Uso de prompts

O desenvolvimento foi orientado por prompts em etapas:

1. Definir o projeto no `CLAUDE.md`: site estático de notícias usando HTML5, CSS3 e JavaScript puro, dados mockados, layout responsivo, filtros por categoria e modal; inicializar o Git e criar o primeiro commit.
2. Construir a versão inicial da página com seis notícias fictícias, apresentando a lista e permitindo ler o conteúdo completo; testar e registrar a versão em um commit.
3. Adicionar botões de filtro para Todas, Tecnologia, Esportes e Economia, busca por título e modal acionado por “Ler mais”; testar e fazer commit.
4. Criar um visual enxuto de portal de notícias, com cabeçalho, grade responsiva, filtros estilizados e modal centralizado; validar e registrar em um commit.
5. Documentar o objetivo, os arquivos e a execução do projeto, além de registrar no README como os prompts orientaram as etapas.

As solicitações foram implementadas e refinadas em sequência, verificando no navegador a listagem, os filtros e a busca, o modal de leitura e a apresentação em telas menores.
