// Dreamhouse Beauty Co. — logique du site
const ACCENT_VAR = {
  hot: "var(--pink-hot)",
  soft: "var(--pink-soft)",
  blush: "var(--pink-soft)",
  gold: "var(--gold)",
  plum: "var(--plum)"
};

function icon(type, accent) {
  const c = ACCENT_VAR[accent] || ACCENT_VAR.hot;
  const P = "var(--plum)";
  const svgs = {
    lipstick: `<svg viewBox="0 0 64 64"><rect x="24" y="6" width="16" height="18" rx="4" fill="${c}"/><rect x="22" y="24" width="20" height="10" fill="${P}"/><path d="M22 34h20l-4 22a6 6 0 0 1-12 0z" fill="${c}"/></svg>`,
    gloss: `<svg viewBox="0 0 64 64"><rect x="20" y="10" width="24" height="34" rx="8" fill="${c}"/><rect x="26" y="44" width="12" height="12" rx="3" fill="${P}"/><ellipse cx="32" cy="24" rx="7" ry="10" fill="var(--cream)" opacity="0.5"/></svg>`,
    compact: `<svg viewBox="0 0 64 64"><rect x="10" y="16" width="44" height="36" rx="8" fill="${c}"/><circle cx="32" cy="34" r="12" fill="var(--cream)" opacity="0.55"/><rect x="10" y="16" width="44" height="6" rx="3" fill="${P}"/></svg>`,
    bottle: `<svg viewBox="0 0 64 64"><rect x="20" y="20" width="24" height="34" rx="6" fill="${c}"/><rect x="26" y="8" width="12" height="14" rx="3" fill="${P}"/></svg>`,
    palette: `<svg viewBox="0 0 64 64"><rect x="8" y="12" width="48" height="40" rx="8" fill="${c}"/><circle cx="20" cy="26" r="5" fill="var(--cream)"/><circle cx="32" cy="26" r="5" fill="var(--cream)" opacity="0.75"/><circle cx="44" cy="26" r="5" fill="var(--cream)" opacity="0.5"/><circle cx="20" cy="40" r="5" fill="var(--cream)" opacity="0.5"/><circle cx="32" cy="40" r="5" fill="var(--cream)" opacity="0.75"/><circle cx="44" cy="40" r="5" fill="var(--cream)"/></svg>`,
    mascara: `<svg viewBox="0 0 64 64"><rect x="26" y="6" width="12" height="16" rx="3" fill="${P}"/><rect x="22" y="22" width="20" height="34" rx="6" fill="${c}"/></svg>`,
    polish: `<svg viewBox="0 0 64 64"><rect x="18" y="24" width="28" height="30" rx="6" fill="${c}"/><rect x="24" y="10" width="16" height="16" rx="3" fill="${P}"/></svg>`,
    nailkit: `<svg viewBox="0 0 64 64"><rect x="8" y="10" width="48" height="44" rx="8" fill="${c}" opacity="0.9"/><rect x="18" y="20" width="4" height="24" rx="2" fill="var(--cream)"/><rect x="30" y="20" width="4" height="24" rx="2" fill="var(--cream)"/><rect x="42" y="20" width="4" height="24" rx="2" fill="var(--cream)"/></svg>`,
    perfume: `<svg viewBox="0 0 64 64"><rect x="18" y="22" width="28" height="32" rx="6" fill="${c}"/><rect x="26" y="10" width="12" height="12" rx="2" fill="${P}"/><rect x="29" y="4" width="6" height="8" rx="2" fill="${P}"/></svg>`,
    mist: `<svg viewBox="0 0 64 64"><rect x="20" y="26" width="24" height="28" rx="6" fill="${c}"/><rect x="24" y="14" width="16" height="12" rx="3" fill="${P}"/><path d="M14 12l4 4M32 6v6M50 12l-4 4" stroke="${P}" stroke-width="2" stroke-linecap="round"/></svg>`,
    balm: `<svg viewBox="0 0 64 64"><rect x="20" y="26" width="24" height="28" rx="10" fill="${c}"/><rect x="24" y="12" width="16" height="16" rx="4" fill="${P}"/></svg>`
  };
  return svgs[type] || svgs.compact;
}

