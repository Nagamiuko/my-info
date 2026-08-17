export function useAdmin() {
  const { data: me, refresh: refreshMe } = useAsyncData('admin-me', () =>
    $fetch('/api/admin/me', {
      headers: useRequestHeaders(['cookie']),
    }).catch(() => ({ admin: false }))
  )

  const isAdmin = computed(() => me.value?.admin === true)

  async function login(username, password) {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: { username, password },
    })
    await refreshMe()
  }

  async function logout() {
    await $fetch('/api/admin/logout', { method: 'POST' })
    await refreshMe()
  }

  return { isAdmin, login, logout, refreshMe }
}