import type { FC, ReactNode } from 'react'
import { Text, View } from 'react-native'

interface OptionProps {
  title: string
  endContent?: ReactNode
}

export const Option: FC<OptionProps> = ({ title, endContent }) => {
  return (
    <View className="h-20 flex-row items-center justify-between border-b border-default-100 p-4">
      <View>
        <Text className="text-xl text-foreground">{title}</Text>
      </View>
      {endContent}
    </View>
  )
}