const state = {
  filter: "all",
  cart: {} // id -> qty
};

const grid = document.getElementById("productGrid");
const resultCount = document.getElementById("resultCount");
const navLinks = document.querySelectorAll(".nav-link");

function money(n){
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "\u00A0€";
}

function renderGrid(){
  const list = state.filter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === state.filter);

  resultCount.textContent = `${list.length} produit${list.length > 1 ? "s" : ""}`;

  grid.innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-media">${icon(p.icon, p.accent)}</div>
      <div class="product-body">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-foot">
          <span class="product-price">${money(p.price)}</span>
          <button class="add-btn" data-id="${p.id}">Ajouter</button>
        </div>
      </div>
    </article>
  `).join("");
}

navLinks.forEach(btn => {
  if (btn.dataset.filter === "all") btn.classList.add("active");
  btn.addEventListener("click", () => {
    state.filter = btn.dataset.filter;
    navLinks.forEach(b => b.classList.toggle("active", b === btn));
    renderGrid();
  });
});

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  const id = btn.dataset.id;
  state.cart[id] = (state.cart[id] || 0) + 1;
  btn.textContent = "Ajouté ✓";
  btn.classList.add("added");
  setTimeout(() => { btn.textContent = "Ajouter"; btn.classList.remove("added"); }, 900);
  renderCart();
});

// Cart
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartItemsEl = document.getElementById("cartItems");
const cartCountEl = document.getElementById("cartCount");
const cartTotalEl = document.getElementById("cartTotal");

function openCart(){ cartDrawer.classList.add("open"); cartBackdrop.classList.add("open"); }
function closeCart(){ cartDrawer.classList.remove("open"); cartBackdrop.classList.remove("open"); }

document.getElementById("cartToggle").addEventListener("click", openCart);
document.getElementById("cartClose").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

function renderCart(){
  const ids = Object.keys(state.cart).filter(id => state.cart[id] > 0);
  const totalQty = ids.reduce((sum, id) => sum + state.cart[id], 0);
  cartCountEl.textContent = totalQty;

  if (ids.length === 0){
    cartItemsEl.innerHTML = `<p class="cart-empty">Votre panier est vide pour l'instant.</p>`;
    cartTotalEl.textContent = money(0);
    return;
  }

  let total = 0;
  cartItemsEl.innerHTML = ids.map(id => {
    const p = PRODUCTS.find(x => x.id === id);
    const qty = state.cart[id];
    const lineTotal = p.price * qty;
    total += lineTotal;
    return `
      <div class="cart-item">
        <div class="cart-item-icon">${icon(p.icon, p.accent)}</div>
        <div>
          <p class="cart-item-name">${p.name}</p>
          <div class="cart-item-qty">
            <button class="qty-btn" data-id="${id}" data-action="dec">−</button>
            <span>${qty}</span>
            <button class="qty-btn" data-id="${id}" data-action="inc">+</button>
          </div>
        </div>
        <span class="cart-item-price">${money(lineTotal)}</span>
      </div>
    `;
  }).join("");
  cartTotalEl.textContent = money(total);
}

cartItemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest(".qty-btn");
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === "inc") state.cart[id]++;
  else state.cart[id] = Math.max(0, state.cart[id] - 1);
  renderCart();
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  const total = Object.keys(state.cart).reduce((sum, id) => {
    const p = PRODUCTS.find(x => x.id === id);
    return sum + p.price * state.cart[id];
  }, 0);
  if (total === 0){
    alert("Votre panier est vide.");
    return;
  }
  alert(`Commande simulée — total ${money(total)}. Merci pour votre achat chez Dreamhouse Beauty Co. !`);
  state.cart = {};
  renderCart();
  closeCart();
});

renderGrid();
renderCart();
