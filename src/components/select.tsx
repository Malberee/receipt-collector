import { Portal } from '@gorhom/portal'
import { ChevronDown } from '@malberee/heroui-native'
import { type FC, useState } from 'react'
import { Dimensions, Pressable, Text, View } from 'react-native'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

interface SelectProps {
  options: string[]
  onValueChange?: (value: string) => void
}

export const Select: FC<SelectProps> = ({ options, onValueChange }) => {
  const { width, height } = Dimensions.get('screen')

  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])

  return (
    <View>
      <Pressable
        className="flex-row items-center gap-4 rounded-xl border border-default-200 bg-default-100 p-2"
        onPress={() => setIsOpen(true)}
      >
        <Text className="text-foreground">{selectedOption}</Text>
        <ChevronDown className="text-default-500" width={16} height={16} />
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
            className="absolute bottom-0 left-0 z-20 w-full"
            entering={FadeInUp.duration(100)}
            exiting={FadeOutUp.duration(100)}
          >
            <View
              className="pt-1"
              style={{ transform: [{ translateY: '100%' }] }}
            >
              <View className="flex-col gap-2 rounded-xl border border-default-200 bg-default-100 p-2">
                {options.map((option) => (
                  <Pressable
                    key={option}
                    className={`rounded-md px-2 py-1 transition-colors ${option === selectedOption ? 'bg-default-200' : 'bg-transparent'}`}
                    onPress={() => {
                      setSelectedOption(option)
                      onValueChange?.(option)
                      setIsOpen(false)
                    }}
                  >
                    <Text className="text-foreground">{option}</Text>
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
