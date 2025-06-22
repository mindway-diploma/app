import * as React from "react";
import Svg, { Path } from "react-native-svg";
const CreatePostIcon = (props: any) => (
  <Svg
    width={26}
    height={25}
    viewBox="0 0 26 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path d="M2 12.5H24.1053H2ZM13.0526 2V23V2Z" fill="#73843D" />
    <Path
      d="M2 12.5H24.1053M13.0526 2V23"
      stroke="#73843D"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default CreatePostIcon;
