const projects = [
  {
    title: "PushBox",
    description: "A strategic puzzle game adapted from the classic Sokoban mechanics",
    tags: ["Game"],
    languages: ["Java"],
    image: "/assets/static/img/pushbox.png",
    links: [
      { label: "GitHub", url: "https://github.com/nammm01/pushbox-sokoban" }
    ],
    year: "2023",
    lastUpdate: "2023-11-04"
  },
  {
    title: "Snakes and Ladders",
    description: "A digital adaptation of the classic board game",
    tags: ["Game"],
    languages: ["Python"],
    image: "/assets/static/img/snakesandladders.png",
    links: [
      { label: "GitHub", url: "https://github.com/nammm01/snakes-and-ladders" }
    ],
    year: "2023",
    lastUpdate: "2023-11-02"
  },
  {
    title: "Srobot",
    description: "3D platformer adventure game where players control a small robot on a mission to repair a damaged spaceship",
    tags: ["Game"],
    languages: ["C#", "Unity"],
    image: "/assets/static/img/srobot.png",
    links: [
      { label: "Demo Video", url: "https://youtu.be/ET9BlUCqKHE?si=9pCCgr1isF4F3ASA" }
    ],
    year: "2024",
    lastUpdate: "2024-12-24"
  },
  {
    title: "Adventure in Pasar",
    description: "a top-down adventure game where players explore a lively traditional market to recover stolen goods.",
    tags: ["Game"],
    languages: ["C#", "Unity"],
    image: "/assets/static/img/adventureinpasar.png",
    links: [
      { label: "Itch.io", url: "https://nashmill.itch.io/adventure-in-pasar" }
    ],
    year: "2024",
    lastUpdate: "2024-12-25"
  },
  {
    title: "Parucare",
    description: "A website prediction lung health that build to help user/people to initial check online lung condition",
    tags: ["Web", "Machine Learning"],
    languages: ["PHP"],
    image: "/assets/static/img/parucare.png",
    links: [
      { label: "HKI", url: "https://drive.google.com/file/d/17oDZs2LJiFm2oXSemh7cCk1mo3slhgmh/view?usp=sharing" }
    ],
    year: "2023",
    lastUpdate: "2023-05-23"
  },
  {
    title: "Bordir24",
    description: "An online embroidery ordering platform designed to simplify the process of custom embroidery requests",
    tags: ["Web"],
    languages: ["Laravel"],
    image: "/assets/static/img/bordir24.png",
    links: [
      { label: "HKI", url: "https://drive.google.com/file/d/1KE51_Kcx5g7xjhuGDJAWMpWSWh_oheLc/view?usp=sharing" }
    ],
    year: "2024",
    lastUpdate: "2024-05-22"
  },
  {
    title: "Jokiin Aja",
    description: "a web-based service marketplace that enables users to offer and purchase freelance services through a centralized platform",
    tags: ["Web"],
    languages: ["Laravel"],
    image: "/assets/static/img/jokiinaja.png",
    links: [
      { label: "Achievement", url: "https://drive.google.com/file/d/1SGlBNVaw1fbFQR10PUoxyiAPcrfTQ3OX/view?usp=sharing" }
    ],
    year: "2024",
    lastUpdate: "2024-12-21"
  }
];

let currentSearchTerm = "";
let currentFilterTag = "All";
let currentSort = "default";

const projectsGrid = document.getElementById("projects-grid");
const projectsEmpty = document.getElementById("projects-empty");
const searchInput = document.getElementById("project-search");
const filterButtonsContainer = document.getElementById("filter-buttons");
const sortSelect = document.getElementById("project-sort");
const tabNav = document.getElementById("tab-nav");

function renderProjects(list) {
  projectsGrid.innerHTML = "";

  if (list.length === 0) {
    projectsEmpty.hidden = false;
    return;
  }
  projectsEmpty.hidden = true;

  list.forEach(project => {
    const card = document.createElement("article");
    card.className = "project-card";

    const tagsHtml = project.tags
      .map(tag => `<li class="project-tag">${tag}</li>`)
      .join("");

    const languagesHtml = (project.languages && project.languages.length)
      ? `<ul class="project-languages">${project.languages.map(lang => `<li class="project-lang-tag">${lang}</li>`).join("")}</ul>`
      : "";

    const linkHtml = (project.links && project.links.length)
      ? `<div class="project-links-row">${project.links
          .map(l => `<a class="project-link" href="${l.url}" target="_blank" rel="noopener">${l.label} &gt;</a>`)
          .join("")}</div>`
      : project.status === "unavailable"
        ? `<span class="project-link is-disabled">NOT AVAILABLE</span>`
        : `<span class="project-link is-disabled">SEGERA HADIR</span>`;

    card.innerHTML = `
      <div class="project-image-wrap">
        <img class="project-image" src="${project.image}" alt="Tangkapan layar proyek ${project.title}" loading="lazy">
        ${project.year ? `<span class="project-year">${project.year}</span>` : ""}
      </div>
      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <ul class="project-tags">${tagsHtml}</ul>
        ${languagesHtml}
        ${linkHtml}
      </div>
    `;

    projectsGrid.appendChild(card);
  });
}

function sortProjects(list) {
  const sorted = [...list];

  switch (currentSort) {
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "year-newest":
      return sorted.sort((a, b) => (b.year || "0") - (a.year || "0"));
    case "year-oldest":
      return sorted.sort((a, b) => (a.year || "0") - (b.year || "0"));
    default:
        return sorted.sort((a, b) => new Date(b.lastUpdate || 0) - new Date(a.lastUpdate || 0));
  }
}

function applyFilters() {
  const term = currentSearchTerm.trim().toLowerCase();

  const filtered = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(term);
    const matchesTag =
      currentFilterTag === "All" || project.tags.includes(currentFilterTag);
    return matchesSearch && matchesTag;
  });

  renderProjects(sortProjects(filtered));
}

searchInput.addEventListener("input", (e) => {
  currentSearchTerm = e.target.value;
  applyFilters();
});

filterButtonsContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;

  filterButtonsContainer
    .querySelectorAll(".filter-btn")
    .forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  currentFilterTag = btn.dataset.tag;
  applyFilters();
});

sortSelect.addEventListener("change", (e) => {
  currentSort = e.target.value;
  applyFilters();
});

tabNav.addEventListener("click", (e) => {
  const btn = e.target.closest(".tab-btn");
  if (!btn) return;

  const targetPanel = btn.dataset.panel;

  // update tombol aktif
  tabNav.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  // update panel aktif
  document.querySelectorAll(".panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === `panel-${targetPanel}`);
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

sortSelect.value = currentSort;
applyFilters();