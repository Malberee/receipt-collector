import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'

export const usePickImage = (defaultPicture: string = '') => {
  const [pictureSource, setPictureSource] = useState(defaultPicture)

  const launchLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    })

    if (!result.canceled) {
      setPictureSource(result.assets[0].uri)
    }
  }

  return { pictureSource, launchLibrary }
}
