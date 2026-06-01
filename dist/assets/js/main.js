// OpenClaw Main JS
// Essential site functionality

// --- Navigation Toggle ---
document.addEventListener("DOMContentLoaded", function() {
    var toggle = document.getElementById("navToggle");
    var menu = document.getElementById("mobileMenu");
    if (toggle && menu) {
        toggle.addEventListener("click", function() {
            var expanded = toggle.getAttribute("aria-expanded") === "true";
            toggle.setAttribute("aria-expanded", !expanded);
            menu.classList.toggle("open");
        });
    }
});

// --- Back to Top ---
document.addEventListener("DOMContentLoaded", function() {
    var btn = document.getElementById("backToTop");
    if (btn) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 300) {
                btn.classList.add("visible");
            } else {
                btn.classList.remove("visible");
            }
        });
        btn.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});

// --- Smooth scroll for anchor links ---
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll("a[href^='#']").forEach(function(a) {
        a.addEventListener("click", function(e) {
            var target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
