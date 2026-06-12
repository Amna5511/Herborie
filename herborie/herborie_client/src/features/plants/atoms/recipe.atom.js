import { atom } from 'jotai'

export const recipesAtom = atom([])

export const shoppingListAtom = atom([])

export const pendingItemsAtom = atom(
  (get) => get(shoppingListAtom).filter(item => !item.checked)
)

export const shoppingCountAtom = atom(
  (get) => get(pendingItemsAtom).length
)