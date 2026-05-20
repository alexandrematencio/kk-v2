<script setup lang="ts">
onMounted(() => {
  window.scrollTo(0, 0)
  window.onbeforeprint = () => window.scrollTo(0, 0)
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <StickyNav />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

:root {
  /* Brand Colors from BRANDING.md */
  --color-bg: #F7F7F7;
  --color-surface: #FFFFFF;
  --color-surface-alt: #F5F3EF;
  --color-text: #1A1A1E;
  --color-text-muted: #6B6B6B;
  --color-accent: #A51931;
  --color-accent-hover: #8B1528;
  --color-primary: #241D4F;
  --color-secondary: #3A3258;
  --color-border: #E5E3DE;
  --color-border-light: #F0EDE8;

  /* Typography */
  --font-body: 'Inter', sans-serif;
  --font-heading: 'Inter', sans-serif;

  /* Layout */
  --sticky-nav-height: 65px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html { scroll-behavior: auto; }

body {
  font-family: var(--font-body);
  font-weight: 400;
  background: var(--color-bg);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 700;
}

.footer {
  padding: 4rem 2rem;
  background: var(--color-surface-alt);
  text-align: center;
}

.footer p {
  font-size: 0.85rem;
  opacity: 0.5;
  margin-bottom: 0.5rem;
  color: var(--color-text-muted);
}

.footer .hours {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
}

.footer .credit {
  margin-top: 1.5rem;
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 0.75rem;
}

.footer .aaxlo-logo {
  display: inline-block;
  height: 0.75em;
  width: auto;
  vertical-align: -0.02em;
}
</style>
