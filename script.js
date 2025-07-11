// Scroll Reveal Animation
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right")

  reveals.forEach((element) => {
    const windowHeight = window.innerHeight
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("revealed")
    }
  })
}

// Header Background on Scroll
function headerOnScroll() {
  const header = document.querySelector(".header")
  const scrolled = window.scrollY > 50

  if (scrolled) {
    header.style.background = "rgba(255, 255, 255, 0.98)"
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.background = "rgba(255, 255, 255, 0.95)"
    header.style.boxShadow = "none"
  }
}

// Smooth Scroll for Navigation Links
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
}

// Mobile Menu Toggle
function mobileMenu() {
  const toggle = document.querySelector(".mobile-menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  if (toggle && navLinks) {
    toggle.addEventListener("click", function () {
      navLinks.classList.toggle("active")
      this.classList.toggle("active")
    })
  }
}

// Portfolio Card Hover Effect
function portfolioHover() {
  const cards = document.querySelectorAll(".portfolio-card")

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Typing Effect for Hero Title
function typingEffect() {
  const title = document.querySelector(".hero-title")
  const text = title.textContent
  title.textContent = ""

  let i = 0
  const timer = setInterval(() => {
    if (i < text.length) {
      title.textContent += text.charAt(i)
      i++
    } else {
      clearInterval(timer)
    }
  }, 50)
}

// WhatsApp Button Analytics
function trackWhatsAppClick() {
  const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]')

  whatsappButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Aqui você pode adicionar código de analytics
      console.log("WhatsApp button clicked")

      // Exemplo com Google Analytics (se estiver configurado)
      window.gtag =
        window.gtag ||
        (() => {
          ;(window.gtag.q = window.gtag.q || []).push(arguments)
        }) // Declare gtag variable // Declare gtag variable
      if (typeof window.gtag !== "undefined") {
        window.gtag("event", "click", {
          event_category: "Contact",
          event_label: "WhatsApp",
        })
      }
    })
  })
}

// Form Validation (se houver formulários)
function formValidation() {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      const inputs = this.querySelectorAll("input[required], textarea[required]")
      let isValid = true

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false
          input.style.borderColor = "#ef4444"
        } else {
          input.style.borderColor = "#d1d5db"
        }
      })

      if (!isValid) {
        e.preventDefault()
        alert("Por favor, preencha todos os campos obrigatórios.")
      }
    })
  })
}

// Lazy Loading for Images
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.remove("lazy")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize all functions
document.addEventListener("DOMContentLoaded", () => {
  smoothScroll()
  mobileMenu()
  portfolioHover()
  trackWhatsAppClick()
  formValidation()
  lazyLoadImages()

  // Delay typing effect
  setTimeout(typingEffect, 500)
})

// Event listeners for scroll
window.addEventListener("scroll", () => {
  revealOnScroll()
  headerOnScroll()
})

// Performance optimization
let ticking = false

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimations)
    ticking = true
  }
}

function updateAnimations() {
  revealOnScroll()
  headerOnScroll()
  ticking = false
}

window.addEventListener("scroll", requestTick)

// Preload critical resources
function preloadResources() {
  const criticalImages = ["/placeholder.svg?height=500&width=600", "/placeholder.svg?height=400&width=400"]

  criticalImages.forEach((src) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "image"
    link.href = src
    document.head.appendChild(link)
  })
}

// Call preload on page load
window.addEventListener("load", preloadResources)

// Add CSS for mobile menu
const mobileMenuCSS = `
@media (max-width: 768px) {
    .nav-links {
        position: fixed;
        top: 70px;
        right: -100%;
        width: 100%;
        height: calc(100vh - 70px);
        background: white;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding-top: 2rem;
        transition: right 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    
    .nav-links.active {
        right: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
}
`

// Inject mobile menu CSS
const style = document.createElement("style")
style.textContent = mobileMenuCSS
document.head.appendChild(style)
