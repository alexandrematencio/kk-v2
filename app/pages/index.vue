<script setup lang="ts">
definePageMeta({ layout: false })
</script>

<template>
  <div class="app">
    <HeroSection />
    <PhilosophieSection />
    <StorySection />
    <MenuSection />
    <footer class="footer">
      <p>12 avenue de la Republique, Villejuif</p>
      <p class="hours">Ouvert 7j/7 · 11h30-14h30 · 18h30-22h30</p>
      <p class="credit">
        Concept, design &amp; development by
        <img src="/logos/logo-aaxlo.svg" alt="AAXLO" class="aaxlo-logo" />
      </p>
    </footer>
  </div>
</template>
