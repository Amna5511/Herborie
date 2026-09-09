// Single source of truth for Herboria colors
// Used by jsPDF (which cannot access CSS variables)

const hexToRgb = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

export const COLORS = {
  parchment: hexToRgb('#F4EDD8'),
  ink:       hexToRgb('#1A1208'),
  sage:      hexToRgb('#4A6741'),
  rust:      hexToRgb('#8B4A2B'),
  muted:     hexToRgb('#8B7D6B'),
  cream:     hexToRgb('#FBF7EF'),
}