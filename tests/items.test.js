import { describe, expect, it } from 'vitest'
import { filterItems, getItemStats, normalizeItems } from '../src/utils/items'

const sample = [
  { id: 1, title: 'OK', active: true },
  { id: 2, active: false },
  { id: 3, title: null, active: true }
]

describe('normalizeItems', () => {
  it('fills missing and null titles without throwing', () => {
    expect(normalizeItems(sample).map((item) => item.title))
      .toEqual(['OK', 'Без названия', 'Без названия'])
  })

  it('returns an empty array for invalid source data', () => {
    expect(normalizeItems(null)).toEqual([])
  })
})

describe('filterItems', () => {
  it('filters by query and status', () => {
    expect(filterItems(sample, 'ok', 'active')).toHaveLength(1)
  })

  it('does not fail when query is empty', () => {
    expect(filterItems(sample, '', 'all')).toHaveLength(3)
  })
})

describe('getItemStats', () => {
  it('counts total, active and normalized titles', () => {
    expect(getItemStats(sample)).toEqual({
      total: 3, active: 2, inactive: 1, invalidTitles: 2
    })
  })
})
