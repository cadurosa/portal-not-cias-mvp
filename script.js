const noticiasIniciais = [
  {
    id: 1,
    title: "Laboratório brasileiro desenvolve bateria de longa duração",
    category: "Tecnologia",
    date: "2026-11-18",
    summary: "Nova pesquisa busca ampliar a autonomia de dispositivos com materiais mais acessíveis.",
    content: [
      "Uma equipe de pesquisadores brasileiros apresentou um protótipo de bateria que mantém o desempenho por mais ciclos de recarga. O projeto usa materiais abundantes e métodos de fabricação pensados para facilitar a produção em escala.",
      "Os próximos testes vão avaliar a eficiência em diferentes temperaturas e condições de uso. A equipe também pretende compartilhar os resultados com empresas interessadas em desenvolver aplicações para dispositivos portáteis."
    ],
    image: "assets/placeholder.svg"
  },
  {
    id: 2,
    title: "Escolas públicas levam programação e robótica para novas turmas",
    category: "Tecnologia",
    date: "2026-11-16",
    summary: "Oficinas gratuitas apresentam lógica e criação digital a estudantes de diferentes idades.",
    content: [
      "Uma rede de escolas públicas iniciou oficinas de programação e robótica com atividades práticas para estudantes. Os grupos constroem protótipos, aprendem conceitos de lógica e trabalham em conjunto para resolver desafios.",
      "Educadores destacam que o objetivo é estimular a criatividade e a autonomia, sem exigir experiência prévia. Ao fim do semestre, as turmas vão apresentar seus projetos para famílias e para a comunidade escolar."
    ],
    image: "assets/placeholder.svg"
  },
  {
    id: 3,
    title: "Equipe feminina conquista título regional em final emocionante",
    category: "Esportes",
    date: "2026-11-14",
    summary: "Decisão foi definida nos minutos finais após uma temporada de destaque coletivo.",
    content: [
      "A equipe feminina da cidade conquistou o campeonato regional depois de uma final disputada até os últimos minutos. O grupo virou o placar na etapa final, diante de uma torcida que lotou o ginásio.",
      "A campanha foi marcada pela consistência defensiva e pela participação de atletas jovens. A comissão técnica agora prepara o elenco para a próxima etapa da competição."
    ],
    image: "assets/placeholder.svg"
  },
  {
    id: 4,
    title: "Corrida comunitária reúne moradores em parque renovado",
    category: "Esportes",
    date: "2026-11-12",
    summary: "Evento gratuito oferece percursos para iniciantes, famílias e corredores experientes.",
    content: [
      "Centenas de moradores participaram de uma corrida comunitária realizada no parque municipal. O evento ofereceu diferentes distâncias e uma caminhada acessível para quem preferiu aproveitar o percurso em ritmo tranquilo.",
      "Voluntários e organizações locais ajudaram a orientar os participantes e distribuir água. A iniciativa também marcou a reabertura de áreas do parque que passaram por melhorias recentes."
    ],
    image: "assets/placeholder.svg"
  },
  {
    id: 5,
    title: "Pequenos negócios ampliam vendas com feira de produtores locais",
    category: "Economia",
    date: "2026-11-10",
    summary: "Encontro aproxima empreendedores dos consumidores e movimenta o comércio do bairro.",
    content: [
      "Uma feira semanal de produtores locais vem ajudando pequenos negócios a encontrar novos clientes. Alimentos, artesanato e produtos feitos na região ocupam as bancas, em um espaço que também recebe música e atividades para as famílias.",
      "Os empreendedores dizem que a venda direta permite apresentar melhor seus produtos e entender o que os consumidores procuram. A organização estuda ampliar a programação e incluir novos expositores nos próximos meses."
    ],
    image: "assets/placeholder.svg"
  },
  {
    id: 6,
    title: "Cooperativa cria fundo para apoiar empreendedoras da região",
    category: "Economia",
    date: "2026-11-08",
    summary: "Iniciativa combina microcrédito, orientação financeira e encontros entre empreendedoras.",
    content: [
      "Uma cooperativa regional lançou um fundo de microcrédito voltado a empreendedoras que buscam investir ou organizar seus negócios. Além do financiamento, as participantes terão acesso a oficinas de planejamento e orientação financeira.",
      "A iniciativa pretende fortalecer empresas locais e incentivar a troca de experiências. As primeiras vagas serão destinadas a projetos que ainda não têm acesso fácil a linhas tradicionais de crédito."
    ],
    image: "assets/placeholder.svg"
  }
];

const cotacoes = [
  { symbol: "USD", name: "Dólar americano", value: 5.72, variation: 0.42, type: "currency" },
  { symbol: "EUR", name: "Euro", value: 6.18, variation: -0.18, type: "currency" },
  { symbol: "IBOV", name: "Ibovespa", value: 132845, variation: 0.76, type: "index" }
];

