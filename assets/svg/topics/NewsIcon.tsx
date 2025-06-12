import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
const NewsIcon = (props: any) => (
  <Svg
    width={19}
    height={24}
    viewBox="0 0 19 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#clip0_314_477)">
      <Path
        d="M15.9928 5.29053H3.0075C1.75586 5.29053 0.741211 6.24118 0.741211 7.41387V21.1936C0.741211 22.3663 1.75586 23.317 3.0075 23.317H15.9928C17.2445 23.317 18.2591 22.3663 18.2591 21.1936V7.41387C18.2591 6.24118 17.2445 5.29053 15.9928 5.29053Z"
        stroke={props.color ? props.color : "black"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
      <Path
        d="M0.997584 6.13179C0.966926 5.92618 0.92457 5.62647 0.883826 5.2625C0.846311 4.92839 0.827754 4.76171 0.820897 4.61166C0.801534 4.20007 0.771682 3.57305 1.12425 3.04769C1.47117 2.53065 2.04884 2.32051 2.353 2.23736L13.1439 0.650717C13.6638 0.57437 14.1741 0.739914 14.5783 1.06911C15.125 1.51434 15.3012 2.11982 15.3783 2.47132C15.5142 3.09191 15.7534 3.98086 15.8313 5.13059"
        stroke={props.color ? props.color : "black"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
      />
      <Path
        d="M4.87305 12.042H14.7252"
        stroke={props.color ? props.color : "black"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M5.85791 14.811H13.7397"
        stroke={props.color ? props.color : "black"}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_314_477">
        <Rect width={19} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default NewsIcon;
