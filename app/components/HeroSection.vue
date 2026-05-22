<script setup lang="ts">
import { gsap } from 'gsap'

const baseURL = useRuntimeConfig().app.baseURL

const ctaBtn = ref<HTMLButtonElement>()
const ctaSize = ref({ w: 0, h: 0 })
let ctaRO: ResizeObserver | null = null

function scrollToPhilosophy() {
  document.querySelector('#philosophie')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  const tl = gsap.timeline()

  tl.fromTo('.hero2-nav-item',
    { y: -40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out' },
    0,
  )

  tl.fromTo('.hero2-title',
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
    0.15,
  )

  tl.fromTo('.hero2-subtitle',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
    0.35,
  )

  tl.fromTo('.hero2-cta',
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(4)' },
    0.6,
  )

  tl.fromTo('.hero2-image',
    { x: 80, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
    0.1,
  )

  tl.fromTo('.hero2-bottom-item',
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
    0.7,
  )

  if (ctaBtn.value) {
    const update = () => {
      if (!ctaBtn.value) return
      ctaSize.value = {
        w: ctaBtn.value.offsetWidth,
        h: ctaBtn.value.offsetHeight,
      }
    }
    update()
    ctaRO = new ResizeObserver(update)
    ctaRO.observe(ctaBtn.value)
  }
})

onUnmounted(() => {
  ctaRO?.disconnect()
})
</script>

<template>
  <section class="hero2">
    <div class="hero2-main">
      <div class="hero2-left">
        <nav class="hero2-topnav">
          <NuxtLink to="/" class="hero2-logo-wrap" aria-label="Khan Kluay accueil">
            <img
              :src="`${baseURL}logos/khan-kluay-logo.svg`"
              alt="Khan Kluay"
              class="hero2-logo"
            />
          </NuxtLink>
          <div class="hero2-nav-items">
            <NuxtLink to="/#menu" class="hero2-nav-item">La carte</NuxtLink>
            <NuxtLink to="/reserver" class="hero2-nav-item">Réserver</NuxtLink>
            <NuxtLink to="/commander" class="hero2-nav-item">Commander</NuxtLink>
            <NuxtLink to="/contact" class="hero2-nav-item">Contact</NuxtLink>
          </div>
        </nav>

        <div class="hero2-content">
          <h1 class="hero2-title">
            Cuisine thaïlandaise authentique dans un restaurant familial
          </h1>
          <p class="hero2-subtitle">
            Depuis 14 ans, au coeur de Villejuif, nous cuisinons pour vous nos meilleurs plats dans une ambiance chaleureuse
          </p>
          <div class="hero2-cta-wrap">
            <button ref="ctaBtn" class="hero2-cta" @click="scrollToPhilosophy">
              <svg
                v-if="ctaSize.w > 0 && ctaSize.h > 0"
                class="hero2-cta-border"
                :viewBox="`-1 -1 ${ctaSize.w + 2} ${ctaSize.h + 2}`"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <rect
                  class="hero2-cta-border-path"
                  x="0.5"
                  y="0.5"
                  :width="ctaSize.w - 1"
                  :height="ctaSize.h - 1"
                  :rx="Math.max(0, (ctaSize.h - 1) / 2)"
                  :ry="Math.max(0, (ctaSize.h - 1) / 2)"
                  pathLength="100"
                />
              </svg>
              <span class="hero2-cta-text">Discover ↓</span>
            </button>
          </div>
        </div>

        <nav class="hero2-bottomnav">
          <a href="#story" class="hero2-bottom-item">
            <Icon name="lucide:book-open" class="hero2-bottom-icon" />
            <span>Notre histoire</span>
          </a>
          <a href="#reviews" class="hero2-bottom-item">
            <Icon name="lucide:star" class="hero2-bottom-icon" />
            <span>Nos reviews</span>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener" class="hero2-bottom-item">
            <Icon name="lucide:instagram" class="hero2-bottom-icon" />
            <span>Instagram</span>
          </a>
        </nav>
      </div>

      <aside class="hero2-right">
        <div class="hero2-contact">
          <a href="tel:+33146713315" class="hero2-contact-item">
            <Icon name="lucide:phone" class="hero2-contact-icon" />
            <span>+33 (0)1 46 71 33 15</span>
          </a>
          <a href="https://maps.google.com/?q=125+rue+Jean+Jaurès+94800" target="_blank" rel="noopener" class="hero2-contact-item">
            <Icon name="lucide:map-pin" class="hero2-contact-icon" />
            <span>125 rue Jean Jaurès, 94800</span>
          </a>
        </div>

        <div class="hero2-image-wrap">
          <picture>
            <source media="(max-width: 768px)" :srcset="`${baseURL}images/hero/responsive-mobile-img.png`" />
            <img
              :src="`${baseURL}images/hero/hero-banner-img.png`"
              alt="Khan Kluay Thai Cuisine"
              class="hero2-image"
            />
          </picture>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero2 {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #faf4ef;
  overflow: hidden;
  box-sizing: border-box;
}

.hero2-main {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
}

/* LEFT COLUMN */
.hero2-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* Center-aligned strokes (à la Figma "center" stroke alignment):
   we draw each separator with a pseudo-element offset by half its thickness
   outside its host so the line sits exactly on the boundary between blocks. */

.hero2-topnav {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 74px;
  flex-shrink: 0;
}

.hero2-topnav::after {
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

.hero2-logo-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  height: 100%;
  box-sizing: border-box;
}

.hero2-logo-wrap::after {
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

.hero2-logo {
  height: 50px;
  width: auto;
  display: block;
}

.hero2-nav-items {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
  padding: 0 48px;
  height: 100%;
  box-sizing: border-box;
}

.hero2-nav-items::after {
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

.hero2-nav-item {
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.2s ease;
}

.hero2-nav-item:hover {
  color: #e22b02;
}

.hero2-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px;
  box-sizing: border-box;
}

.hero2-title {
  width: 100%;
  max-width: 640px;
  margin: 0;
  font-family: 'Bricolage Grotesque 24pt', 'Bricolage Grotesque', sans-serif;
  font-size: 56px;
  font-weight: 500;
  line-height: 1.1;
  color: #000000;
  text-align: left;
}

.hero2-subtitle {
  width: 100%;
  max-width: 640px;
  margin: 0;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 400;
  font-style: italic;
  line-height: 1.4;
  color: #000000;
  text-align: left;
}

.hero2-cta-wrap {
  width: 100%;
  max-width: 640px;
  display: flex;
  justify-content: flex-start;
}

.hero2-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 40px;
  background: transparent;
  border: 2px solid #e22b02;
  border-radius: 60px;
  cursor: pointer;
  transition: border-color 0.25s ease;
}

.hero2-cta:hover {
  border-color: transparent;
}

.hero2-cta-border {
  position: absolute;
  inset: -2px;
  pointer-events: none;
  overflow: visible;
}

.hero2-cta-border-path {
  fill: none;
  stroke: #001b95;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  /* Hidden at rest so the zero-length dash at the path seam never shows */
  visibility: hidden;
  transition: stroke-dashoffset 0.607s cubic-bezier(0.65, 0, 0.35, 1), visibility 0s linear 0.607s;
}

.hero2-cta:hover .hero2-cta-border-path {
  stroke-dashoffset: 0;
  visibility: visible;
  transition: stroke-dashoffset 0.607s cubic-bezier(0.65, 0, 0.35, 1), visibility 0s linear 0s;
}

.hero2-cta-text {
  position: relative;
  z-index: 1;
  font-family: 'Bricolage Grotesque 24pt', 'Bricolage Grotesque', sans-serif;
  font-size: 48px;
  font-weight: 500;
  line-height: 1;
  color: #001b95;
}

.hero2-bottomnav {
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 74px;
  flex-shrink: 0;
}

.hero2-bottomnav::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 1px;
  background: #000000;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 2;
}

