import React, { type FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, View } from 'react-native'

import { RarityChip } from '@components'
import { type Rarity, rarityColors } from '@constants'

import { MarkIcon } from './mark-icon'

interface RaritiesProps {
  value?: Rarity[]
  onValueChange?: (value: Rarity[]) => void
}

const iconColors = {
  common: 'text-default-foreground',
  rare: 'text-primary-foreground',
  epic: 'text-secondary-foreground',
  mythic: 'text-danger-foreground',
  legendary: 'text-warning-foreground',
  none: 'text-default-foreground',
}

export const Rarities: FC<RaritiesProps> = ({ value = [], onValueChange }) => {
  const { t } = useTranslation()
  const [selectedRarities, setSelectedRarities] = useState<Rarity[]>(value)
  const rarities = Object.keys(rarityColors) as Rarity[]

  const handleSelect = (rarity: Rarity) => {
    let result = []

    if (selectedRarities.includes(rarity)) {
      result = selectedRarities.filter((r) => r !== rarity)
    } else {
      result = [...selectedRarities, rarity]
    }

    onValueChange?.(result)
    setSelectedRarities(result)
  }

  useEffect(() => {
    setSelectedRarities(value)
  }, [value])

  return (
    <View>
      <Text className="mb-0.5 text-foreground">{t('Rarity')}</Text>
      <View className="flex-row flex-wrap gap-2">
        {rarities.map((rarity) => (
          <RarityChip
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
