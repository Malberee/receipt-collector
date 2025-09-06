import { View } from 'react-native'

import { Select } from '@components'

import { Option } from './option'

export const SettingList = () => {
  return (
    <View className="flex-col">
      <Option
        title="Language"
        endContent={
          <Select
            options={[
              { value: 'en', label: 'EN' },
              { value: 'ua', label: 'UA' },
            ]}
          />
        }
      />
      {/* <Option title="Option 2" endContent={<Select options={['1', '2']} />} />
      <Option title="Option 3" endContent={<Select options={['1', '2']} />} /> */}
    </View>
  )
}
