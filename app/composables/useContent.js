import { mergeContent } from '#shared/contentDefaults'

export function useContent() {
  const { data: rows, pending, refresh } = useAsyncData('site-content', () =>
    $fetch('/api/content').catch(() => [])
  )

  const content = computed(() => mergeContent(rows.value || []))

  async function saveSection(section, values) {
    await $fetch('/api/content', {
      method: 'POST',
      body: { section, values },
    })
    await refresh()
  }

  return { rows, content, pending, saveSection }
}