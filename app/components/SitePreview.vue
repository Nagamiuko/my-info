<script setup>
const props = defineProps({
  sections: { type: Object, required: true },
  activeSection: { type: String, default: '' },
})

const sectionClass = (id) => ({
  'site-preview__wrap': true,
  'site-preview__wrap--active': props.activeSection === id,
})
</script>

<template>
  <div class="site-preview">
    <div class="site-preview__bar">
      <span class="site-preview__dot" />
      <span class="site-preview__dot" />
      <span class="site-preview__dot" />
      <span class="site-preview__url">ดูตัวอย่างสด (ยังไม่บันทึก)</span>
    </div>
    <div class="site-preview__device">
      <Nav :content="sections.nav" />
      <main>
        <div :class="sectionClass('hero')">
          <SectionsHero :content="sections.hero" />
        </div>
        <div :class="sectionClass('about')">
          <SectionsAbout :content="sections.about" />
        </div>
        <div :class="sectionClass('experience')">
          <SectionsExperience :content="sections.experience" />
        </div>
        <div :class="sectionClass('projects')">
          <SectionsProjects :content="sections.projects" />
        </div>
        <div :class="sectionClass('contact')">
          <SectionsContact :content="sections.contact" />
        </div>
      </main>
      <Footer :content="sections.footer" />
    </div>
  </div>
</template>