import { Skia } from '@shopify/react-native-skia'

type Position = 'tl' | 'tr' | 'bl' | 'br'

export const makeCornerPath = (
  x: number,
  y: number,
  radius: number,
  spacing: number,
  lineLength: number,
  position: Position,
) => {
  const path = Skia.Path.Make()

  if (position === 'tl') {
    path.moveTo(x - spacing, y + lineLength + radius - spacing)
    path.rLineTo(0, -lineLength)
    path.rArcTo(radius, radius, 0, true, false, radius, -radius)
    path.rLineTo(lineLength, 0)
  }
  if (position === 'tr') {
    path.moveTo(x + spacing, y + lineLength + radius - spacing)
    path.rLineTo(0, -lineLength)
    path.rArcTo(radius, radius, 0, true, true, -radius, -radius)
    path.rLineTo(-lineLength, 0)
  }
  if (position === 'bl') {
    path.moveTo(x - spacing, y - lineLength - radius + spacing)
    path.rLineTo(0, lineLength)
    path.rArcTo(radius, radius, 0, true, true, radius, radius)
    path.rLineTo(lineLength, 0)
  }
  if (position === 'br') {
    path.moveTo(x + spacing, y - lineLength - radius + spacing)
    path.rLineTo(0, lineLength)
    path.rArcTo(radius, radius, 0, true, false, -radius, radius)
    path.rLineTo(-lineLength, 0)
  }

  return path
}
