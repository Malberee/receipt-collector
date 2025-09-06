import { Portal } from '@gorhom/portal'
import { ChevronDown } from '@malberee/heroui-native'
import { useState } from 'react'
import { Dimensions, Pressable, Text, View } from 'react-native'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

type Option<T extends string = string> = {
  label: string
  value: T
}
interface SelectProps<T extends string> {
  options: Option<T>[]
  defaultValue?: T
  onValueChange?: (value: T) => void
}

export const Select = <T extends string>({
  options,
  defaultValue,
  onValueChange,
}: SelectProps<T>) => {
  const { width, height } = Dimensions.get('screen')

  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
    defaultValue ?? options[0].value,
  )

  return (
    <View>
      <Pressable
        className="flex-row items-center gap-4 rounded-xl border border-default-200 bg-default-100 p-2"
        onPress={() => setIsOpen(true)}
      >
        <Text className="text-foreground">
          {options.find((option) => option.value === selectedOption)?.label}
        </Text>
        <View
          className="transition-transform"
          style={{ transform: [{ rotate: isOpen ? '180deg' : '0deg' }] }}
        >
          <ChevronDown className="text-default-500" width={16} height={16} />
        </View>
      </Pressable>

      {isOpen ? (
        <>
          <Portal hostName="select-portal">
            <Pressable
              className="absolute top-0 z-10"
              style={{ width, height }}
              onPress={() => setIsOpen(false)}
            />
          </Portal>
          <Animated.View
            className="pointer-events-box-none absolute bottom-0 left-0 z-20 w-full"
            entering={FadeInUp.duration(100)}
            exiting={FadeOutUp.duration(100)}
          >
            <View
              className="pt-1"
              style={{ transform: [{ translateY: '100%' }] }}
            >
              <View className="flex-col gap-2 rounded-xl border border-default-200 bg-default-100 p-2">
                {options.map(({ label, value }) => (
                  <Pressable
                    key={value}
                    className={`rounded-md px-2 py-1 transition-colors ${value === selectedOption ? 'bg-default-200' : 'bg-transparent'}`}
                    onPress={() => {
                      setSelectedOption(value)
                      onValueChange?.(value)
                      setIsOpen(false)
                    }}
                  >
                    <Text className="text-foreground">{label}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </Animated.View>
        </>
      ) : null}
    </View>
  )
}
