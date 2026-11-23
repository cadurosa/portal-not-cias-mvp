const noticias = [
  {
    id: 1,
    title: "Bairros transformam ruas em jardins para enfrentar o calor",
    category: "Meio ambiente",
    date: "2026-11-18",
    summary: "Iniciativas comunitárias ampliam áreas verdes e mostram como pequenas intervenções podem refrescar a cidade.",
    content: [
      "Em diferentes bairros, moradores estão se unindo para transformar calçadas, terrenos antes abandonados e pequenos recuos em espaços verdes. A ideia é simples: plantar espécies nativas, criar áreas de sombra e aproximar as pessoas da natureza sem esperar por grandes obras.",
      "Além de deixar as ruas mais agradáveis, árvores e jardins ajudam a reduzir a temperatura local e atraem polinizadores. Em alguns projetos, os próprios vizinhos cuidam das mudas e organizam mutirões para manter os espaços.",
      "Especialistas lembram que o planejamento é essencial. Escolher espécies adequadas ao clima e prever a manutenção faz com que as iniciativas tragam benefícios duradouros para toda a comunidade."
    ],
    image: "assets/placeholder.svg"
  },
  {
    id: 2,
    title: "Bibliotecas de bairro reinventam o espaço de encontro",
    category: "Cultura",
    date: "2026-11-16",
    summary: "Clubes de leitura, oficinas e trocas de livros renovam a programação de espaços públicos.",
    content: [
      "As bibliotecas de bairro estão abrindo as portas para atividades que vão além do empréstimo de livros. Rodas de conversa, clubes de leitura e oficinas criativas aproximam públicos de todas as idades e fazem desses espaços pontos de encontro no cotidiano.",
      "Muitas programações são construídas com a participação dos próprios moradores. A troca de livros, por exemplo, convida visitantes a compartilhar histórias e descobrir autores que talvez não encontrassem nas prateleiras.",
      "Com iniciativas acessíveis e uma agenda diversa, as bibliotecas reafirmam seu papel como espaços públicos de aprendizagem, convivência e imaginação."
    ],
    image: "assets/placeholder.svg"
  },
  {
    id: 3,
    title: "Pesquisa mostra caminhos mais curtos para uma alimentação sustentável",
    category: "Ciência",
    date: "2026-11-14",
    summary: "Estudo destaca o impacto das escolhas cotidianas e a importância de valorizar a produção local.",
    content: [
      "Uma nova pesquisa sobre hábitos alimentares aponta que escolhas práticas, feitas no dia a dia, podem contribuir para sistemas de alimentação mais sustentáveis. O estudo destaca a diversidade de alimentos, o aproveitamento integral e a proximidade entre produção e consumo.",
      "Pesquisadores ressaltam que não existe uma solução única: a realidade de cada região e o acesso a alimentos precisam ser considerados. Feiras locais e redes de produtores podem ajudar a criar alternativas adequadas a cada comunidade.",
      "O trabalho também reforça a importância de combinar informação clara com políticas que facilitem o acesso a opções saudáveis e produzidas de forma responsável."
    ],
    image: "assets/placeholder.svg"
  },
  {
    id: 4,
    title: "Ciclovias conectadas mudam a rotina de quem pedala",
    category: "Cidades",
    date: "2026-11-12",
    summary: "Novos trechos planejados em conjunto facilitam deslocamentos e conectam diferentes regiões.",
    content: [
      "Quando trechos de ciclovia se conectam, pedalar deixa de ser apenas uma opção para trajetos curtos e passa a integrar a rotina de mais pessoas. Em várias cidades, planos recentes priorizam ligações entre bairros, terminais de transporte e áreas de trabalho.",
      "Quem usa a bicicleta diariamente diz que a continuidade dos caminhos traz mais previsibilidade para os percursos. A sinalização, a iluminação e a manutenção também são aspectos importantes para tornar a experiência mais confortável.",
      "A participação de moradores no planejamento ajuda a identificar os trajetos mais úteis e a orientar melhorias futuras na infraestrutura."
    ],
    image: "assets/placeholder.svg"
  },
  {
    id: 5,
    title: "Festival independente leva música a espaços pouco convencionais",
    category: "Cultura",
    date: "2026-11-10",
    summary: "Apresentações em praças e centros comunitários aproximam artistas locais de novos públicos.",
    content: [
      "Uma programação musical independente está ocupando praças, centros comunitários e outros espaços do cotidiano. A proposta aproxima artistas locais do público e transforma lugares familiares em palcos para novas descobertas.",
      "Além dos shows, o festival oferece conversas com músicos e atividades para quem quer conhecer os bastidores da produção cultural. A entrada gratuita ou a preços acessíveis amplia as oportunidades de participação.",
      "Organizadores e artistas veem a iniciativa como uma forma de fortalecer a cena local e incentivar encontros entre diferentes gerações e estilos musicais."
    ],
    image: "assets/placeholder.svg"
  },
  {
    id: 6,
    title: "Observação do céu convida curiosos a descobrir a astronomia",
    category: "Ciência",
    date: "2026-11-08",
    summary: "Encontros gratuitos em parques oferecem telescópios e conversas para quem quer olhar as estrelas.",
    content: [
      "Em encontros abertos ao público, voluntários levam telescópios a parques e praças para apresentar o céu noturno a quem passa. Não é preciso ter experiência: a atividade começa com perguntas simples e observações a olho nu.",
      "As sessões ajudam a reconhecer constelações, acompanhar o movimento aparente dos astros e compreender fenômenos que muitas vezes parecem distantes. O contato direto com os instrumentos também desperta a curiosidade de crianças e adultos.",
      "A programação depende das condições do tempo e é divulgada com antecedência pelos organizadores. Quem participa pode levar perguntas e compartilhar a experiência com outras pessoas."
    ],
    image: "assets/placeholder.svg"
  }
];

