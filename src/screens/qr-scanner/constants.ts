import type { Rarity } from '@constants'

type Probability = {
  rarity: Rarity
  chance: number
}

export const rarities: Probability[] = [
  {
    rarity: 'common',
    chance: 50,
  },
  {
    rarity: 'rare',
    chance: 25,
  },
  {
    rarity: 'epic',
    chance: 15,
  },
  {
    rarity: 'mythic',
    chance: 7,
  },
  {
    rarity: 'legendary',
    chance: 3,
  },
]
