// booking.js — Booking form logic

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("booking-form");
  if (!form) return;

  // Set minimum date to today
  const dateInput = document.getElementById("visit-date");
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateBookingForm()) return;

    // Generate booking reference: BOOK-YYYY-XXXXX
    const year = new Date().getFullYear();
    const rand = Math.floor(10000 + Math.random() * 90000);
    const ref  = `BOOK-${year}-${rand}`;

    // Save booking details to sessionStorage for confirmation page
    const booking = {
      ref:     ref,
      name:    document.getElementById("full-name").value.trim(),
      email:   document.getElementById("email").value.trim(),
      phone:   document.getElementById("phone").value.trim(),
      date:    document.getElementById("visit-date").value,
      time:    document.getElementById("visit-time").value,
      people:  document.getElementById("num-people").value,
      reason:  document.getElementById("visit-reason").value,
      message: document.getElementById("message").value.trim()
    };

    sessionStorage.setItem("ssd_booking", JSON.stringify(booking));
    window.location.href = "booking-confirmation.html";
  });

  function validateBookingForm() {
    let valid = true;
    const required = ["full-name", "email", "phone", "visit-date", "visit-time", "num-people", "visit-reason"];

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

    // Email format check
    const emailField = document.getElementById("email");
    const emailError = document.getElementById("email-error");
    if (emailField && emailField.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      showError(emailField, emailError, "Please enter a valid email address.");
      valid = false;
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

  // Clear error on input
  form.querySelectorAll("input, select, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      field.classList.remove("error");
      const err = document.getElementById(field.id + "-error");
      if (err) err.classList.remove("show");
    });
  });
});
