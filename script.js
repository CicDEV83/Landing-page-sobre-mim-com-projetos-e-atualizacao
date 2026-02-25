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
    contato.scrollIntoView({ behavior: "smooth" });
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
    } else {
      if (element.classList.contains("typing-dot")) {
        const cursor = document.createElement("span");
        cursor.textContent = ".";
        cursor.classList.add("blink-dot");
        element.appendChild(cursor);
      }
    }
  }

  type();
}


/* =====================================================
   DOM READY — TUDO CENTRALIZADO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ============================
     BOTÃO CONTATO
  ============================ */
  const botao = document.getElementById("botaoContato");
  if (botao) {
    botao.addEventListener("click", () => {
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
     SISTEMA DE PARTÍCULAS
  ============================ */

  /* =========================================
   PARTÍCULAS 3D ULTRA – REDE NEURAL SCI-FI
========================================= */

const canvas = document.getElementById("particles");

if (canvas) {

  const ctx = canvas.getContext("2d");

  let w = canvas.width = window.innerWidth;
  let h = canvas.height = window.innerHeight;

  const perspective = 900;
  const maxDepth = 1200;
  const particleCount = 220;

  let particlesArray = [];
  let mouseX = 0;
  let mouseY = 0;
  let scrollSpeedBoost = 0;
  let rotationX = 0;
  let rotationY = 0;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * w - w / 2;
      this.y = Math.random() * h - h / 2;
      this.z = Math.random() * maxDepth;
      this.size = Math.random() * 2 + 1;
      this.baseSpeed = 2;
    }

    update() {
      this.z -= this.baseSpeed + scrollSpeedBoost;

      if (this.z <= 0) {
        this.reset();
        this.z = maxDepth;
      }
    }

    rotate3D() {
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);

      let y = this.y * cosX - this.z * sinX;
      let z = this.y * sinX + this.z * cosX;

      let x = this.x * cosY + z * sinY;
      z = -this.x * sinY + z * cosY;

      return { x, y, z };
    }

    project() {
      const rotated = this.rotate3D();

      const scale = perspective / (perspective + rotated.z);
      const x2d = rotated.x * scale + w / 2;
      const y2d = rotated.y * scale + h / 2;

      return {
        x: x2d,
        y: y2d,
        opacity: 1 - rotated.z / maxDepth,
        scale
      };
    }

    draw() {
      const p = this.project();

      ctx.beginPath();
      ctx.arc(p.x, p.y, this.size * p.scale, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,240,255,${p.opacity})`;
      ctx.fill();
    }
  }

  function initParticles() {
    particlesArray = [];
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }
  }

  function connectParticles() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {

        const p1 = particlesArray[a].project();
        const p2 = particlesArray[b].project();

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = dx * dx + dy * dy;

        if (distance < 9000) {
          const opacity = (p1.opacity + p2.opacity) / 5;

          ctx.strokeStyle = `rgba(0,240,255,${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
  ctx.clearRect(0, 0, w, h);

  // Fundo espacial com leve gradiente
  const gradient = ctx.createRadialGradient(
    w / 2, h / 2, 100,
    w / 2, h / 2, Math.max(w, h)
  );

  gradient.addColorStop(0, "rgba(0, 10, 20, 0.3)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, w, h);

  particlesArray.forEach(p => {
    p.update();
    p.draw();
  });

  connectParticles();

  drawFog();

  scrollSpeedBoost *= 0.9;

  requestAnimationFrame(animate);
}

function drawFog() {
  const fogGradient = ctx.createRadialGradient(
    w / 2, h / 2, 0,
    w / 2, h / 2, Math.max(w, h) / 1.2
  );

  fogGradient.addColorStop(0, "rgba(0,0,0,0)");
  fogGradient.addColorStop(0.6, "rgba(0,0,0,0.2)");
  fogGradient.addColorStop(1, "rgba(0,0,0,0.6)");

  ctx.fillStyle = fogGradient;
  ctx.fillRect(0, 0, w, h);
}


  /* ==========================
     MOUSE 3D INTERATIVO
  ========================== */

  document.addEventListener("mousemove", e => {
    mouseX = (e.clientX - w / 2) / w;
    mouseY = (e.clientY - h / 2) / h;

    rotationY = mouseX * 1.2;
    rotationX = mouseY * 1.2;
  });

  /* ==========================
     WARP NO SCROLL
  ========================== */

  window.addEventListener("scroll", () => {
    scrollSpeedBoost = 8;
  });

  /* ==========================
     RESPONSIVIDADE
  ========================== */

  window.addEventListener("resize", () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    initParticles();
  });

  initParticles();
  animate();
}
  /* ============================
     CURSOR PERSONALIZADO
  ============================ */
  /* =========================================
   PARTÍCULAS 3D ULTRA – REDE NEURAL SCI-FI
========================================= */

  const cursor = document.querySelector(".cursor");
  if (cursor) {
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
  }

});


/* =====================================================
   PARALLAX SUAVE
===================================================== */

window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const offset = window.scrollY * 0.15;
  hero.style.backgroundPositionY = offset + "px";
});


/* =====================================================
   REMOVER LOADER
===================================================== */

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (!loader) return;

  loader.style.opacity = "0";
  loader.style.transition = "0.5s ease";

  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});
