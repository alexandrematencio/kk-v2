<script setup lang="ts">
const route = useRoute()
const router = useRouter()

const isVisible = ref(false)
const isMenuOpen = ref(false)

let threshold = 0

function updateThreshold() {
  if (typeof window === 'undefined') return
  threshold = route.path === '/' ? window.innerHeight - 60 : 120
}

function onScroll() {
  if (typeof window === 'undefined') return
  isVisible.value = window.scrollY > threshold
}

function onResize() {
  updateThreshold()
  onScroll()
}

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
  updateThreshold()
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onResize, { passive: true })
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onResize)
  window.removeEventListener('keydown', onKeydown)
})

watch(() => route.path, () => {
  isMenuOpen.value = false
  nextTick(() => {
    updateThreshold()
    onScroll()
  })
})

watch(isMenuOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <Transition name="sticky-fade">
    <div v-if="isVisible" class="sticky-nav">
      <NuxtLink to="/" class="sticky-logo-wrap" aria-label="Khan Kluay accueil">
        <img
          src="/logos/khan-kluay-logo.svg"
          alt="Khan Kluay"
          class="sticky-logo"
        />
      </NuxtLink>

      <div class="sticky-nav-items">
        <NuxtLink to="/#menu" class="sticky-nav-item" @click="handleMenuClick">La carte</NuxtLink>
        <NuxtLink to="/reserver" class="sticky-nav-item">Réserver</NuxtLink>
        <NuxtLink to="/commander" class="sticky-nav-item">Commander</NuxtLink>
        <NuxtLink to="/contact" class="sticky-nav-item">Contact</NuxtLink>
      </div>

      <div class="sticky-contact">
        <a href="tel:+33146713315" class="sticky-contact-item">
          <Icon name="lucide:phone" class="sticky-contact-icon" />
          <span>+33 (0)1 46 71 33 15</span>
        </a>
        <a href="https://maps.google.com/?q=125+rue+Jean+Jaurès+94800" target="_blank" rel="noopener" class="sticky-contact-item">
          <Icon name="lucide:map-pin" class="sticky-contact-icon" />
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
  </Transition>

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
/* Sticky bar — mirrors the hero2 top header (logo | nav-items | contact)
   with the same center-stroke borders. */
.sticky-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 74px;
  display: flex;
  align-items: stretch;
  background: #ffffff;
}

.sticky-nav::after {
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

.sticky-logo-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  box-sizing: border-box;
  text-decoration: none;
  flex-shrink: 0;
}

.sticky-logo-wrap::after {
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

.sticky-logo {
  height: 40px;
  width: auto;
  display: block;
}

.sticky-nav-items {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding: 0 48px;
  box-sizing: border-box;
}

.sticky-nav-items::after {
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

.sticky-nav-item {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  transition: color 0.2s ease;
}

.sticky-nav-item:hover {
  color: #e22b02;
}

.sticky-contact {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 0 32px;
  flex-shrink: 0;
}

.sticky-contact-item {
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

.sticky-contact-item:hover {
  color: #e22b02;
}

.sticky-contact-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

/* Burger button — hidden on desktop */
.burger-btn {
  display: none;
}

/* Sticky-fade transition */
.sticky-fade-enter-active,
.sticky-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.sticky-fade-enter-from,
.sticky-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* Tighter spacing on narrower desktops so the bar fits before collapsing. */
@media (max-width: 1280px) {
  .sticky-logo-wrap {
    padding: 12px 16px;
  }

  .sticky-nav-items {
    gap: 16px;
    padding: 0 16px;
  }

  .sticky-contact {
    gap: 20px;
    padding: 0 16px;
  }
}

/* Tablet intermediate: drop contact labels, keep icons only. */
@media (max-width: 1200px) and (min-width: 1025px) {
  .sticky-contact-item span {
    display: none;
  }
}

/* MOBILE: hide logo + items + contact, show burger top-right. */
@media (max-width: 1024px) {
  .sticky-nav {
    height: 60px;
    justify-content: flex-end;
    padding: 10px 16px;
  }

  .sticky-logo-wrap,
  .sticky-nav-items,
  .sticky-contact {
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

/* Mobile overlay menu */
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
