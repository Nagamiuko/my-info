<script setup>
const props = defineProps({
  content: { type: Object, default: null },
})
const { content: liveContent } = useContent()
const text = computed(
  () =>
    props.content?.text ||
    liveContent.value?.footer?.text ||
    'Copyright © 2024 Phutthisan KK. All Rights Reserved'
)
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <span class="footer__text">{{ text }}</span>
      <NuxtLink class="footer__admin-link" to="/web-admin">จัดการเว็บ</NuxtLink>
    </div>
  </footer>
</template>