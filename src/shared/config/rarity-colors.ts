import type { BaseColors, ThemeColors } from '@malberee/nextui-native'

export type Rarity =
  | 'common'
  | 'rare'
  | 'epic'
  | 'mythic'
  | 'legendary'
  | 'none'

export const rarityColors: Record<
  Exclude<Rarity, 'none'>,
  keyof Omit<ThemeColors, keyof BaseColors>
> = {
  common: 'default',
  rare: 'primary',
  epic: 'secondary',
  mythic: 'danger',
  legendary: 'warning',
}
