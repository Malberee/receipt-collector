import { cssInterop } from 'nativewind'
import React, { type FC } from 'react'
import Svg, { Path } from 'react-native-svg'

interface BlobsProps {
  color: string
}

cssInterop(Svg, {
  className: {
    target: 'style',
  },
})

export const Blobs: FC<BlobsProps> = ({ color }) => {
  return (
    <>
      <Svg
        className="absolute right-0 top-0"
        width="236"
        height="288"
        viewBox="0 0 236 288"
        fill="none"
      >
        <Path
          d="M236 287.212C209.509 281.007 182.945 274.713 168.972 251.222C154.998 227.731 153.616 186.954 131.637 174.987C109.658 163.02 67.1555 179.774 45.2494 168.782C23.3433 157.79 22.0333 119.051 17.9578 86.2524C13.8822 53.5421 7.04111 26.771 0.199997 0H236V287.212Z"
          fill={color}
        />
      </Svg>

      <Svg
        className="absolute bottom-0 left-0"
        width="236"
        height="288"
        viewBox="0 0 236 288"
        fill="none"
      >
        <Path
          d="M0 0.787476C22.7794 20.0236 45.4861 39.2598 61.6428 56.9889C77.7267 74.7181 87.1878 90.9403 114.188 96.525C141.262 102.021 185.802 96.8796 190.751 119.218C195.699 141.468 161.057 191.199 161.931 223.909C162.877 256.619 199.338 272.31 235.8 288H0V0.787476Z"
          fill={color}
        />
      </Svg>
    </>
  )
}
