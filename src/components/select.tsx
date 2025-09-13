import { Portal } from '@gorhom/portal'
import { ChevronDown } from '@malberee/heroui-native'
import { rem } from 'nativewind'
import { useState } from 'react'
import { Dimensions, FlatList, Pressable, Text, View } from 'react-native'
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

  const ITEM_HEIGHT = rem.get() * 2 + rem.get() / 2

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
            className="pointer-events-box-none absolute left-0 top-full z-20 max-h-56 w-full"
            entering={FadeInUp.duration(100)}
            exiting={FadeOutUp.duration(100)}
          >
            <FlatList
              className="rounded-xl border border-default-200 bg-default-100"
              contentContainerStyle={{
                padding: rem.get() / 2,
              }}
              data={options}
              removeClippedSubviews
              initialScrollIndex={
                options.length >= 5
                  ? options.findIndex(
                      (option) => option.value === selectedOption,
                    )
                  : undefined
              }
              getItemLayout={(_, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
              })}
              renderItem={({ item: { label, value }, index }) => (
                <Pressable
                  key={value}
                  className={`h-8 flex-row items-center rounded-md px-2 transition-colors ${index !== options.length - 1 && 'mb-2'} ${value === selectedOption ? 'bg-default-200' : 'bg-transparent'}`}
                  onPress={() => {
                    setSelectedOption(value)
                    onValueChange?.(value)
                    setIsOpen(false)
                  }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    className="text-foreground"
                  >
                    {label}
                  </Text>
                </Pressable>
              )}
            />
          </Animated.View>
        </>
      ) : null}
    </View>
  )
}
