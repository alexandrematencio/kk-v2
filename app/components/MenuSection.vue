<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { menuData, categories, categoryMeta } = useMenu()

const menuSectionRef = ref<HTMLElement | null>(null)
const activeChapter = ref(categories[0])

function jumpToChapter(cat: typeof categories[number]) {
  const el = document.querySelector(`#chapter-${cat}`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  nextTick(setupAnimations)
})

onBeforeUnmount(() => {
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger && menuSectionRef.value?.contains(st.trigger as Node)) st.kill()
  })
})

function setupAnimations() {
  if (!menuSectionRef.value) return

  // Header reveal
  gsap.fromTo('.menu-title, .menu-eyebrow',
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: menuSectionRef.value,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    },
  )

  // Chapter heading reveal — Thai first, then Latin (mirror Philosophie device)
  document.querySelectorAll('.chapter').forEach((chapter) => {
    const thai = chapter.querySelector('.chapter-thai')
    const latin = chapter.querySelector('.chapter-latin')
    if (!thai || !latin) return
    gsap.timeline({
      scrollTrigger: {
        trigger: chapter,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
      .fromTo(thai, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .fromTo(latin, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.15')
  })

  // Items: stagger fade-up + tiny scale
  document.querySelectorAll('.chapter').forEach((chapter) => {
    const items = chapter.querySelectorAll('.menu-item')
    if (!items.length) return
    gsap.fromTo(items,
      { opacity: 0, y: 30, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: chapter,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      },
    )
  })

  // Image curtain reveal
  document.querySelectorAll('.menu-img-wrapper').forEach((wrapper) => {
    gsap.fromTo(wrapper,
      { clipPath: 'inset(50% 0 50% 0)' },
      {
        clipPath: 'inset(0% 0 0% 0)',
        duration: 0.8,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      },
    )
  })

  // Active chapter tracking for sticky tabs
  categories.forEach((cat) => {
    ScrollTrigger.create({
      trigger: `#chapter-${cat}`,
      start: 'top 30%',
      end: 'bottom 30%',
      onToggle: (self) => {
        if (self.isActive) activeChapter.value = cat
      },
    })
  })
}
</script>

<template>
  <section id="menu" ref="menuSectionRef" class="menu-section">
    <header class="menu-header">
      <p class="menu-eyebrow">Chaque plat raconte une histoire</p>
      <h2 class="menu-title">La carte</h2>
    </header>

    <nav class="menu-tabs">
      <button
        v-for="cat in categories"
        :key="cat"
        class="tab"
        :class="{ active: activeChapter === cat }"
        @click="jumpToChapter(cat)"
      >
        <span class="tab-thai">{{ categoryMeta[cat].thai }}</span>
        <span class="tab-latin">{{ categoryMeta[cat].latin }}</span>
      </button>
    </nav>

    <div class="chapters">
      <article
        v-for="cat in categories"
        :id="`chapter-${cat}`"
        :key="cat"
        class="chapter"
      >
        <header class="chapter-header">
          <span class="chapter-thai">{{ categoryMeta[cat].thai }}</span>
          <h3 class="chapter-latin">{{ categoryMeta[cat].latin }}</h3>
        </header>

        <ul class="chapter-items">
          <li v-for="item in menuData[cat]" :key="item.title" class="menu-item">
            <div class="menu-item-text">
              <h4 class="item-name">{{ item.title }}</h4>
              <p class="item-thai-price">
                <span class="item-thai">{{ item.thai }}</span>
                <span class="dot">·</span>
                <span class="item-price">{{ item.price }} €</span>
              </p>
              <p class="item-desc">{{ item.description }}</p>
              <div class="item-meta">
                <span v-if="item.spicy" class="spicy">{{ '🌶'.repeat(item.spicy) }}</span>
                <span v-if="item.featured" class="featured">Best-seller</span>
              </div>
            </div>
            <div class="menu-img-wrapper">
              <img :src="`/images/plats/${item.img}`" :alt="item.title" class="menu-img" />
            </div>
          </li>
        </ul>
      </article>
    </div>
  </section>
</template>

<style scoped>
.menu-section {
  padding: 8rem 2rem 6rem;
  background: var(--color-bg);
  color: var(--color-text);
}

/* Header */
.menu-header {
  text-align: center;
  margin-bottom: 3rem;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.menu-eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #001B95;
  font-weight: 500;
  opacity: 0.45;
  margin-bottom: 1rem;
}

.menu-title {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1;
}

/* Sticky tabs — anchored just below the global StickyNav */
.menu-tabs {
  position: sticky;
  top: var(--sticky-nav-height);
  z-index: 20;
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  padding: 1.25rem 0;
  margin: 2rem auto 4rem;
  max-width: 1100px;
  background: rgba(247, 247, 247, 0.92);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  background: transparent;
  border: none;
  padding: 0.5rem 0;
  cursor: pointer;
  position: relative;
  font-family: 'Inter', sans-serif;
  transition: opacity 0.2s ease;
}

.tab-thai {
  font-size: 0.75rem;
  color: #E22B02;
  font-weight: 400;
  opacity: 0.85;
}

.tab-latin {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: capitalize;
  transition: color 0.2s ease;
}

.tab:hover .tab-latin {
  color: #001B95;
}

.tab.active .tab-latin {
  color: #001B95;
  font-weight: 700;
}

.tab.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1.25rem;
  height: 2px;
  background: #001B95;
}

/* Chapters */
.chapters {
  max-width: 1100px;
  margin: 0 auto;
}

.chapter {
  padding: 4rem 0 6rem;
  border-top: 1px solid var(--color-border);
}

.chapter:first-of-type {
  border-top: none;
}

.chapter-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  margin-bottom: 3.5rem;
}

.chapter-thai {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 400;
  color: #E22B02;
  line-height: 1.1;
}

.chapter-latin {
  font-family: 'Inter', sans-serif;
  font-size: clamp(2.75rem, 7vw, 5rem);
  font-weight: 700;
  color: #001B95;
  letter-spacing: 0.02em;
  line-height: 1;
}

/* Items */
.chapter-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 3rem;
  padding: 2.5rem 0;
  border-top: 1px solid var(--color-border-light);
  align-items: center;
}

.menu-item:first-child {
  border-top: none;
  padding-top: 0;
}

.menu-item-text {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-name {
  font-family: 'Inter', sans-serif;
  font-size: clamp(1.5rem, 3.2vw, 2.25rem);
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.1;
  margin: 0;
}

.item-thai-price {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.95rem;
  margin: 0;
}

.item-thai {
  color: #001B95;
  font-weight: 500;
}

.dot {
  color: var(--color-text-muted);
  opacity: 0.5;
}

.item-price {
  color: var(--color-accent);
  font-weight: 600;
}

.item-desc {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.55;
  max-width: 50ch;
  margin: 0.25rem 0 0;
}

.item-meta {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-top: 0.5rem;
  min-height: 1.25rem;
}

.spicy {
  font-size: 0.85rem;
  letter-spacing: 0.05em;
}

.featured {
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #001B95;
  font-weight: 600;
}

.menu-img-wrapper {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-surface-alt);
  clip-path: inset(50% 0 50% 0);
}

.menu-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.menu-item:hover .menu-img {
  transform: scale(1.04);
}

/* Responsive */
@media (max-width: 768px) {
  .menu-section {
    padding: 5rem 1.25rem 4rem;
  }

  .menu-tabs {
    gap: 1.25rem;
    overflow-x: auto;
    justify-content: flex-start;
    padding: 1rem 0.5rem;
    scrollbar-width: none;
  }

  .menu-tabs::-webkit-scrollbar { display: none; }

  .tab {
    flex-shrink: 0;
  }

  .menu-item {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 2rem 0;
  }

  .menu-img-wrapper {
    order: -1;
    aspect-ratio: 16 / 10;
  }

  .chapter {
    padding: 3rem 0 4rem;
  }

  .chapter-header {
    margin-bottom: 2rem;
  }
}
</style>
