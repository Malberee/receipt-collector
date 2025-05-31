import type { BaseColors, ThemeColors } from '@malberee/heroui-native'

export type Rarity = 'common' | 'rare' | 'epic' | 'mythic' | 'legendary'

export const rarityColors: Record<
  Rarity,
  keyof Omit<ThemeColors, keyof BaseColors>
> = {
  common: 'default',
  rare: 'primary',
  epic: 'secondary',
  mythic: 'danger',
  legendary: 'warning',
}
