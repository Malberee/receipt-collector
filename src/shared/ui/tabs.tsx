import { cn } from '@malberee/heroui-native'
import { rem } from 'nativewind'
import { useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface TabsProps<T> {
  value?: T
  values: T[]
  onValueChange: (value: T) => void
}

export const Tabs = <T extends string>({
  value: _value,
  values,
  onValueChange,
}: TabsProps<T>) => {
  const [value, setValue] = useState(_value ?? values[0])
  const translateX = useSharedValue(0)

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }))

  useEffect(() => {
    setValue(value)
  }, [_value])

  return (
    <View
      className="flex-row rounded-medium bg-default-100 p-2"
      style={{ marginBottom: rem.get() }}
    >
      <Animated.View
        className="absolute left-2 top-2 h-full rounded-md bg-primary"
        style={[style, { width: `${100 / values.length}%` }]}
      />

      {values.map((value, index) => (
        <Pressable
          key={value}
          className="flex-1 flex-row items-center justify-center py-4"
          onPress={() => {
            onValueChange(value)
            setValue(value)
            translateX.value = withTiming(index * 100, { duration: 200 })
          }}
        >
          <Text
            className={cn(
              'text-xl capitalize text-foreground transition-colors duration-200',
              _value === value && 'text-white',
            )}
          >
            {value}
          </Text>
        </Pressable>
      ))}
    </View>
  )
}
