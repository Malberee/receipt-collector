type Position = 'tl' | 'tr' | 'bl' | 'br'

export const makeCornerPath = (
  x: number,
  y: number,
  radius: number,
  spacing: number,
  lineLength: number,
  position: Position,
) => {
  if (position === 'tl') {
    return `
      M${x - spacing} ${y + lineLength + radius - spacing}
      v-${lineLength}
      A${radius} ${radius} 0 0 1 ${x + radius - spacing} ${y - spacing}
      h${lineLength}
    `
  }
  if (position === 'tr') {
    return `
      M${x + spacing} ${y + lineLength + radius - spacing}
      v-${lineLength}
      A${radius} ${radius} 0 0 0 ${x - radius + spacing} ${y - spacing}
      h-${lineLength}
    `
  }
  if (position === 'bl') {
    return `
      M${x - spacing} ${y - lineLength - radius + spacing}
      v${lineLength}
      A${radius} ${radius} 0 0 0 ${x + radius - spacing} ${y + spacing}
      h${lineLength}
    `
  }
  if (position === 'br') {
    return `
      M${x + spacing} ${y - lineLength - radius + spacing}
      v${lineLength}
      A${radius} ${radius} 0 0 1 ${x - radius + spacing} ${y + spacing}
      h-${lineLength}
    `
  }
  return ''
}
