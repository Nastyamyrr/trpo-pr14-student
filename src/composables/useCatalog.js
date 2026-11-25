import { computed, ref } from 'vue'
import rawItems from '../../dataset/broken_items.json'
import { filterItems, getItemStats, normalizeItems } from '../utils/items'

export function useCatalog() {
  const items = ref(normalizeItems(rawItems))
  const query = ref('')
  const status = ref('all')
  const error = ref('')
  const loading = ref(false)

  // Производный список не хранится отдельно и не синхронизируется вручную.
  const visibleItems = computed(() => filterItems(items.value, query.value, status.value))
  const stats = computed(() => getItemStats(items.value))

  function toggleItem(id) {
    items.value = items.value.map((item) =>
      item.id === id ? { ...item, active: !item.active } : item
    )
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  function addItem(title) {
    const cleanTitle = String(title ?? '').trim()
    if (!cleanTitle) return false
    const nextId = `user-${Date.now()}`
    items.value = [...items.value, { id: nextId, title: cleanTitle, active: true }]
    return true
  }

  function showDemoError() {
    error.value = 'Демонстрационная ошибка загрузки. Данные сохранены на странице.'
  }

  function clearError() {
    error.value = ''
  }

  return {
    items, query, status, error, loading,
    visibleItems, stats, toggleItem, removeItem, addItem,
    showDemoError, clearError
  }
}
