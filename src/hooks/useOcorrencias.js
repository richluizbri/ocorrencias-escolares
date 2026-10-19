import { useCallback, useEffect, useState } from 'react'
import { createSeed } from '../data/seed'
import { loadItems, saveItems } from '../lib/storage'
import { nowLocal, uid } from '../lib/format'

export function useOcorrencias() {
  const [items, setItems] = useState(() => loadItems() ?? createSeed())
  const [storageOk, setStorageOk] = useState(true)

  useEffect(() => {
    setStorageOk(saveItems(items))
  }, [items])

  const create = useCallback(
    data => {
      const seq = items.reduce((max, o) => Math.max(max, o.seq || 0), 0) + 1
      const item = { id: uid(), seq, ...data, updatedAt: nowLocal() }
      setItems(prev => [...prev, item])
      return item
    },
    [items]
  )

  const update = useCallback((id, patch) => {
    setItems(prev => prev.map(o => (o.id === id ? { ...o, ...patch, updatedAt: nowLocal() } : o)))
  }, [])

  const remove = useCallback(
    id => {
      const index = items.findIndex(o => o.id === id)
      if (index < 0) return null
      const item = items[index]
      setItems(prev => prev.filter(o => o.id !== id))
      return { item, index }
    },
    [items]
  )

  const restore = useCallback(({ item, index }) => {
    setItems(prev => {
      const next = [...prev]
      next.splice(index, 0, item)
      return next
    })
  }, [])

  const reset = useCallback(() => setItems(createSeed()), [])

  return { items, storageOk, create, update, remove, restore, reset }
}
