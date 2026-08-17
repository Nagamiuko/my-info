<script setup>
import { parseList } from '#shared/contentDefaults'

const props = defineProps({
  content: { type: Object, required: true },
})
const c = computed(() => props.content || {})
const frontend = computed(() => parseList(c.value.frontend_skills))
const backend = computed(() => parseList(c.value.backend_skills))
</script>

<template>
  <section class="section section--alt" id="experience">
    <div class="container">
      <SectionHead :eyebrow="c.eyebrow" :title="c.title" />
      <div class="skills__grid">
        <div v-if="frontend.length" class="skill-card">
          <div class="skill-card__head">
            <span class="skill-card__icon">
              <Icon name="fa6-solid:paint-roller" />
            </span>
            <h3>{{ c.frontend_title || 'Frontend Developer' }}</h3>
          </div>
          <div class="skill-pills">
            <span v-for="skill in frontend" :key="skill" class="pill">
              <SectionsSkillIcon :name="skill" />
              {{ skill }}
            </span>
          </div>
        </div>
        <div v-if="backend.length" class="skill-card">
          <div class="skill-card__head">
            <span class="skill-card__icon">
              <Icon name="fa6-solid:server" />
            </span>
            <h3>{{ c.backend_title || 'Backend Developer' }}</h3>
          </div>
          <div class="skill-pills">
            <span v-for="skill in backend" :key="skill" class="pill">
              <SectionsSkillIcon :name="skill" />
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>