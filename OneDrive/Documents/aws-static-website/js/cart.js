// cart.js — Shopping cart logic using localStorage

const CART_KEY = "ssd_cart";

// --- Read / Write ---

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

// --- Mutations ---

function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }

  saveCart(cart);
  showCartToast(product.name);
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
}

function updateQty(productId, newQty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  if (newQty < 1) { removeFromCart(productId); return; }
  item.qty = newQty;
  saveCart(cart);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

// --- Totals ---

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price * item.qty, 0);
}

// --- UI helpers ---

function updateCartBadge() {
  const badges = document.querySelectorAll(".cart-count");
  const count = getCartCount();
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? "flex" : "none";
  });
}

// Small toast notification when item is added
function showCartToast(name) {
  let toast = document.getElementById("cart-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "cart-toast";
    toast.style.cssText = `
      position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;
      background:#4a2c6e;color:#fff;padding:.75rem 1.25rem;
      border-radius:50px;font-size:.88rem;font-weight:600;
      box-shadow:0 4px 20px rgba(74,44,110,.3);
      transform:translateY(80px);opacity:0;
      transition:transform .3s ease,opacity .3s ease;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = `✓ "${name}" added to cart`;
  toast.style.transform = "translateY(0)";
  toast.style.opacity = "1";
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.transform = "translateY(80px)";
    toast.style.opacity = "0";
  }, 2800);
}

// Run on every page load to keep badge in sync
document.addEventListener("DOMContentLoaded", updateCartBadge);
