/* =====================================================
   FUNÇÕES GLOBAIS
===================================================== */

function abrirWhatsApp() {
  const numero = "5565998024631";
  const mensagem = "Olá, vim pelo seu portfólio!";
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}

function irParaContato() {
  const contato = document.getElementById("contato");
  if (contato) {
    contato.scrollIntoView({
      behavior: "smooth"
    });
  }
}

function typeWriter(element, speed = 50) {
  const text = element.getAttribute("data-text");
  let index = 0;

  element.innerHTML = "";

  function type() {
    if (index < text.length) {
      element.innerHTML += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

/* =====================================================
   DOM READY
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ============================
     BOTÃO CONTATO
  ============================ */
  const botao = document.getElementById("botaoContato");

  if (botao) {
    botao.addEventListener("click", function () {
      alert("Obrigado por entrar em contato! 🚀");
      abrirWhatsApp();
    });
  }

  /* ============================
     SISTEMA GLOBAL DE DIGITAÇÃO
  ============================ */
  const typingElements = document.querySelectorAll(".typing");

  typingElements.forEach((element, i) => {
    setTimeout(() => {
      typeWriter(element, 60);
    }, i * 800);
  });

  /* ============================
     GLOW DINÂMICO NOS CARDS
  ============================ */
  const cards = document.querySelectorAll(".project-card");

  cards.forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--x", x + "px");
      card.style.setProperty("--y", y + "px");
    });
  });

});

/* =====================================================
   PARALLAX SUAVE
===================================================== */

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero-content");
  if (hero) {
    let offset = window.scrollY * 0.2;
    hero.style.transform = `translateY(${offset}px)`;
  }
});

/* ==========================
   SISTEMA DE PARTÍCULAS
========================== */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width || this.x < 0) {
      this.speedX *= -1;
    }

    if (this.y > canvas.height || this.y < 0) {
      this.speedY *= -1;
    }
  }

  draw() {
    ctx.fillStyle = "rgba(0, 240, 255, 0.7)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  let numberOfParticles = (canvas.width * canvas.height) / 9000;

  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach(particle => {
    particle.update();
    particle.draw();
  });

  connectParticles();
  requestAnimationFrame(animateParticles);
}

function connectParticles() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = dx * dx + dy * dy;

      if (distance < 10000) {
        ctx.strokeStyle = "rgba(0, 240, 255, 0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animateParticles();

/* ==========================
   CURSOR PERSONALIZADO
========================== */

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const interactiveElements = document.querySelectorAll("button, a");

interactiveElements.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("active");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("active");
  });
});

/* ==========================
   REMOVER LOADER
========================== */

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  loader.style.opacity = "0";
  loader.style.transition = "0.5s ease";
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});
