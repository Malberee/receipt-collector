import {
  type ChipSlots,
  type ChipVariantProps,
  Chip as HeroUIChip,
  type ChipProps as HeroUIChipProps,
  type SlotsToClasses,
} from '@malberee/heroui-native'
import clsx from 'clsx'
import React, { type FC } from 'react'
import { Pressable } from 'react-native'

import { type Rarity, rarityColors } from '@shared/config'

interface ChipProps extends HeroUIChipProps {
  rarity?: Rarity
  classNames?: SlotsToClasses<ChipSlots>
  variant?: ChipVariantProps['variant']
  onPress?: () => void
}

export const Chip: FC<ChipProps> = ({
  rarity,
  classNames,
  variant,
  onPress,
}) => {
  return !rarity ? null : (
    <Pressable onPress={onPress}>
      <HeroUIChip
        color={rarityColors[rarity]}
        variant={variant}
        classNames={{
          ...classNames,
          content: clsx('capitalize', classNames?.content),
        }}
      >
        {rarity}
      </HeroUIChip>
    </Pressable>
  )
}
