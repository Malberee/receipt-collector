import { useRef, useState } from 'react'
import {
  type Camera,
  type CodeScanner,
  type CodeType,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera'

import { getScanArea, isWithinScanArea, mapScreenToFrame } from '@utils'

export type ScannerType = 'barcode' | 'qr'

const codeTypes: Record<string, CodeType[]> = {
  qr: ['qr'],
  barcode: ['ean-8', 'ean-13', 'code-128', 'code-39', 'code-93'],
}

export const useScanner = (
  type: ScannerType,
  onScan: (data: string) => void,
) => {
  const scanAreaSize = { width: 300, height: type === 'qr' ? 300 : 100 }

  const [enableTorch, setEnableTorch] = useState(false)
  const camera = useRef<Camera>(null)

  const scanAreaScreen = getScanArea(scanAreaSize.width, scanAreaSize.height)

  const onCodeScanned: CodeScanner['onCodeScanned'] = async (codes, frame) => {
    if (!codes[0].frame || !codes[0].value || camera.current === null) return

    frame = { width: frame.height, height: frame.width }
    const area = mapScreenToFrame(frame, scanAreaScreen)
    const isInside = isWithinScanArea(codes[0].frame, area)

    if (isInside) {
      onScan(codes[0].value)
    }
  }

  const device = useCameraDevice('back')!
  const codeScanner = useCodeScanner({
    codeTypes: codeTypes[type],
    onCodeScanned,
  })

  const cameraProps: Camera['props'] & { ref: Camera['ref'] } = {
    ref: camera,
    codeScanner,
    photoQualityBalance: 'speed',
    device,
    torch: enableTorch ? 'on' : 'off',
    isActive: true,
  }

  return {
    cameraProps,
    hasTorch: device.hasFlash || device.hasTorch,
    toggleTorch: () => setEnableTorch((prevState) => !prevState),
  }
}
