import { semanticColors } from 'merlo-ui'
import type { FC } from 'react'
import { G, Line } from 'react-native-svg'

import { useTheme } from '@providers'

import { AnimatedLine } from './animated-line'
import { SELECTED_POINT_RADIUS } from './constants'
import { type ExtraProps } from './index'

const STROKE_DASHARRAY = [6, 6]

export const Grid: FC<ExtraProps> = ({
  data,
  width,
  height,
  x,
  y,
  min,
  max,
}) => {
  const { current } = useTheme()

  const gridColor = semanticColors[current].default[200]!
  const ticks = Array.from({ length: 5 }, (_, i) => min + ((max - min) / 4) * i)

  return (
    <G clipPath="url(#grid-mask)">
      {data.map((_, index) => (
        <AnimatedLine
          key={`${index}-v-line`}
          x={x(index)}
          y1={SELECTED_POINT_RADIUS}
          y2={height - SELECTED_POINT_RADIUS}
          stroke={gridColor}
          strokeDasharray={STROKE_DASHARRAY}
        />
      ))}
      {ticks.map((item, index) => (
        <Line
          key={`${index}-h-line`}
          y={y(item)}
          x1={SELECTED_POINT_RADIUS}
          x2={width - SELECTED_POINT_RADIUS}
          stroke={gridColor}
          strokeDasharray={STROKE_DASHARRAY}
        />
      ))}
    </G>
  )
}
