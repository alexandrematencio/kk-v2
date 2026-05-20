<script setup lang="ts">
import { gsap } from 'gsap'

const sectionRef = ref<HTMLElement | null>(null)

function scrollToMenu() {
  document.querySelector('.menu-section')?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  nextTick(initAnimation)
})

function initAnimation() {
  if (!sectionRef.value) return

  gsap.fromTo('.story-eyebrow, .story-thai, .story-title',
    { opacity: 0, y: 32 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    },
  )

  gsap.fromTo('.story-block',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 55%',
        toggleActions: 'play none none none',
      },
    },
  )

  gsap.fromTo('.story-cta',
    { opacity: 0, y: 24 },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 35%',
        toggleActions: 'play none none none',
      },
    },
  )
}
</script>

<template>
  <section ref="sectionRef" class="story-section">
    <div class="story-container">
      <header class="story-header">
        <p class="story-eyebrow">Une famille a votre table</p>
        <span class="story-thai">เรื่องราว</span>
        <h2 class="story-title">Histoire</h2>
      </header>

      <div class="story-body">
        <article class="story-block">
          <p class="block-label">
            <span class="block-thai">ครอบครัว</span>
            <span class="block-dot">·</span>
            <span class="block-latin">La famille</span>
          </p>
          <p class="block-headline">Douze annees a votre table.</p>
          <p class="block-text">
            Un restaurant tenu par une famille thailandaise — pas par des employes qui viennent et repartent.
            Chaque service est un retour a la maison.
          </p>
        </article>

        <article class="story-block">
          <p class="block-label">
            <span class="block-thai">มรดก</span>
            <span class="block-dot">·</span>
            <span class="block-latin">L'heritage</span>
          </p>
          <p class="block-headline">De recette en recette.</p>
          <p class="block-text">
            Chaque plat retrace un souvenir, chaque epice raconte une histoire
            transmise de generation en generation. Ce qu'on cuisine ici, c'est ce qu'on a appris a la maison.
          </p>
        </article>

        <article class="story-block">
          <p class="block-label">
            <span class="block-thai">บ้าน</span>
            <span class="block-dot">·</span>
            <span class="block-latin">Notre maison</span>
          </p>
          <p class="block-headline">Au coeur de Villejuif.</p>
          <p class="block-text">
            Pres du centre et de la mairie, a deux pas du boulevard Maxime Gorki.
            Facile d'acces en metro ou en voiture — on a hate de vous accueillir.
          </p>
        </article>
      </div>

      <button class="story-cta" @click="scrollToMenu">
        <span class="cta-text">Decouvrez notre carte ↓</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.story-section {
  padding: 8rem 2rem 6rem;
  background: var(--color-surface-alt);
  color: var(--color-text);
}

.story-container {
  max-width: 800px;
  margin: 0 auto;
}

/* Header — same bilingual chapter device as MenuSection / PageHeader */
.story-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 5rem;
}

.story-eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #001B95;
  font-weight: 500;
  opacity: 0.45;
  margin-bottom: 1.25rem;
}

.story-thai {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 400;
  color: #E22B02;
  line-height: 1.1;
  margin-bottom: 0.25rem;
}

.story-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.75rem, 7vw, 5rem);
  font-weight: 700;
  color: #001B95;
  letter-spacing: 0.02em;
  line-height: 1;
  margin: 0;
}

/* Body — three editorial blocks */
.story-body {
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
}

.story-block {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem 0;
  border-top: 1px solid var(--color-border);
}

.story-block:first-child {
  border-top: none;
  padding-top: 0;
}

.block-label {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin: 0 0 0.25rem;
  flex-wrap: wrap;
}

.block-thai {
  font-size: 1.05rem;
  color: #E22B02;
  font-weight: 400;
}

.block-dot {
  color: var(--color-text-muted);
  opacity: 0.5;
}

.block-latin {
  font-size: 0.7rem;
  font-weight: 600;
  color: #001B95;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.block-headline {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.75rem, 4.5vw, 2.75rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.1;
  letter-spacing: 0.01em;
  margin: 0;
}

.block-text {
  font-size: 1rem;
  color: var(--color-text-muted);
  line-height: 1.65;
  max-width: 60ch;
  margin: 0;
}

/* CTA — discovery pill matching hero */
.story-cta {
  display: block;
  margin: 2rem auto 0;
  padding: 14px 40px;
  background: #ffffff;
  border: 1px solid #000000;
  border-radius: 60px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
}

.story-cta:hover {
  background: #001B95;
  border-color: #001B95;
}

.story-cta:hover .cta-text {
  color: #fff;
}

.cta-text {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1;
  font-weight: 500;
  color: #001B95;
  letter-spacing: 0.1em;
  white-space: nowrap;
  transition: color 0.2s ease;
}

@media (max-width: 768px) {
  .story-section {
    padding: 5rem 1.25rem 4rem;
  }

  .story-header {
    margin-bottom: 3rem;
  }

  .story-body {
    margin-bottom: 3rem;
  }

  .story-block {
    padding: 2.25rem 0;
  }
}

@media (max-width: 480px) {
  .story-cta {
    padding: 12px 28px;
  }

  .cta-text {
    font-size: 0.9rem;
    letter-spacing: 0.08em;
  }
}
</style>
