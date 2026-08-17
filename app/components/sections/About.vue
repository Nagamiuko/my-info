<script setup>
import { parseList } from '#shared/contentDefaults'

const props = defineProps({
  content: { type: Object, required: true },
})
const c = computed(() => props.content || {})
const exp = computed(() => parseList(c.value.exp_lines))
const edu = computed(() => parseList(c.value.edu_lines))
const paragraphs = computed(() => parseList(c.value.text_lines))
</script>

<template>
  <section class="section" id="about">
    <div class="container">
      <SectionHead :eyebrow="c.eyebrow" :title="c.title" />
      <div class="about__grid">
        <div class="about__media">
          <img v-if="c.image_url" :src="c.image_url" :alt="c.title" />
        </div>
        <div class="about__content">
          <div class="about__cards">
            <div v-if="exp.length" class="info-card">
              <div class="info-card__icon">
                <Icon name="fa6-solid:briefcase" />
              </div>
              <h4>{{ c.exp_title || 'ประสบการณ์' }}</h4>
              <p v-for="(line, i) in exp" :key="i">{{ line }}</p>
            </div>
            <div v-if="edu.length" class="info-card">
              <div class="info-card__icon">
                <Icon name="fa6-solid:user-graduate" />
              </div>
              <h4>{{ c.edu_title || 'การศึกษา' }}</h4>
              <p v-for="(line, i) in edu" :key="i">{{ line }}</p>
            </div>
          </div>
          <div class="about__text">
            <p v-for="(para, i) in paragraphs" :key="i">{{ para }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>