const newsList = document.querySelector("#news-list");
const quotesList = document.querySelector("#quotes-list");
const searchInput = document.querySelector("#news-search");
const categoryButtons = [...document.querySelectorAll(".category-button[data-category]")];
const unreadFilterButton = document.querySelector("#unread-filter-button");
const resultsCount = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const articleDialog = document.querySelector("#article-dialog");
const closeDialogButton = document.querySelector(".dialog-close");
const dialogReadToggle = document.querySelector("#dialog-read-toggle");
const newsFormDialog = document.querySelector("#news-form-dialog");
const newsForm = document.querySelector("#news-form");
const openNewsFormButton = document.querySelector("#open-news-form");
const appStatus = document.querySelector("#app-status");
const storageKey = "panorama-noticias";
const readStorageKey = "panorama-noticias-lidas";
const deletedNewsStorageKey = "panorama-noticias-excluidas";
const themeStorageKey = "panorama-tema";
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const themeLabel = document.querySelector("#theme-label");
const allowedCategories = ["Tecnologia", "Esportes", "Economia"];
const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric"
});
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL"
});
const numberFormatter = new Intl.NumberFormat("pt-BR");
let selectedCategory = "Todas";
let showUnreadOnly = false;
let savedNews = loadSavedNews();
let deletedNews = loadDeletedNews();
let noticias = [...savedNews, ...noticiasIniciais]
  .filter((noticia) => !deletedNews.has(String(noticia.id)));
let readNews = loadReadNews();
let openArticleNews = null;
let currentTheme = loadThemePreference();

function createQuoteCard(cotacao) {
  const card = document.createElement("article");
  card.className = "quote-card";
  card.setAttribute("role", "listitem");

  const heading = document.createElement("div");
  heading.className = "quote-heading";

  const symbol = document.createElement("h3");
  symbol.className = "quote-symbol";
  symbol.textContent = cotacao.symbol;

  const name = document.createElement("p");
  name.className = "quote-name";
  name.textContent = cotacao.name;

  const value = document.createElement("p");
  value.className = "quote-value";
  value.textContent = cotacao.type === "currency"
    ? currencyFormatter.format(cotacao.value)
    : `${numberFormatter.format(cotacao.value)} pts`;

  const direction = cotacao.variation > 0 ? "up" : cotacao.variation < 0 ? "down" : "stable";
  const change = document.createElement("p");
  change.className = `quote-change quote-change--${direction}`;
  const indicator = document.createElement("span");
  indicator.className = "quote-indicator";
  indicator.setAttribute("aria-hidden", "true");
  indicator.textContent = direction === "up" ? "▲" : direction === "down" ? "▼" : "•";
  const changeText = document.createElement("span");
  const formattedVariation = `${cotacao.variation > 0 ? "+" : ""}${cotacao.variation.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}%`;
  changeText.textContent = `${direction === "up" ? "Alta" : direction === "down" ? "Baixa" : "Estável"}: ${formattedVariation}`;
  change.append(indicator, changeText);

  heading.append(symbol, name);
  card.append(heading, value, change);
  return card;
}

function renderQuotes() {
  quotesList.replaceChildren(...cotacoes.map(createQuoteCard));
}

applyTheme(currentTheme);

function formatDate(date) {
  return dateFormatter.format(new Date(`${date}T12:00:00`));
}

function setAppStatus(message) {
  appStatus.textContent = message;
}

function loadThemePreference() {
  try {
    const storedTheme = localStorage.getItem(themeStorageKey);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
    if (storedTheme !== null) {
      setAppStatus("A preferência de tema salva não é válida; usando o tema claro.");
    }
  } catch {
    setAppStatus("Não foi possível carregar a preferência de tema neste navegador.");
  }
  return "light";
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", `Ativar tema ${isDark ? "claro" : "escuro"}`);
  themeIcon.textContent = isDark ? "☀" : "☾";
  themeLabel.textContent = `Tema ${isDark ? "claro" : "escuro"}`;
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#111922" : "#f4f7fa";
}

function setTheme(theme) {
  currentTheme = theme;
  applyTheme(currentTheme);
  try {
    localStorage.setItem(themeStorageKey, currentTheme);
  } catch {
    setAppStatus("Tema alterado nesta sessão, mas não foi possível salvar a preferência neste navegador.");
  }
}

function loadReadNews() {
  try {
    const storedNews = localStorage.getItem(readStorageKey);
    if (!storedNews) {
      return new Set();
    }

    const parsedNews = JSON.parse(storedNews);
    if (!Array.isArray(parsedNews)) {
      throw new Error("Os estados de leitura não estão no formato esperado.");
    }

    const validIds = parsedNews.filter((id) => typeof id === "string");
    if (validIds.length !== parsedNews.length) {
      setAppStatus("Alguns estados de leitura salvos não puderam ser carregados.");
    }
    return new Set(validIds);
  } catch {
    setAppStatus("Não foi possível carregar os estados de leitura neste navegador.");
    return new Set();
  }
}

