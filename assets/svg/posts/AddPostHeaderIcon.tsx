import * as React from "react";
import Svg, { Path } from "react-native-svg";
const AddPostHeaderIcon = (props: any) => (
  <Svg
    width={26}
    height={25}
    viewBox="0 0 26 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M2 12.5H24M13 2V23"
      stroke="#FF9C01"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default AddPostHeaderIcon;
