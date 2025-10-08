import { semanticColors } from 'merlo-ui'
import { memo } from 'react'
import { Circle, G } from 'react-native-svg'

import { useTheme } from '@providers'

import {
  POINT_RADIUS,
  POINT_STROKE_WIDTH,
  SELECTED_POINT_RADIUS,
} from '../constants'
import { useChart } from '../provider'
import { AnimatedCircle } from './animated-circle'

interface PointProps {
  index: number
  value: number
  isSelected: boolean
  onSelect: (index: number) => void
}

export const DataPoint = memo<PointProps>(
  ({ value, index, isSelected, onSelect }) => {
    const { x, y, colors } = useChart()
    const { current } = useTheme()

    return (
      <G>
        <AnimatedCircle
          x={x(index)}
          y={y(value)}
          r={isSelected ? SELECTED_POINT_RADIUS : 0}
          fill={colors.active}
          opacity={0.2}
        />

        <G clipPath="url(#points-mask)">
          <AnimatedCircle
            x={x(index)}
            y={y(value)}
            r={POINT_RADIUS}
            fill={isSelected ? colors.active : colors.default}
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
  },
)
