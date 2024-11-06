import {
  type ChipSlots,
  Chip as NextUIChip,
  type ChipProps as NextUIChipProps,
  type SlotsToClasses,
} from '@malberee/nextui-native'
import clsx from 'clsx'
import React, { type FC } from 'react'

import { type Rarity, rarityColors } from '@shared/config'

interface ChipProps extends NextUIChipProps {
  rarity?: Rarity
  classNames?: SlotsToClasses<ChipSlots>
}

export const Chip: FC<ChipProps> = ({ rarity, classNames }) => {
  return !rarity ? null : (
    <NextUIChip
      color={rarityColors[rarity]}
      classNames={{
        ...classNames,
        content: clsx('capitalize', classNames?.content),
      }}
    >
      {rarity}
    </NextUIChip>
  )
}
