import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const CommentIcon = (props: any) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_368_242)">
      <Path
        d="M0.0336914 12.0903C0.0336914 4.72086 6.28124 -0.90205 13.718 0.120918C18.9833 0.845236 23.1438 5.01231 23.867 10.2855C24.8888 17.7334 19.2743 23.9899 11.9155 23.9899H1.30195C0.601716 23.9899 0.0340505 23.4214 0.0340505 22.7201V12.0903H0.0336914Z"
        fill="black"
      />
      <Path
        d="M7.63623 9.81836H16.3635"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <Path
        d="M7.63623 14.1816H16.3635"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_368_242">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default CommentIcon;
