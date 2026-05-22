<script setup lang="ts">
const baseURL = useRuntimeConfig().app.baseURL

const route = useRoute()
const router = useRouter()

const isMenuOpen = ref(false)

async function handleMenuClick(e: MouseEvent) {
  e.preventDefault()
  isMenuOpen.value = false
  if (route.path === '/') {
    document.querySelector('.menu-section')?.scrollIntoView({ behavior: 'smooth' })
    return
  }
  await router.push('/')
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelector('.menu-section')?.scrollIntoView({ behavior: 'smooth' })
    })
  })
}

function closeMenu() {
  isMenuOpen.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('keydown', onKeydown)
})

watch(() => route.path, () => {
  isMenuOpen.value = false
})

watch(isMenuOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <div class="main-nav">
    <NuxtLink to="/" class="main-nav-logo-wrap" aria-label="Khan Kluay accueil">
      <img
        :src="`${baseURL}logos/khan-kluay-logo.svg`"
        alt="Khan Kluay"
        class="main-nav-logo"
      />
    </NuxtLink>

    <div class="main-nav-items">
      <NuxtLink to="/#menu" class="main-nav-item" @click="handleMenuClick">La carte</NuxtLink>
      <NuxtLink to="/reserver" class="main-nav-item">Réserver</NuxtLink>
      <NuxtLink to="/commander" class="main-nav-item">Commander</NuxtLink>
      <NuxtLink to="/contact" class="main-nav-item">Contact</NuxtLink>
    </div>

    <div class="main-nav-contact">
      <a href="tel:+33146713315" class="main-nav-contact-item">
        <Icon name="lucide:phone" class="main-nav-contact-icon" />
        <span>+33 (0)1 46 71 33 15</span>
      </a>
      <a href="https://maps.google.com/?q=125+rue+Jean+Jaurès+94800" target="_blank" rel="noopener" class="main-nav-contact-item">
        <Icon name="lucide:map-pin" class="main-nav-contact-icon" />
        <span>125 rue Jean Jaurès, 94800</span>
      </a>
    </div>

    <button
      class="burger-btn"
      :class="{ open: isMenuOpen }"
      :aria-expanded="isMenuOpen"
      aria-label="Menu"
      @click="isMenuOpen = !isMenuOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>

  <Transition name="overlay">
    <div v-if="isMenuOpen" class="burger-overlay" @click.self="closeMenu">
      <nav class="burger-menu">
        <NuxtLink to="/" class="burger-item" @click="closeMenu">Accueil</NuxtLink>
        <NuxtLink to="/#menu" class="burger-item" @click="handleMenuClick">La carte</NuxtLink>
        <NuxtLink to="/reserver" class="burger-item" @click="closeMenu">Réserver</NuxtLink>
        <NuxtLink to="/commander" class="burger-item" @click="closeMenu">Commander</NuxtLink>
        <NuxtLink to="/contact" class="burger-item" @click="closeMenu">Contact</NuxtLink>
      </nav>
    </div>
  </Transition>
</template>

<style scoped>
/* In-flow top nav for non-homepage pages. Visually identical to the top
   row of the hero2 (logo | nav-items | contact) and to StickyNav.vue.
   Keep these three in sync — see HERO-DESIGN.md. */
.main-nav {
  position: relative;
  width: 100%;
  height: 74px;
  display: flex;
  align-items: stretch;
  background: #ffffff;
}

.main-nav::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #000000;
  transform: translateY(50%);
  pointer-events: none;
  z-index: 2;
}

.main-nav-logo-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  box-sizing: border-box;
  text-decoration: none;
  flex-shrink: 0;
}

.main-nav-logo-wrap::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 1px;
  background: #000000;
  transform: translateX(50%);
  pointer-events: none;
  z-index: 2;
}

.main-nav-logo {
  height: 50px;
  width: auto;
  display: block;
}

.main-nav-items {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding: 0 48px;
  box-sizing: border-box;
}

.main-nav-items::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 1px;
  background: #000000;
  transform: translateX(50%);
  pointer-events: none;
  z-index: 2;
}

.main-nav-item {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.main-nav-item:hover {
  color: #e22b02;
}

.main-nav-contact {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 16px;
  flex-shrink: 0;
}

.main-nav-contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  transition: color 0.2s ease;
}

.main-nav-contact-item:hover {
  color: #e22b02;
}

.main-nav-contact-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.burger-btn {
  display: none;
}

/* Tighter spacing on narrower desktops — mirrors hero2 + sticky. */
@media (max-width: 1280px) {
  .main-nav-logo-wrap {
    padding: 12px 16px;
  }

  .main-nav-logo {
    height: 40px;
  }

  .main-nav-items {
    gap: 16px;
    padding: 0 16px;
  }

  .main-nav-item {
    font-size: 18px;
  }

  .main-nav-contact {
    gap: 16px;
    padding: 0 16px;
  }
}

@media (max-width: 1200px) and (min-width: 1025px) {
  .main-nav-contact-item span {
    display: none;
  }
}

@media (max-width: 1024px) {
  .main-nav {
    height: 60px;
    justify-content: flex-end;
    padding: 10px 16px;
  }

  .main-nav-logo-wrap,
  .main-nav-items,
  .main-nav-contact {
    display: none;
  }

  .burger-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    background: #fff;
    border: 1px solid #000;
    border-radius: 50%;
    cursor: pointer;
    padding: 12px;
    align-self: center;
  }

  .burger-btn span {
    display: block;
    width: 100%;
    height: 2px;
    background: #001B95;
    border-radius: 1px;
    transform-origin: center;
    transition: transform 0.25s ease, opacity 0.25s ease;
  }

  .burger-btn.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .burger-btn.open span:nth-child(2) {
    opacity: 0;
  }

  .burger-btn.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }
}

.burger-overlay {
  position: fixed;
  inset: 0;
  background: rgba(247, 247, 247, 0.97);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}

.burger-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  padding: 2rem;
}

.burger-item {
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 600;
  color: #000;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.2s ease;
}

.burger-item:hover,
.burger-item.router-link-active {
  color: #001B95;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.25s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