function loadDeletedNews() {
  try {
    const storedNews = localStorage.getItem(deletedNewsStorageKey);
    if (!storedNews) {
      return new Set();
    }

    const parsedNews = JSON.parse(storedNews);
    if (!Array.isArray(parsedNews)) {
      throw new Error("Os itens excluídos não estão no formato esperado.");
    }

    const validIds = parsedNews.filter((id) => typeof id === "string");
    if (validIds.length !== parsedNews.length) {
      setAppStatus("Algumas exclusões salvas não puderam ser carregadas.");
    }
    return new Set(validIds);
  } catch {
    setAppStatus("Não foi possível carregar as exclusões salvas neste navegador.");
    return new Set();
  }
}

function updateReadButton(button, noticia) {
  const isRead = readNews.has(String(noticia.id));
  button.textContent = isRead ? "Lida" : "Não lida";
  button.setAttribute("aria-pressed", String(isRead));
  button.setAttribute(
    "aria-label",
    `${isRead ? "Marcar como não lida" : "Marcar como lida"}: ${noticia.title}`
  );
}

function setNewsRead(noticia, isRead) {
  const id = String(noticia.id);
  const wasRead = readNews.has(id);
  if (wasRead === isRead) {
    updateReadButton(dialogReadToggle, noticia);
    return;
  }

  if (isRead) {
    readNews.add(id);
  } else {
    readNews.delete(id);
  }

  try {
    localStorage.setItem(readStorageKey, JSON.stringify([...readNews]));
  } catch {
    setAppStatus("Estado de leitura atualizado nesta sessão, mas não foi possível salvá-lo neste navegador.");
  }

  renderNews();
  updateReadButton(dialogReadToggle, noticia);
}

function isSavedNews(noticia) {
  return noticia &&
    typeof noticia.id === "string" &&
    typeof noticia.title === "string" &&
    noticia.title.trim() &&
    allowedCategories.includes(noticia.category) &&
    /^\d{4}-\d{2}-\d{2}$/.test(noticia.date) &&
    typeof noticia.summary === "string" &&
    Array.isArray(noticia.content) &&
    noticia.content.length > 0 &&
    noticia.content.every((paragraph) => typeof paragraph === "string" && paragraph.trim());
}

function loadSavedNews() {
  try {
    const storedNews = localStorage.getItem(storageKey);
    if (!storedNews) {
      return [];
    }

    const parsedNews = JSON.parse(storedNews);
    if (!Array.isArray(parsedNews)) {
      throw new Error("Os dados salvos não estão no formato esperado.");
    }

    const validNews = parsedNews.filter(isSavedNews);
    if (validNews.length !== parsedNews.length) {
      setAppStatus("Algumas notícias salvas não puderam ser carregadas.");
    }

    return validNews.map((noticia) => ({
      ...noticia,
      image: "assets/placeholder.svg"
    }));
  } catch {
    setAppStatus("Não foi possível carregar as notícias salvas neste navegador.");
    return [];
  }
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

  const isRead = readNews.has(String(noticia.id));
  if (isRead) {
    const readBadge = document.createElement("span");
    readBadge.className = "read-badge";
    readBadge.textContent = "Lida";
    meta.append(category, date, readBadge);
  } else {
    meta.append(category, date);
  }

  const title = document.createElement("h3");
  title.className = "card-title";
  title.textContent = noticia.title;

  const summary = document.createElement("p");
  summary.className = "card-summary";
  summary.textContent = noticia.summary || noticia.content[0];

  const readButton = document.createElement("button");
  readButton.className = "read-button";
  readButton.type = "button";
  readButton.textContent = "Ler mais";
  readButton.setAttribute("aria-label", `Ler mais: ${noticia.title}`);
  readButton.addEventListener("click", () => openArticle(noticia));

  const readToggle = document.createElement("button");
  readToggle.className = "read-status-button";
  readToggle.type = "button";
  updateReadButton(readToggle, noticia);
  readToggle.addEventListener("click", () => {
    setNewsRead(noticia, !readNews.has(String(noticia.id)));
  });

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete-news-button";
  deleteButton.type = "button";
  deleteButton.textContent = "Excluir";
  deleteButton.setAttribute("aria-label", `Excluir notícia: ${noticia.title}`);
  deleteButton.addEventListener("click", () => deleteNews(noticia));

  const actions = document.createElement("div");
  actions.className = "card-actions";
  actions.append(readToggle, readButton, deleteButton);
  body.append(meta, title, summary, actions);
  card.append(image, body);
  return card;
}

