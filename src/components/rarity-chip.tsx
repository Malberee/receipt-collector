import clsx from 'clsx'
import {
  type ChipSlots,
  type ChipVariantProps,
  Chip as HeroUIChip,
  type ChipProps as HeroUIChipProps,
  type SlotsToClasses,
} from 'merlo-ui'
import React, { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable } from 'react-native'

import { type Rarity, rarityColors } from '@constants'

interface ChipProps extends HeroUIChipProps {
  rarity?: Rarity
  classNames?: SlotsToClasses<ChipSlots>
  variant?: ChipVariantProps['variant']
  onPress?: () => void
}

export const RarityChip: FC<ChipProps> = ({
  rarity,
  classNames,
  variant,
  onPress,
  ...props
}) => {
  const { t } = useTranslation()

  return !rarity ? null : (
    <Pressable onPress={onPress}>
      <HeroUIChip
        color={rarityColors[rarity]}
        variant={variant}
        classNames={{
          ...classNames,
          content: clsx('capitalize', classNames?.content),
        }}
        {...{ ...props, ref: undefined }}
      >
        {t(rarity)}
      </HeroUIChip>
    </Pressable>
  )
}
