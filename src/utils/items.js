// Нормализация защищает интерфейс от отсутствующих и некорректных полей.
export function normalizeItems(items) {
  if (!Array.isArray(items)) return []

  return items
    .filter((item) => item && typeof item === 'object')
    .map((item, index) => ({
      id: item.id ?? `generated-${index}`,
      title: typeof item.title === 'string' && item.title.trim()
        ? item.title.trim()
        : 'Без названия',
      active: Boolean(item.active)
    }))
}

export function filterItems(items, query = '', status = 'all') {
  const normalizedQuery = String(query).trim().toLocaleLowerCase('ru')

  return normalizeItems(items).filter((item) => {
    const matchesQuery = item.title.toLocaleLowerCase('ru').includes(normalizedQuery)
    const matchesStatus = status === 'all'
      || (status === 'active' && item.active)
      || (status === 'inactive' && !item.active)

    return matchesQuery && matchesStatus
  })
}

export function getItemStats(items) {
  const safeItems = normalizeItems(items)
  const active = safeItems.filter((item) => item.active).length
  return {
    total: safeItems.length,
    active,
    inactive: safeItems.length - active,
    invalidTitles: safeItems.filter((item) => item.title === 'Без названия').length
  }
}
