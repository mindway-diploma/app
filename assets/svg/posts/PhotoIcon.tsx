import * as React from "react";
import Svg, { Path } from "react-native-svg";
const PhotoIcon = (props: any) => (
  <Svg
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.8886 8.81449H17.9015M2.33301 6.2219C2.33301 5.1905 2.74273 4.20135 3.47204 3.47204C4.20135 2.74273 5.1905 2.33301 6.2219 2.33301H21.7775C22.8089 2.33301 23.798 2.74273 24.5273 3.47204C25.2566 4.20135 25.6663 5.1905 25.6663 6.2219V21.7775C25.6663 22.8089 25.2566 23.798 24.5273 24.5273C23.798 25.2566 22.8089 25.6663 21.7775 25.6663H6.2219C5.1905 25.6663 4.20135 25.2566 3.47204 24.5273C2.74273 23.798 2.33301 22.8089 2.33301 21.7775V6.2219Z"
      stroke="#A3A3A3"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.33301 19.1846L8.81449 12.7032C10.0175 11.5456 11.5004 11.5456 12.7034 12.7032L19.1849 19.1846"
      stroke="#A3A3A3"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.5918 16.5922L17.8881 15.2959C19.0911 14.1383 20.574 14.1383 21.777 15.2959L25.6659 19.1848"
      stroke="#A3A3A3"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default PhotoIcon;
