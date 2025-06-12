import * as React from "react";
import Svg, { Path } from "react-native-svg";
const NotificationsIcon = (props: any) => (
  <Svg
    width={75}
    height={40}
    viewBox="0 0 75 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M50.706 28.8851L49.3394 26.7729C46.9788 23.2941 45.7363 19.1941 45.7363 14.9699C45.7363 10.4972 42.7545 6.89415 38.7788 5.65172C38.406 4.53354 37.2878 3.78809 36.0454 3.78809C34.803 3.78809 33.6848 4.53354 33.3121 5.65172C29.3363 6.89415 26.3545 10.4972 26.3545 14.9699C26.3545 19.1941 25.1121 23.2941 22.7515 26.7729L21.3848 28.8851C20.7636 29.879 21.3848 31.1214 22.6272 31.1214H49.4636C50.706 31.1214 51.3272 29.879 50.706 28.8851Z"
      stroke="#3D3D3D"
      strokeWidth={2.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M41.0151 31.1211C41.0151 33.8544 38.7787 36.0908 36.0454 36.0908C33.312 36.0908 31.0757 33.8544 31.0757 31.1211"
      stroke="#3D3D3D"
      strokeWidth={2.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default NotificationsIcon;
