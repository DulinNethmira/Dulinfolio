document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");

    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = "↑";
    scrollBtn.className = "btn btn-primary scroll-to-top";
    document.body.appendChild(scrollBtn);

    const style = document.createElement("style");
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 999;
            transition: opacity 0.3s ease;
        }
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 80);
        scrollBtn.style.display = window.scrollY > 150 ? "flex" : "none";
        fadeInElements();
    });

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });
            document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = form.querySelector("#name")?.value;
            const email = form.querySelector("#email")?.value;
            const subject = form.querySelector("#subject")?.value;
            const message = form.querySelector("#message")?.value;
            console.log("Form submitted:", { name, email, subject, message });
            alert("Thank you! Your message has been received.");
            form.reset();
        });
    }

    const fadeElements = document.querySelectorAll(".skill-card, .portfolio-card, .hero-section, section");
    fadeElements.forEach(el => el.classList.add("fade-in"));

    function fadeInElements() {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add("visible");
            }
        });
    }

    fadeInElements();
});
