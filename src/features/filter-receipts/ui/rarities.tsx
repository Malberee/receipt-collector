import React, { type FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'

import { type Rarity as RarityType, rarityColors } from '@shared/config'
import { Chip } from '@shared/ui'

import { MarkIcon } from './mark-icon'

interface RaritiesProps {
  onValueChange: (value: RarityType[]) => void
}

const iconColors = {
  common: 'text-default-foreground',
  rare: 'text-primary-foreground',
  epic: 'text-secondary-foreground',
  mythic: 'text-danger-foreground',
  legendary: 'text-warning-foreground',
  none: 'text-default-foreground',
}

export const Rarities: FC<RaritiesProps> = ({ onValueChange }) => {
  const [selectedRarities, setSelectedRarities] = useState<RarityType[]>([])
  const rarities = Object.keys(rarityColors) as RarityType[]

  const handleSelect = (rarity: RarityType) => {
    if (selectedRarities.includes(rarity)) {
      setSelectedRarities(selectedRarities.filter((r) => r !== rarity))
    } else {
      setSelectedRarities([...selectedRarities, rarity])
    }
  }

  useEffect(() => {
    onValueChange(selectedRarities)
  }, [selectedRarities])

  return (
    <View>
      <Text className="mb-0.5 text-foreground">Rarity</Text>
      <View className="flex-row flex-wrap gap-2">
        {rarities.map((rarity) => (
          <Chip
            key={rarity}
            rarity={rarity}
            variant={selectedRarities.includes(rarity) ? 'solid' : 'flat'}
            onPress={() => handleSelect(rarity)}
            startContent={
              selectedRarities.includes(rarity) ? (
                <MarkIcon className={iconColors[rarity]} />
              ) : null
            }
          />
        ))}
      </View>
    </View>
  )
}
