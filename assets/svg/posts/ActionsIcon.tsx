import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const ActionsIcon = (props: any) => (
  <Svg
    width={27}
    height={5}
    viewBox="0 0 27 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={24.5} cy={2.5} r={2.5} fill="black" />
    <Circle cx={13.5} cy={2.5} r={2.5} fill="black" />
    <Circle cx={2.5} cy={2.5} r={2.5} fill="black" />
  </Svg>
);
export default ActionsIcon;
