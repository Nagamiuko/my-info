<script setup>
defineProps({
  content: { type: Object, required: true },
})
</script>

<template>
  <section class="hero" id="top">
    <div class="hero__blob hero__blob--1" />
    <div class="hero__blob hero__blob--2" />
    <div class="container hero__grid">
      <div class="hero__content">
        <p v-if="content.greeting" class="hero__greeting">{{ content.greeting }}</p>
        <h1 v-if="content.name" class="hero__name">{{ content.name }}</h1>
        <p v-if="content.role" class="hero__role">{{ content.role }}</p>
        <p v-if="content.role_en" class="hero__role">{{ content.role_en }}</p>
        <p v-if="content.description" class="hero__desc">{{ content.description }}</p>
        <div class="hero__actions">
          <a
            v-if="content.btn_cv_url"
            class="btn btn--primary"
            :href="content.btn_cv_url"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="fa6-solid:download" />
            {{ content.btn_cv_label || 'ดาวน์โหลด CV' }}
          </a>
          <a class="btn btn--ghost" href="#contact">{{ content.btn_contact_label || 'ข้อมูลติดต่อ' }}</a>
          <a
            v-if="content.github_url"
            class="btn btn--ghost"
            :href="content.github_url"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="simple-icons:github" />
            {{ content.btn_github_label || 'Git' }}
          </a>
        </div>
      </div>
      <div class="hero__media">
        <div v-if="content.avatar_url" class="avatar-ring">
          <img :src="content.avatar_url" :alt="content.name || 'profile'" />
        </div>
      </div>
    </div>
  </section>
</template>