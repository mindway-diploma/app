import * as React from "react";
import Svg, { Path } from "react-native-svg";
const ReplyCommentIcon = (props: any) => (
  <Svg
    width={15}
    height={15}
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.15327 5.7247L5.83768 1.62617C6.20033 1.2644 6.62386 1.20352 6.9865 1.56617V4.3297C7.07121 4.32882 7.14533 4.32882 7.18856 4.32882C11.6144 4.32882 14.8986 7.47264 14.8986 11.7494C14.8986 13.2388 14.2156 12.6962 13.9306 12.1765C12.5877 9.72352 10.2274 8.0497 7.15327 8.0497C7.11709 8.0497 7.05533 8.05058 6.98562 8.05058V10.755C6.62297 11.1168 6.15533 11.0735 5.8368 10.815L1.15239 7.03587C0.791505 6.67411 0.791505 6.08734 1.15327 5.7247Z"
      fill="#808080"
    />
  </Svg>
);
export default ReplyCommentIcon;
