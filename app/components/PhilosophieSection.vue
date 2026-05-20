<script setup lang="ts">
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)

const thaiScript = ['สดชื่น', 'ร้อน', 'รัก']

onMounted(() => {
  initScrollReveal()
  initBounceAnimation()
})

function initScrollReveal() {
  if (!sectionRef.value) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top top',
      end: '+=250%',
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
    }
  })

  // Word 1: Thai appears first, then Latin overlaid
  tl.fromTo('.word-group-0 .thai-layer',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.3 }
  )
  tl.fromTo('.word-group-0 .latin-layer',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.3 },
    '>'
  )
  // With Fraicheur Latin starts → show tagline 1 at SAME moment
  tl.fromTo('.tagline-1', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }, '<')
  tl.to('.tagline-2, .tagline-3', { opacity: 0, duration: 0.2, ease: 'power2.in' }, '<')

  // Word 2: Thai first then Latin overlaid
  tl.to({}, { duration: 0.1 })
  tl.fromTo('.word-group-1 .thai-layer',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.3 }
  )
  tl.fromTo('.word-group-1 .latin-layer',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.3 },
    '>'
  )
  // With Feu Latin starts → show tagline 2 at SAME moment
  tl.fromTo('.tagline-2', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }, '<')
  tl.to('.tagline-1, .tagline-3', { opacity: 0, duration: 0.2, ease: 'power2.in' }, '<')

  // Word 3: Thai first then Latin overlaid
  tl.to({}, { duration: 0.1 })
  tl.fromTo('.word-group-2 .thai-layer',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.3 }
  )
  tl.fromTo('.word-group-2 .latin-layer',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.3 },
    '>'
  )
  // With Passion Latin starts → show tagline 3 at SAME moment
  tl.fromTo('.tagline-3', { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' }, '<')
  tl.to('.tagline-1, .tagline-2', { opacity: 0, duration: 0.2, ease: 'power2.in' }, '<')
}

// Bounce animation for the scroll indicator
function initBounceAnimation() {
  gsap.to('.scroll-indicator', {
    y: 12,
    duration: 1.2,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
  })
}

// Scroll to next section
function scrollToNext() {
  window.scrollTo({
    top: window.scrollY + window.innerHeight * 0.8,
    behavior: 'smooth'
  })
}
</script>

<template>
  <section id="philosophie" ref="sectionRef" class="philosophy-section">
    <div class="philosophy-container">
      <div class="label">Notre philosophie</div>

      <div class="words-stack">
        <!-- Word 1 -->
        <div class="word-group word-group-0">
          <span class="thai-layer">{{ thaiScript[0] }}</span>
          <span class="latin-layer">Fraicheur</span>
        </div>

        <!-- Word 2 -->
        <div class="word-group word-group-1">
          <span class="thai-layer">{{ thaiScript[1] }}</span>
          <span class="latin-layer">Feu</span>
        </div>

        <!-- Word 3 -->
        <div class="word-group word-group-2">
          <span class="thai-layer">{{ thaiScript[2] }}</span>
          <span class="latin-layer">Passion</span>
        </div>
      </div>

      <div class="taglines-wrapper">
        <p class="philosophy-tagline tagline-1">Ingredients selectionnes chaque matin</p>
        <p class="philosophy-tagline tagline-2">Wok pousse a haute temperature</p>
        <p class="philosophy-tagline tagline-3">Cuisine preparee avec coeur</p>
      </div>

      <!-- Scroll indicator -->
      <div class="scroll-indicator" @click="scrollToNext">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.philosophy-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface-alt);
  padding: 4rem 2rem;
}

.philosophy-container {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.label {
  font-size: 0.65rem;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  opacity: 0.4;
  margin-bottom: 2.5rem;
  color: #001B95;
  font-weight: 500;
}

.words-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.word-group {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.thai-layer {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 400;
  color: #E22B02;
  opacity: 0;
  line-height: 1.1;
  position: relative;
}

.word-group-0 .thai-layer {
  opacity: 1;
}

.latin-layer {
  font-size: clamp(2.25rem, 7.5vw, 3.75rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #001B95;
  line-height: 1.1;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}

.philosophy-tagline {
  font-size: 1.125rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  text-align: center;
  max-width: min(90vw, 600px);
  width: max-content;
  line-height: 1.4;
}

.taglines-wrapper {
  position: relative;
  height: 3rem;
  margin-top: 2rem;
  width: 100%;
}

@media (max-width: 600px) {
  .philosophy-tagline {
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    width: auto;
    max-width: 90vw;
  }

  .taglines-wrapper {
    height: 4.5rem;
  }
}


.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  color: #001B95;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
}

.scroll-indicator svg {
  width: 32px;
  height: 32px;
}
</style>