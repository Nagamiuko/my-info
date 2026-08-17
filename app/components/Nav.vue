<script setup>
import { parseJson } from '#shared/contentDefaults'

const props = defineProps({
  content: { type: Object, default: null },
})
const { content: liveContent } = useContent()
const open = ref(false)

const nav = computed(() => props.content || liveContent.value?.nav || {})
const title = computed(() => nav.value.title || 'My Profile')
const menu = computed(() =>
  parseJson(nav.value.menu_items, [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ])
)
const initials = computed(() =>
  title.value
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
)
</script>

<template>
  <header class="nav">
    <div class="nav__inner">
      <a href="#top" class="nav__logo">
        <span class="nav__logo-mark">{{ initials }}</span>
        <span>{{ title }}</span>
      </a>
      <ul class="nav__links">
        <li v-for="item in menu" :key="item.id">
          <a :href="`#${item.id}`">{{ item.label }}</a>
        </li>
      </ul>
      <button class="nav__burger" aria-label="Toggle menu" @click="open = !open">
        <Icon :name="open ? 'fa6-solid:xmark' : 'fa6-solid:bars'" />
      </button>
    </div>
  </header>
  <nav v-if="open" class="nav__mobile" @click="open = false">
    <a v-for="item in menu" :key="item.id" :href="`#${item.id}`">{{ item.label }}</a>
  </nav>
</template>