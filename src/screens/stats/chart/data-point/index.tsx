import { semanticColors } from 'merlo-ui'
import { type FC } from 'react'
import { Circle, G } from 'react-native-svg'

import { useTheme } from '@providers'

import {
  POINT_RADIUS,
  POINT_STROKE_WIDTH,
  SELECTED_POINT_RADIUS,
} from '../constants'
import type { ExtraProps } from '../index'
import { AnimatedCircle } from './animated-circle'

interface PointProps extends ExtraProps {
  index: number
  value: number
  onSelect: (index: number) => void
}

export const DataPoint: FC<PointProps> = ({
  colors,
  x,
  y,
  value,
  index,
  selectedPoint,
  onSelect,
}) => {
  const { current } = useTheme()

  return (
    <G>
      <AnimatedCircle
        x={x(index)}
        y={y(value)}
        r={selectedPoint === index ? SELECTED_POINT_RADIUS : 0}
        fill={colors.active}
        opacity={0.2}
      />

      <G clipPath="url(#points-mask)">
        <AnimatedCircle
          x={x(index)}
          y={y(value)}
          r={POINT_RADIUS}
          fill={selectedPoint === index ? colors.active : colors.default}
          stroke={semanticColors[current].default[50]}
          strokeWidth={POINT_STROKE_WIDTH}
        />
      </G>

      <Circle
        x={x(index)}
        y={y(value)}
        r={24}
        fill="none"
        onPressIn={() => onSelect(index)}
      />
    </G>
  )
}
