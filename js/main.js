/* =========================================
   Portfólio - Scripts principais
   ========================================= */

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

window.addEventListener("beforeunload", () => {
  window.scrollTo(0, 0);
});

window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10);
});

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initCopyEmail();
  initSkillTabs();
  initTypewriter();
  initProjectModal();

  if (typeof ScrollReveal !== "undefined") {
    const sr = ScrollReveal({
      duration: 1000,
      delay: 200,
      reset: false,
    });

    // Animações da Hero Section
    sr.reveal(".hero-content", { origin: "left", distance: "40px" });
    sr.reveal(".profile-img", { origin: "right", distance: "50px", delay: 400 });

    // Animações gerais de seção (títulos)
    sr.reveal(".section-title", { origin: "top", distance: "40px", interval: 100 });

    // Animações da página Sobre
    sr.reveal(".about-card", { origin: "bottom", distance: "50px", interval: 100 });
    sr.reveal(".learning-card", { origin: "bottom", distance: "50px", interval: 100 });

    // Animações de Tecnologias e Projetos
    sr.reveal(".tech-card", { origin: "bottom", distance: "50px", interval: 100 });
    sr.reveal(".project-card", { origin: "bottom", distance: "50px", interval: 100 });

    // Animações da página Contato
    sr.reveal(".contact-card", { origin: "bottom", distance: "50px", interval: 100 });
    sr.reveal(".mac-window-header", { origin: "top", distance: "40px" });
  }
});

/**
 * Menu hambúrguer - abre/fecha em telas pequenas
 */
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Fecha o menu ao clicar em um link
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  function openMenu() {
    nav.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Fechar menu");
  }

  function closeMenu() {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }
}

/**
 * Scroll suave para as seções ao clicar nos links do menu
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (targetId === "#" || targetId === "#!") return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      event.preventDefault();

      const headerOffset = document.querySelector(".header")?.offsetHeight || 72;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    });
  });
}

/**
 * Formulário de contato - envio simples (simulação)
 */
function initContactForm() {
  const form = document.getElementById("contato-form");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = "Enviando...";
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = "Mensagem enviada!";
      btn.style.background = "#10b981";

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "";
        btn.disabled = false;
        form.reset();
      }, 2000);
    }, 1500);
  });
}

/**
 * Copiar e-mail para a área de transferência
 */
function initCopyEmail() {
  const btn = document.getElementById("copy-email-btn");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const email = "mo310578@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
      const originalText = btn.textContent;
      btn.textContent = "✓ Copiado!";
      btn.style.transform = "scale(1.05)";
      btn.style.boxShadow = "0 0 15px rgba(34, 197, 94, 0.4)";

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.transform = "scale(1)";
        btn.style.boxShadow = "";
      }, 2000);
    });
  });
}

/**
 * Abas de habilidades na página Sobre (Tecnologias / Ferramentas & Lógica)
 */
function initSkillTabs() {
  const tabs = document.querySelectorAll(".skill-tab");
  const grids = document.querySelectorAll(".skill-grid");

  if (!tabs.length || !grids.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab");

      // Atualiza abas ativas
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Alterna visibilidade dos grids
      grids.forEach((grid) => {
        if (grid.id === `tab-${targetTab}`) {
          grid.classList.remove("hidden");
        } else {
          grid.classList.add("hidden");
        }
      });
    });
  });

  // Inicializa barras de progresso ao carregar
  initSkillBars();
}

function initSkillBars() {
  const fills = document.querySelectorAll(".skill-bar-fill");

  fills.forEach((fill) => {
    const width = fill.getAttribute("data-width");
    if (width) {
      // Define a variável CSS para a animação fillBar
      fill.style.setProperty("--target-width", width + "%");
      // Pequeno atraso para permitir que o CSS aplique a transição
      setTimeout(() => {
        fill.style.width = width + "%";
      }, 100);
    }
  });
}

/**
 * Efeito typewriter contínuo no mini-terminal da Hero Section
 * Alterna entre 3 frases com digitação letra por letra
 */
function initTypewriter() {
  const textEl = document.getElementById("typewriter-text");
  if (!textEl) return;

  const phrases = [
    "Focado em Front-end, Lógica e Banco de Dados",
    "Estudante de DSM na Fatec Jahu",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 50;
  const deleteSpeed = 40;
  const pauseTime = 2000;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      textEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      textEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let nextDelay;

    if (!isDeleting && charIndex === currentPhrase.length) {
      nextDelay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      nextDelay = 500;
    } else {
      nextDelay = isDeleting ? deleteSpeed : typeSpeed;
    }

    setTimeout(type, nextDelay);
  }

  setTimeout(type, 500);
}

/**
 * Modal de Detalhes do Projeto (Estudo de Caso)
 * Abre um modal com informações detalhadas ao clicar em um card de projeto
 */
function initProjectModal() {
  const modal = document.getElementById("project-modal");
  const backdrop = document.getElementById("modal-backdrop");
  const closeBtn = document.getElementById("modal-close");
  const cards = document.querySelectorAll(".project-card-link");

  if (!modal || !backdrop || !closeBtn || !cards.length) return;

  // Elementos do modal
  const modalTitle = document.getElementById("modal-title");
  const modalBadge = document.getElementById("modal-badge");
  const modalImg = document.getElementById("modal-img");
  const modalDesc = document.getElementById("modal-desc");
  const modalContext = document.getElementById("modal-context");
  const modalRole = document.getElementById("modal-role");
  const modalTags = document.getElementById("modal-tags");
  const modalLiveBtn = document.getElementById("modal-live-btn");
  const modalRepoBtn = document.getElementById("modal-repo-btn");

  function openModal(card) {
    // Preenche os dados do modal a partir dos atributos data-* do card
    modalTitle.textContent = card.getAttribute("data-title") || "";
    modalBadge.textContent = card.getAttribute("data-badge") || "";
    modalImg.src = card.getAttribute("data-img") || "";
    modalImg.alt = card.getAttribute("data-title") || "";
    modalDesc.textContent = card.querySelector(".project-content p")?.textContent || "";
    modalContext.textContent = card.getAttribute("data-context") || "";
    modalRole.textContent = card.getAttribute("data-role") || "";

    // Preenche as tags
    const tagsStr = card.getAttribute("data-tags") || "";
    const tags = tagsStr.split(",").map((t) => t.trim()).filter(Boolean);
    modalTags.innerHTML = tags
      .map((tag) => `<span>${tag}</span>`)
      .join("");

    // Preenche os links
    modalLiveBtn.href = card.getAttribute("data-live") || "#";
    modalRepoBtn.href = card.getAttribute("data-repo") || "#";

    // Abre o modal
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Clique no card abre o modal
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      openModal(card);
    });
  });

  // Clique no botão X fecha o modal
  closeBtn.addEventListener("click", closeModal);

  // Clique no backdrop fecha o modal
  backdrop.addEventListener("click", closeModal);

  // Tecla Escape fecha o modal
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });
}
