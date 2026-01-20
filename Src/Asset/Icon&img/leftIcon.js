import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import colors from "../Colors/colors"
const Lefticon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={42}
    fill="none"
    {...props}
  >
    <Path
      stroke="#555B55"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M30 36 18 24l12-12"
    />
  </Svg>
)
export default Lefticon
