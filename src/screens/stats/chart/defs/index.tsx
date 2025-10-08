import type { FC } from 'react'
import {
  ClipPath,
  LinearGradient,
  Rect,
  Stop,
  Defs as SvgDefs,
} from 'react-native-svg'

import {
  POINT_RADIUS,
  POINT_STROKE_WIDTH,
  SELECTED_POINT_RADIUS,
} from '../constants'
import type { DataItem } from '../index'
import { useChart } from '../provider'
import { AnimatedLinearGradient } from './animated-linear-gradient'

interface DefsProps {
  data: DataItem[]
  selectedPoint: number | null
}

export const Defs: FC<DefsProps> = ({ data, selectedPoint }) => {
  const { y, width, height, colors } = useChart()

  const MASK_OFFSET =
    SELECTED_POINT_RADIUS - POINT_RADIUS - POINT_STROKE_WIDTH / 2

  return (
    <SvgDefs>
      <LinearGradient id="area-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
        <Stop offset="0%" stopColor={colors.default} stopOpacity={0.2} />
        <Stop offset="100%" stopColor={colors.default} stopOpacity={0} />
      </LinearGradient>
      <AnimatedLinearGradient
        id="cursor-gradient"
        x1="0%"
        x2="0%"
        y1="0%"
        y2="100%"
      >
        <Stop offset="0%" stopColor={colors.active} stopOpacity={0} />
        <Stop
          offset={
            selectedPoint !== null
              ? y(data[selectedPoint].value) / height
              : undefined
          }
          stopColor={colors.active}
          stopOpacity={1}
        />
        <Stop offset="100%" stopColor={colors.active} stopOpacity={0} />
      </AnimatedLinearGradient>

      <ClipPath id="grid-mask">
        <Rect
          x={SELECTED_POINT_RADIUS}
          y={SELECTED_POINT_RADIUS}
          width={width - SELECTED_POINT_RADIUS * 2}
          height={height - SELECTED_POINT_RADIUS * 2}
        />
      </ClipPath>
      <ClipPath id="points-mask">
        <Rect
          x={MASK_OFFSET}
          y={MASK_OFFSET}
          width={width - MASK_OFFSET * 2}
          height={height - MASK_OFFSET * 2}
        />
      </ClipPath>
    </SvgDefs>
  )
}
