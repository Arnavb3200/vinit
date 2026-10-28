(function () {
  const root = document.documentElement;
  const nav = document.getElementById("site-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeLabel = themeToggle ? themeToggle.querySelector(".theme-label") : null;
  const themeIcon = themeToggle ? themeToggle.querySelector(".theme-icon") : null;
  const year = document.getElementById("year");
  const pendingLinks = document.querySelectorAll('a[aria-disabled="true"]');
  const storageKey = "vinit-portfolio-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    const isDark = theme === "dark";
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    }
    if (themeLabel) {
      themeLabel.textContent = isDark ? "Light" : "Dark";
    }
    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }
  }

  const savedTheme = localStorage.getItem(storageKey);
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(storageKey, next);
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open menu");
      });
    });
  }

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  pendingLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });
})();
