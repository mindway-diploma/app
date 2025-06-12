import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const ExperiencesIcon = (props: any) => (
  <Svg
    width={30}
    height={24}
    viewBox="0 0 30 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_314_503)">
      <Path
        d="M28.8461 19.7223V7.36706C28.8461 5.66116 27.4686 4.27826 25.7692 4.27826H21.923C21.0733 4.27826 20.3846 3.5868 20.3846 2.73385C20.3846 1.88091 19.6958 1.18945 18.8461 1.18945H11.1538C10.3041 1.18945 9.61535 1.88091 9.61535 2.73385C9.61535 3.5868 8.92655 4.27826 8.07689 4.27826H4.23073C2.53139 4.27826 1.15381 5.66116 1.15381 7.36706V19.7223C1.15381 21.4282 2.53139 22.8111 4.23073 22.8111H25.7692C27.4686 22.8111 28.8461 21.4282 28.8461 19.7223Z"
        stroke={props.color ? props.color : "black"}
        strokeWidth={1.5}
      />
      <Path
        d="M19.6155 13.5443C19.6155 16.1033 17.5492 18.1775 15.0002 18.1775C12.4511 18.1775 10.3848 16.1033 10.3848 13.5443C10.3848 10.9854 12.4511 8.91113 15.0002 8.91113C17.5492 8.91113 19.6155 10.9854 19.6155 13.5443Z"
        stroke={props.color ? props.color : "black"}
        strokeWidth={1.5}
      />
    </G>
    <Defs>
      <ClipPath id="clip0_314_503">
        <Rect width={30} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default ExperiencesIcon;
