import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const TrendsIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_314_484)">
      <Path
        d="M23.0767 12H0.922852"
        stroke={props.color ? props.color : "black"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M12 0.922852V23.0767"
        stroke={props.color ? props.color : "black"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M7.0874 7.05957L16.9265 16.9263"
        stroke={props.color ? props.color : "black"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M16.9128 7.05957L7.07373 16.9263"
        stroke={props.color ? props.color : "black"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_314_484">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default TrendsIcon;
