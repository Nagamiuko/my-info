<script setup>
import { parseJson } from '#shared/contentDefaults'

const props = defineProps({
  content: { type: Object, required: true },
})
const c = computed(() => props.content || {})
const projects = computed(() => parseJson(c.value.items))
</script>

<template>
  <section class="section" id="projects">
    <div class="container">
      <SectionHead :eyebrow="c.eyebrow" :title="c.title" />
      <div class="projects__grid">
        <article v-for="(project, i) in projects" :key="i" class="project-card">
          <div v-if="project.image_url" class="project-card__img">
            <img :src="project.image_url" :alt="project.title" />
          </div>
          <div class="project-card__body">
            <h3>{{ project.title }}</h3>
            <p v-if="project.description">{{ project.description }}</p>
            <div class="project-card__actions">
              <a
                v-if="project.github_url"
                class="btn btn--ghost btn--sm"
                :href="project.github_url"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="simple-icons:github" />
                {{ project.github_label || 'GitHub' }}
              </a>
              <a
                v-if="project.demo_url"
                class="btn btn--primary btn--sm"
                :href="project.demo_url"
                target="_blank"
                rel="noreferrer"
              >
                <Icon name="fa6-solid:arrow-up-right-from-square" />
                {{ project.demo_label || 'Live Demo' }}
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>