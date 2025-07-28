import seedrandom from 'seedrandom'

import type { Rarity } from '@constants'

import { rarities } from '../constants'

export const getRarity = (seed: string): Rarity => {
  const rng = seedrandom(seed)

  const random = rng()

  const probabilities = rarities.map((rarity) => rarity.chance / 100)

  let cumulativeProbability = 0
  for (let i = 0; i < rarities.length; i++) {
    cumulativeProbability += probabilities[i]
    if (random <= cumulativeProbability) {
      return rarities[i].rarity
    }
  }

  return 'none'
}