/* This one sits at the bottom edge of `.hero2` which has `overflow: hidden`,
   so a center-stroke (translateY 50%) would be half-clipped and render as 0.5px.
   We keep it fully inside the bottomnav to preserve the canonical 1px width
   shared by every other border in the hero. See HERO-DESIGN.md. */
.hero2-bottomnav::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #000000;
  pointer-events: none;
  z-index: 2;
}

.hero2-bottom-item {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  text-decoration: none;
  color: #000000;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 500;
  transition: color 0.2s ease;
}

.hero2-bottom-item:not(:last-child)::after {
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

.hero2-bottom-item:hover {
  color: #e22b02;
}

.hero2-bottom-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

/* RIGHT COLUMN */
.hero2-right {
  width: 33%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.hero2-contact {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 72px;
  padding: 0 48px;
  height: 74px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.hero2-contact::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: #000000;
  transform: translateY(50%) scaleY(0.5);
  pointer-events: none;
  z-index: 2;
}

.hero2-contact-item {
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

.hero2-contact-item:hover {
  color: #e22b02;
}

.hero2-contact-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.hero2-image-wrap {
  position: relative;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
}

.hero2-image-wrap::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 1px;
  background: #000000;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 2;
}

.hero2-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* RESPONSIVE */
/* Below 1280px the topnav (logo + 4 nav items) starts running out of room in
   the 67% left column, so we progressively shrink nav-items spacing and font.
   When even this tightened nav can no longer fit, we collapse at 1024px. */
@media (max-width: 1280px) {
  .hero2-logo-wrap {
    padding: 12px 16px;
  }

  .hero2-nav-items {
    gap: 16px;
    padding: 0 16px;
  }

  .hero2-nav-item {
    font-size: 18px;
  }

  .hero2-title {
    font-size: 44px;
  }

  .hero2-cta-text {
    font-size: 36px;
  }
}

/* Tablet intermediate state: right column is too narrow for the contact labels.
   Collapse phone + address text and keep only their icons. */
@media (max-width: 1200px) and (min-width: 1025px) {
  .hero2-contact {
    gap: 32px;
    padding: 0 16px;
  }

  .hero2-contact-item span {
    display: none;
  }
}

/* Below this point the right column would be too narrow for the image to keep
   a comfortable shared width with its contact nav bar — collapse to mobile. */
@media (max-width: 1024px) {
  .hero2 {
    height: auto;
    min-height: 100vh;
  }

  .hero2-main {
    flex-direction: column;
  }

  .hero2-left {
    order: 1;
  }

  .hero2-right {
    order: 2;
    width: 100%;
  }

  .hero2-topnav {
    flex-wrap: wrap;
    height: auto;
  }

  .hero2-logo-wrap {
    width: 100%;
  }

  /* Switch the logo's separator from right edge to bottom edge in stack mode. */
  .hero2-logo-wrap::after {
    top: auto;
    right: 0;
    bottom: 0;
    left: 0;
    width: auto;
    height: 1px;
    transform: translateY(50%);
  }

  .hero2-nav-items {
    width: 100%;
    padding: 12px 16px;
    gap: 16px;
    flex-wrap: wrap;
  }

  .hero2-nav-items::after {
    display: none;
  }

  .hero2-nav-item {
    font-size: 16px;
  }

  .hero2-content {
    padding: 32px 20px;
    align-items: flex-start;
  }

  .hero2-title {
    font-size: 32px;
  }

  .hero2-subtitle {
    font-size: 16px;
  }

  .hero2-cta {
    padding: 8px 28px;
  }

  .hero2-cta-text {
    font-size: 22px;
  }

  .hero2-bottomnav {
    height: auto;
  }

  .hero2-bottom-item {
    flex-direction: column;
    gap: 6px;
    padding: 12px 8px;
    font-size: 14px;
    text-align: center;
  }

  .hero2-contact {
    flex-wrap: wrap;
    height: auto;
    padding: 16px 20px;
    gap: 16px;
    justify-content: flex-start;
  }

  /* In mobile stack, the contact bar follows the left column's bottom nav.
     Add a top separator with the same center-stroke style as the others. */
  .hero2-contact::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    background: #000000;
    transform: translateY(-50%);
    pointer-events: none;
    z-index: 2;
  }

  /* Ensure labels reappear in mobile (they were hidden in the tablet state). */
  .hero2-contact-item span {
    display: inline;
  }

  .hero2-image-wrap {
    /* flex:none so the explicit height wins over the base flex-basis:0% */
    flex: none;
    height: 480px;
  }

  /* <picture> defaults to display:inline, which breaks the image's
     height:100% chain and leaves an inline line-box gap above it.
     Make it a block that fills the wrap so object-fit:cover applies. */
  .hero2-image-wrap picture {
    display: block;
    width: 100%;
    height: 100%;
  }

  .hero2-image-wrap::before {
    display: none;
  }
}

@media (max-width: 480px) {
  .hero2-title {
    font-size: 26px;
  }

  .hero2-cta-text {
    font-size: 18px;
  }

  .hero2-bottom-item {
    font-size: 12px;
  }

  .hero2-bottom-icon {
    width: 20px;
    height: 20px;
  }
}
</style>
