import type { FC } from 'react'
import { Text, View } from 'react-native'

type Chart = {
  name: string
  color: string
}

interface LegendProps {
  charts: Chart[]
}

export const Legend: FC<LegendProps> = ({ charts }) => {
  return (
    <View className="mt-4 flex-row justify-center gap-4">
      {charts.map(({ name, color }) => (
        <View key={name} className="flex-row items-center gap-2">
          <View
            className="size-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <Text className="text-foreground">{name}</Text>
        </View>
      ))}
    </View>
  )
}
