<script setup>
const { content } = useContent()

useSeoMeta({
  title: 'Phutthisan Kongkha | Portfolio',
  description: 'โปรไฟล์ของนักพัฒนาเว็บ (Frontend Developer)',
})
</script>

<template>
  <div>
    <Nav />
    <main>
      <SectionsHero :content="content.hero" />
      <SectionsAbout :content="content.about" />
      <SectionsExperience :content="content.experience" />
      <SectionsProjects :content="content.projects" />
      <SectionsContact :content="content.contact" />
    </main>
    <Footer />
  </div>
</template>