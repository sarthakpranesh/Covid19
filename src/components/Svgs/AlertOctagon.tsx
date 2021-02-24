import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

const SvgAlertOctagon = (props: SvgProps) => {
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M7.86 2h8.28L22 7.86v8.28L16.14 22H7.86L2 16.14V7.86L7.86 2zM12 8v4M12 16h.01" />
    </Svg>
  )
}

export default SvgAlertOctagon
