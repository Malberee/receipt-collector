import { cn } from 'merlo-ui'
import { rem } from 'nativewind'
import { type ReactNode, useEffect, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface TabsProps<T> {
  options: { value: T; label: string }[]
  value?: T
  onValueChange?: (value: T) => void
  renderOption?: (props: { label: string; value: T }) => ReactNode
}

export const Tabs = <T extends string>({
  value,
  options,
  onValueChange,
  renderOption,
}: TabsProps<T>) => {
  const [currentValue, setCurrentValue] = useState(value ?? options[0].value)
  const translateX = useSharedValue(0)

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: `${translateX.value}%` }],
  }))

  useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value)
      translateX.value = withTiming(
        options.findIndex((option) => option.value === value) * 100,
        { duration: 200 },
      )
    }
  }, [value])

  return (
    <View
      className="flex-1 flex-row rounded-medium bg-default-100 p-2"
      style={{ marginBottom: rem.get() }}
    >
      <Animated.View
        className="absolute left-2 top-2 h-full rounded-md bg-primary"
        style={[style, { width: `${100 / options.length}%` }]}
      />

      {options.map(({ value, label }, index) => (
        <Pressable
          key={value}
          className="flex-1 flex-row items-center justify-center"
          onPress={() => {
            onValueChange?.(value)
            setCurrentValue(value)
            translateX.value = withTiming(index * 100, { duration: 200 })
          }}
        >
          {renderOption ? (
            renderOption({ label, value })
          ) : (
            <Text
              className={cn(
                'text-xl capitalize text-foreground transition-colors duration-200',
                value === currentValue && 'text-white',
              )}
            >
              {label}
            </Text>
          )}
        </Pressable>
      ))}
    </View>
  )
}
