import React from 'react'
import Svg, { Path, type SvgProps } from 'react-native-svg'

function ScannerIcon(props: SvgProps) {
  return (
    <Svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9 22C4 22 2 20 2 15M15 22C20 22 22 20 22 15M22 9C22 4 20 2 15 2M9 2C4 2 2 4 2 9"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M1 12H23"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  )
}

export default ScannerIcon
