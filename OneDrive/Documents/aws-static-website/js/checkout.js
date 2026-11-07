// checkout.js — Checkout form logic

document.addEventListener("DOMContentLoaded", function () {

  // --- Render order summary ---
  renderOrderSummary();

  // --- Delivery/Pickup toggle ---
  const deliveryRadios = document.querySelectorAll('input[name="fulfillment"]');
  const addressGroup   = document.getElementById("address-group");

  deliveryRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      if (addressGroup) {
        addressGroup.style.display = this.value === "delivery" ? "block" : "none";
      }
    });
  });

  // --- Form submit ---
  const form = document.getElementById("checkout-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateCheckout()) return;

    const cart = getCart();
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const year = new Date().getFullYear();
    const rand = Math.floor(10000 + Math.random() * 90000);
    const ref  = `SSD-${year}-${rand}`;

    const fulfillment = document.querySelector('input[name="fulfillment"]:checked');

    const order = {
      ref:         ref,
      name:        document.getElementById("full-name").value.trim(),
      email:       document.getElementById("email").value.trim(),
      phone:       document.getElementById("phone").value.trim(),
      fulfillment: fulfillment ? fulfillment.value : "pickup",
      address:     document.getElementById("address") ? document.getElementById("address").value.trim() : "",
      notes:       document.getElementById("notes") ? document.getElementById("notes").value.trim() : "",
      items:       cart,
      total:       getCartTotal()
    };

    sessionStorage.setItem("ssd_order", JSON.stringify(order));
    clearCart();
    window.location.href = "order-confirmation.html";
  });

  function renderOrderSummary() {
    const container = document.getElementById("checkout-summary");
    if (!container) return;

    const cart = getCart();
    if (cart.length === 0) {
      container.innerHTML = "<p>Your cart is empty. <a href='catalogue.html'>Browse products</a></p>";
      return;
    }

    let rows = cart.map(function (item) {
      return `<div class="summary-item">
        <span>${item.name} × ${item.qty}</span>
        <span>${formatPrice(item.price * item.qty)}</span>
      </div>`;
    }).join("");

    rows += `<div class="summary-total">
      <span>Total</span>
      <span>${formatPrice(getCartTotal())}</span>
    </div>`;

    container.innerHTML = rows;
  }

  function validateCheckout() {
    let valid = true;
    const required = ["full-name", "email", "phone"];

    required.forEach(function (id) {
      const field = document.getElementById(id);
      const error = document.getElementById(id + "-error");
      if (!field) return;
      if (!field.value.trim()) {
        showError(field, error, "This field is required.");
        valid = false;
      } else {
        clearError(field, error);
      }
    });

    // Email check
    const emailField = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    if (emailField && emailField.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      showError(emailField, emailError, "Please enter a valid email address.");
      valid = false;
    }

    // Address required if delivery selected
    const fulfillment = document.querySelector('input[name="fulfillment"]:checked');
    if (fulfillment && fulfillment.value === "delivery") {
      const addrField = document.getElementById("address");
      const addrError = document.getElementById("address-error");
      if (addrField && !addrField.value.trim()) {
        showError(addrField, addrError, "Delivery address is required.");
        valid = false;
      }
    }

    return valid;
  }

  function showError(field, errorEl, msg) {
    field.classList.add("error");
    if (errorEl) { errorEl.textContent = msg; errorEl.classList.add("show"); }
  }

  function clearError(field, errorEl) {
    field.classList.remove("error");
    if (errorEl) errorEl.classList.remove("show");
  }

  form.querySelectorAll("input, select, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      field.classList.remove("error");
      const err = document.getElementById(field.id + "-error");
      if (err) err.classList.remove("show");
    });
  });
});