const newsList = document.querySelector("#news-list");
const categoryFilter = document.querySelector("#category-filter");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const articleDialog = document.querySelector("#article-dialog");
const closeDialogButton = document.querySelector(".dialog-close");
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric"
});

function formatDate(date) {
  return dateFormatter.format(new Date(`${date}T12:00:00`));
}

function createNewsCard(noticia) {
  const card = document.createElement("article");
  card.className = "news-card";

  const image = document.createElement("img");
  image.className = "card-image";
  image.src = noticia.image;
  image.alt = "";
  image.loading = "lazy";

  const body = document.createElement("div");
  body.className = "card-body";

  const meta = document.createElement("div");
  meta.className = "card-meta";

  const category = document.createElement("span");
  category.className = "article-category";
  category.textContent = noticia.category;

  const date = document.createElement("time");
  date.className = "article-date";
  date.dateTime = noticia.date;
  date.textContent = formatDate(noticia.date);

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = noticia.title;

  const summary = document.createElement("p");
  summary.className = "card-summary";
  summary.textContent = noticia.summary;

  const readButton = document.createElement("button");
  readButton.className = "read-button";
  readButton.type = "button";
  readButton.textContent = "Ler notícia";
  readButton.setAttribute("aria-label", `Ler notícia: ${noticia.title}`);
  readButton.addEventListener("click", () => openArticle(noticia));

  meta.append(category, date);
  body.append(meta, title, summary, readButton);
  card.append(image, body);
  return card;
}

function renderNews() {
  const selectedCategory = categoryFilter.value;
  const filteredNews = noticias.filter(
    (noticia) => selectedCategory === "todas" || noticia.category === selectedCategory
  );

  newsList.replaceChildren(...filteredNews.map(createNewsCard));
  resultsCount.textContent = `${filteredNews.length} ${filteredNews.length === 1 ? "notícia" : "notícias"}`;
  emptyState.hidden = filteredNews.length !== 0;
  newsList.hidden = filteredNews.length === 0;
}

function openArticle(noticia) {
  document.querySelector("#dialog-image").src = noticia.image;
  document.querySelector("#dialog-category").textContent = noticia.category;

  const date = document.querySelector("#dialog-date");
  date.dateTime = noticia.date;
  date.textContent = formatDate(noticia.date);

  document.querySelector("#dialog-title").textContent = noticia.title;
  document.querySelector("#dialog-summary").textContent = noticia.summary;
  document.querySelector("#dialog-text").replaceChildren(
    ...noticia.content.map((paragraphText) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = paragraphText;
      return paragraph;
    })
  );

  articleDialog.showModal();
  closeDialogButton.focus();
}

for (const category of [...new Set(noticias.map((noticia) => noticia.category))]) {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categoryFilter.append(option);
}

categoryFilter.addEventListener("change", renderNews);
closeDialogButton.addEventListener("click", () => articleDialog.close());
articleDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  articleDialog.close();
});
articleDialog.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    articleDialog.close();
  }
});
articleDialog.addEventListener("click", (event) => {
  if (event.target === articleDialog) {
    articleDialog.close();
  }
});

renderNews();
