import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CloseIcon = (props: any) => (
  <Svg
    width={15}
    height={16}
    viewBox="0 0 15 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M1.92285 12.723L12.0029 1.92297"
      stroke="white"
      strokeWidth={1.69231}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.92285 1.92297L12.0029 12.723"
      stroke="white"
      strokeWidth={1.69231}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CloseIcon;
