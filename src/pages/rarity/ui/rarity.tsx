import { router, useLocalSearchParams } from 'expo-router'
import { cssInterop } from 'nativewind'
import React from 'react'
import { Pressable, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import type { Rarity as RarityType } from '@shared/config'

import { Blobs } from './blobs'

type Rarities = Exclude<RarityType, 'none'>

cssInterop(Blobs, {
  color: {
    target: 'color',
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const Rarity = () => {
  const { rarity, id } = useLocalSearchParams<{
    rarity: Rarities
    id: string
  }>()
  const { top, bottom } = useSafeAreaInsets()

  const colors: Record<Rarities, string> = {
    common: 'text-default',
    rare: 'text-primary',
    epic: 'text-secondary',
    mythic: 'text-danger',
    legendary: 'text-warning',
  }

  return (
    <Pressable
      onPress={() => router.replace(`/${id}`)}
      className="-mx-4 flex-1 flex-row items-center justify-center"
      style={{ marginTop: -top, marginBottom: -bottom }}
    >
      <Text
        className={`text-5xl font-bold uppercase tracking-widest ${colors[rarity]}`}
      >
        {rarity}
      </Text>
      <Blobs color={colors[rarity]} />
    </Pressable>
  )
}
