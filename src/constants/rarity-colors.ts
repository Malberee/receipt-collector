import type { BaseColors, ThemeColors } from 'merlo-ui'

export type Rarity =
  | 'none'
  | 'common'
  | 'rare'
  | 'epic'
  | 'mythic'
  | 'legendary'

export const rarityColors: Record<
  Rarity,
  keyof Omit<ThemeColors, keyof BaseColors>
> = {
  common: 'default',
  rare: 'primary',
  epic: 'secondary',
  mythic: 'danger',
  legendary: 'warning',
  none: 'default',
}
