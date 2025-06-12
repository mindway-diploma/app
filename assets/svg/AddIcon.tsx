import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const AddIcon = (props: any) => (
  <Svg
    width={90}
    height={90}
    viewBox="0 0 90 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle
      cx={45}
      cy={45}
      r={40}
      fill="#3D3D3D"
      stroke="#EDEDEE"
      strokeWidth={10}
      strokeLinejoin="round"
    />
    <Path
      d="M45 27L45 63"
      stroke="#FF9C01"
      strokeWidth={4.5}
      strokeLinecap="round"
    />
    <Path
      d="M62 45L26 45"
      stroke="#FF9C01"
      strokeWidth={4.5}
      strokeLinecap="round"
    />
  </Svg>
);
export default AddIcon;
