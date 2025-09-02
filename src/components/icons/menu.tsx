import Svg, { Path, type SvgProps } from 'react-native-svg'

export const MenuIcon = (props: SvgProps) => {
  return (
    <Svg viewBox="0 0 24 24" width="24" height="24" fill="none" {...props}>
      <Path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M20 7H4M20 12H4M20 17H4"
      />
    </Svg>
  )
}
