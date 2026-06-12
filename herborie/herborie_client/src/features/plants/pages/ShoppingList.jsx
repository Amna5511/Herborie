import { useAtom } from 'jotai'
import { shoppingListAtom, pendingItemsAtom, shoppingCountAtom } from '../atoms/recipe.atom'
import jsPDF from 'jspdf'
import { COLORS } from '../../../utils/colors'

const generatePDF = (shoppingList) => {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210
  const margin = 20
  let y = 0

  // Header block
  doc.setFillColor(...COLORS.ink)
  doc.rect(0, 0, W, 42, 'F')

  doc.setFont('times', 'italic')
  doc.setFontSize(9)
  doc.setTextColor(...COLORS.muted)
  doc.text('A BOTANICAL GARDEN', W / 2, 14, { align: 'center' })

  doc.setFont('times', 'bold')
  doc.setFontSize(26)
  doc.setTextColor(...COLORS.cream)
  doc.text('Herboria', W / 2, 26, { align: 'center' })

  doc.setFont('times', 'italic')
  doc.setFontSize(8)
  doc.setTextColor(...COLORS.muted)
  doc.text('Shopping List', W / 2, 35, { align: 'center' })

  y = 56

  // Date
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...COLORS.muted)
  const date = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  doc.text(date.toUpperCase(), margin, y)

  y += 5
  doc.setDrawColor(...COLORS.muted)
  doc.setLineWidth(0.2)
  doc.line(margin, y, W - margin, y)
  y += 10

  // Groups
  const grouped = shoppingList.reduce((acc, item) => {
    if (!acc[item.recipeTitle]) acc[item.recipeTitle] = []
    acc[item.recipeTitle].push(item)
    return acc
  }, {})

  Object.entries(grouped).forEach(([recipeTitle, items]) => {
    if (y > 265) { doc.addPage(); y = 20 }

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...COLORS.muted)
    const label = items[0].plantName
      ? `${recipeTitle.toUpperCase()}  —  ${items[0].plantName.toUpperCase()}`
      : recipeTitle.toUpperCase()
    doc.text(label, margin, y)
    y += 7

    items.forEach(item => {
      if (y > 270) { doc.addPage(); y = 20 }

      doc.setDrawColor(...COLORS.sage)
      doc.setLineWidth(0.3)
      doc.rect(margin, y - 3.2, 3.5, 3.5)

      if (item.checked) {
        doc.setDrawColor(...COLORS.sage)
        doc.setLineWidth(0.5)
        doc.line(margin + 0.5, y - 1.5, margin + 1.5, y - 0.3)
        doc.line(margin + 1.5, y - 0.3, margin + 3, y - 2.8)
      }

      doc.setFontSize(9.5)
      doc.setTextColor(...(item.checked ? COLORS.muted : COLORS.ink))
      const lines = doc.splitTextToSize(item.name, W - margin * 2 - 8)
      doc.text(lines, margin + 6, y)
      y += lines.length * 5.5 + 1
    })

    y += 8
    if (y < 265) {
      doc.setDrawColor(220, 217, 200)
      doc.setLineWidth(0.15)
      doc.line(margin, y - 4, W - margin, y - 4)
    }
  })

  // Footer on every page
  const pageCount = doc.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...COLORS.muted)
    doc.text(
      `Herboria  ·  King's American Dispensatory, 1898  ·  Page ${i} of ${pageCount}`,
      W / 2, 290, { align: 'center' }
    )
    doc.setDrawColor(...COLORS.muted)
    doc.setLineWidth(0.15)
    doc.line(margin, 285, W - margin, 285)
  }

  doc.save('herboria-shopping-list.pdf')
}

export const ShoppingList = () => {
  const [shoppingList, setShoppingList] = useAtom(shoppingListAtom)
  const [pendingItems] = useAtom(pendingItemsAtom)
  const [count] = useAtom(shoppingCountAtom)

  const toggle = (id) => {
    setShoppingList(prev =>
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    )
  }

  const remove = (id) => {
    setShoppingList(prev => prev.filter(item => item.id !== id))
  }

  const clearChecked = () => setShoppingList(prev => prev.filter(item => !item.checked))
  const clearAll = () => setShoppingList([])

  const grouped = shoppingList.reduce((acc, item) => {
    if (!acc[item.recipeTitle]) acc[item.recipeTitle] = []
    acc[item.recipeTitle].push(item)
    return acc
  }, {})

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">

      <div className="flex justify-between items-end mb-12">
        <div>
          <p className="font-body text-xs uppercase tracking-widest text-muted mb-3">Herboria</p>
          <h1 className="font-display text-5xl text-ink leading-tight">Shopping List</h1>
          {count > 0 && (
            <p className="font-body text-sm text-muted mt-2">
              {count} item{count > 1 ? 's' : ''} remaining
            </p>
          )}
        </div>

        {shoppingList.length > 0 && (
          <div className="flex gap-3 items-center flex-wrap justify-end">
            <button onClick={() => generatePDF(shoppingList)} className="btn">
              ↓ Download PDF
            </button>
            {shoppingList.some(i => i.checked) && (
              <button
                onClick={clearChecked}
                className="font-body text-xs uppercase tracking-widest text-muted border border-muted/30 px-4 py-2 hover:border-sage hover:text-sage transition-colors"
              >
                Clear checked
              </button>
            )}
            <button
              onClick={clearAll}
              className="font-body text-xs uppercase tracking-widest text-rust border border-rust/30 px-4 py-2 hover:bg-rust hover:text-cream transition-colors"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <div className="h-px bg-muted/30 mb-10" />

      {shoppingList.length === 0 ? (
        <div className="text-center py-20">
          <span className="font-display text-7xl text-muted/20">✦</span>
          <p className="font-body italic text-muted mt-6">Your list is empty.</p>
          <p className="font-body text-sm text-muted/60 mt-2">
            Add ingredients from a recipe to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(grouped).map(([recipeTitle, items]) => (
            <div key={recipeTitle}>
              <p className="font-body text-xs uppercase tracking-widest text-muted mb-4">
                {recipeTitle}
                {items[0].plantName && (
                  <span className="text-sage/60"> — {items[0].plantName}</span>
                )}
              </p>
              <div className="space-y-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 border border-muted/20 bg-cream hover:border-sage/30 transition-colors group"
                  >
                    <button
                      onClick={() => toggle(item.id)}
                      className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center transition-colors ${
                        item.checked
                          ? 'bg-sage border-sage text-cream'
                          : 'border-muted/40 hover:border-sage'
                      }`}
                    >
                      {item.checked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>

                    <p className={`font-body text-sm flex-1 transition-colors ${
                      item.checked ? 'line-through text-muted/40' : 'text-ink/80'
                    }`}>
                      {item.name}
                    </p>

                    <button
                      onClick={() => remove(item.id)}
                      className="font-body text-xs text-muted/30 hover:text-rust transition-colors opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}