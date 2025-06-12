import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const GeneralIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_314_661)">
      <Path
        d="M19.7131 11.1119H18.0734V5.82384H12.7503V4.23644C12.7503 2.52663 11.3298 1.12744 9.59333 1.12744C7.85712 1.12744 6.43632 2.52635 6.43632 4.23644V5.82384H1.11328V22.8885H6.43632V20.8112C6.43632 19.1014 7.85683 17.7022 9.59333 17.7022C11.3296 17.7022 12.7503 19.1011 12.7503 20.8112V22.8885H18.0734V17.3299H19.7131C21.4493 17.3299 22.8701 15.931 22.8701 14.2209C22.8701 12.5108 21.4496 11.1119 19.7131 11.1119Z"
        stroke={props.color ? props.color : "black"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_314_661">
        <Rect width={24} height={24} fill={props.color ? props.color : "black"} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default GeneralIcon;
