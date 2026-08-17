<script setup>
const props = defineProps({
  name: { type: String, default: '' },
})

const icons = {
  HTML: 'simple-icons:html5',
  CSS: 'simple-icons:css3',
  SASS: 'simple-icons:sass',
  JavaScript: 'simple-icons:javascript',
  'React JS': 'simple-icons:react',
  'Node JS': 'simple-icons:nodedotjs',
  'Express JS': 'simple-icons:express',
  MongoDB: 'simple-icons:mongodb',
  MySQL: 'simple-icons:mysql',
}
const icon = computed(() => icons[props.name] || null)
</script>

<template>
  <Icon v-if="icon" :name="icon" />
</template>