<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
})
</script>

<template>
  <div class="section__head">
    <span v-if="eyebrow" class="section__eyebrow">{{ eyebrow }}</span>
    <h2 v-if="title" class="section__title">{{ title }}</h2>
  </div>
</template>