function renderNews() {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  const filteredNews = noticias.filter((noticia) => {
    const matchesCategory = selectedCategory === "Todas" || noticia.category === selectedCategory;
    const matchesTitle = noticia.title.toLocaleLowerCase("pt-BR").includes(searchTerm);
    const matchesReadStatus = !showUnreadOnly || !readNews.has(String(noticia.id));
    return matchesCategory && matchesTitle && matchesReadStatus;
  });

  newsList.replaceChildren(...filteredNews.map(createNewsCard));
  resultsCount.textContent = `${filteredNews.length} ${filteredNews.length === 1 ? "notícia" : "notícias"}`;
  emptyState.hidden = filteredNews.length !== 0;
  newsList.hidden = filteredNews.length === 0;
}

function deleteNews(noticia) {
  if (!window.confirm(`Excluir “${noticia.title}”? Esta ação não pode ser desfeita.`)) {
    return;
  }

  const id = String(noticia.id);
  noticias = noticias.filter((item) => String(item.id) !== id);
  savedNews = savedNews.filter((item) => String(item.id) !== id);
  deletedNews.add(id);
  readNews.delete(id);
  renderNews();

  try {
    localStorage.setItem(storageKey, JSON.stringify(savedNews));
    localStorage.setItem(deletedNewsStorageKey, JSON.stringify([...deletedNews]));
    localStorage.setItem(readStorageKey, JSON.stringify([...readNews]));
    setAppStatus("Notícia excluída.");
  } catch {
    setAppStatus("Notícia excluída nesta sessão, mas não foi possível salvar todas as alterações neste navegador.");
  }
}

function openArticle(noticia) {
  openArticleNews = noticia;
  document.querySelector("#dialog-image").src = noticia.image;
  document.querySelector("#dialog-category").textContent = noticia.category;

  const date = document.querySelector("#dialog-date");
  date.dateTime = noticia.date;
  date.textContent = formatDate(noticia.date);

  document.querySelector("#dialog-title").textContent = noticia.title;
  document.querySelector("#dialog-summary").textContent = noticia.summary || noticia.content[0];
  document.querySelector("#dialog-text").replaceChildren(
    ...noticia.content.map((paragraphText) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = paragraphText;
      return paragraph;
    })
  );

  setNewsRead(noticia, true);
  articleDialog.showModal();
  closeDialogButton.focus();
}

for (const button of categoryButtons) {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.category;
    for (const categoryButton of categoryButtons) {
      categoryButton.setAttribute("aria-pressed", String(categoryButton === button));
    }
    renderNews();
  });
}

unreadFilterButton.addEventListener("click", () => {
  showUnreadOnly = !showUnreadOnly;
  unreadFilterButton.setAttribute("aria-pressed", String(showUnreadOnly));
  renderNews();
});

dialogReadToggle.addEventListener("click", () => {
  if (openArticleNews) {
    setNewsRead(openArticleNews, !readNews.has(String(openArticleNews.id)));
  }
});

searchInput.addEventListener("input", renderNews);
themeToggle.addEventListener("click", () => {
  setTheme(currentTheme === "dark" ? "light" : "dark");
});
closeDialogButton.addEventListener("click", () => articleDialog.close());
articleDialog.addEventListener("close", () => {
  openArticleNews = null;
});
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

function closeNewsForm() {
  newsFormDialog.close();
}

openNewsFormButton.addEventListener("click", () => newsFormDialog.showModal());
document.querySelector("#close-news-form").addEventListener("click", closeNewsForm);
document.querySelector("#cancel-news-form").addEventListener("click", closeNewsForm);
newsFormDialog.addEventListener("click", (event) => {
  if (event.target === newsFormDialog) {
    closeNewsForm();
  }
});

newsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(newsForm);
  const title = formData.get("title").trim();
  const category = formData.get("category");
  const summary = formData.get("summary").trim();
  const content = formData.get("content")
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!title || !allowedCategories.includes(category) || content.length === 0) {
    return;
  }

  const now = new Date();
  const noticia = {
    id: `${now.getTime()}-${Math.random().toString(36).slice(2)}`,
    title,
    category,
    date: [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0")
    ].join("-"),
    summary,
    content,
    image: "assets/placeholder.svg"
  };

  savedNews.unshift(noticia);
  noticias.unshift(noticia);
  searchInput.value = "";
  selectedCategory = category;
  for (const button of categoryButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.category === category));
  }
  renderNews();

  try {
    localStorage.setItem(storageKey, JSON.stringify(savedNews));
    setAppStatus("Notícia publicada e salva neste navegador.");
  } catch {
    setAppStatus("Notícia publicada nesta sessão, mas não foi possível salvá-la neste navegador.");
  }

  newsForm.reset();
  closeNewsForm();
  openNewsFormButton.focus();
});

renderQuotes();
renderNews();
