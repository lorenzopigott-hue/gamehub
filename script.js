const games = [
  { id:"pixel-racer", name:"Pixel Racer", category:"Racing", icon:"🏎️", color:"#ec4899", rating:4.8, added:6, description:"Dodge obstacles and race for a high score." },
  { id:"space-blaster", name:"Space Blaster", category:"Arcade", icon:"🚀", color:"#3b82f6", rating:4.7, added:5, description:"Blast through waves of space enemies." },
  { id:"block-puzzle", name:"Block Puzzle", category:"Puzzle", icon:"🧩", color:"#8b5cf6", rating:4.6, added:4, description:"Fit the pieces together and clear the board." },
  { id:"dungeon-dash", name:"Dungeon Dash", category:"Adventure", icon:"⚔️", color:"#f59e0b", rating:4.9, added:3, description:"Explore a tiny dungeon and collect treasure." },
  { id:"neon-hoops", name:"Neon Hoops", category:"Sports", icon:"🏀", color:"#14b8a6", rating:4.5, added:2, description:"Make baskets and beat your high score." },
  { id:"word-wizard", name:"Word Wizard", category:"Puzzle", icon:"📚", color:"#22c55e", rating:4.4, added:1, description:"Find words before the timer runs out." },
  { id:"tiny-farm", name:"Tiny Farm", category:"Simulation", icon:"🌱", color:"#84cc16", rating:4.7, added:0, description:"Grow crops and build your little farm." },
  { id:"sky-jump", name:"Sky Jump", category:"Arcade", icon:"☁️", color:"#06b6d4", rating:4.3, added:0, description:"Jump higher and avoid falling obstacles." }
];

const grid = document.querySelector("#gameGrid");
const search = document.querySelector("#searchInput");
const categories = document.querySelector("#categoryList");
const sort = document.querySelector("#sortSelect");
const empty = document.querySelector("#emptyState");
const count = document.querySelector("#gameCount");

let activeCategory = "All";

function renderCategories() {
  const names = ["All", ...new Set(games.map(g => g.category))];
  categories.innerHTML = names.map(name =>
    `<button class="category ${name === activeCategory ? "active" : ""}" data-category="${name}">${name}</button>`
  ).join("");

  categories.querySelectorAll(".category").forEach(btn => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category;
      renderCategories();
      renderGames();
    });
  });
}

function getFilteredGames() {
  const term = search.value.trim().toLowerCase();
  let list = games.filter(g =>
    (activeCategory === "All" || g.category === activeCategory) &&
    (!term || `${g.name} ${g.category} ${g.description}`.toLowerCase().includes(term))
  );

  if (sort.value === "name") list.sort((a,b) => a.name.localeCompare(b.name));
  if (sort.value === "newest") list.sort((a,b) => b.added - a.added);
  return list;
}

function renderGames() {
  const list = getFilteredGames();
  count.textContent = `${list.length} ${list.length === 1 ? "game" : "games"}`;
  empty.classList.toggle("hidden", list.length !== 0);

  grid.innerHTML = list.map(g => `
    <article class="game-card">
      <div class="thumb" style="--card-color:${g.color}">${g.icon}</div>
      <div class="card-body">
        <h3 class="card-title">${g.name}</h3>
        <div class="meta"><span>${g.category}</span><span>⭐ ${g.rating}</span></div>
        <a class="play-btn" href="games/${g.id}/index.html">Play</a>
      </div>
    </article>
  `).join("");
}

search.addEventListener("input", renderGames);
sort.addEventListener("change", renderGames);

document.querySelector("#themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("light");
});

renderCategories();
renderGames();
