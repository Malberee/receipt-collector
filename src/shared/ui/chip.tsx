import {
  type ChipSlots,
  type ChipVariantProps,
  Chip as NextUIChip,
  type ChipProps as NextUIChipProps,
  type SlotsToClasses,
} from '@malberee/nextui-native'
import clsx from 'clsx'
import React, { type FC } from 'react'
import { Pressable } from 'react-native'

import { type Rarity, rarityColors } from '@shared/config'

interface ChipProps extends NextUIChipProps {
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
      <NextUIChip
        color={rarityColors[rarity]}
        variant={variant}
        classNames={{
          ...classNames,
          content: clsx('capitalize', classNames?.content),
        }}
      >
        {rarity}
      </NextUIChip>
    </Pressable>
  )
}
