import * as React from "react";
import Svg, {
  Circle,
  Rect,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
const PostsHeaderIcon = (props: any) => (
  <Svg
    width={59}
    height={59}
    viewBox="0 0 59 59"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={29.5} cy={29.5} r={29.5} fill="url(#paint0_linear_1021_3478)" />
    <Rect x={9.55273} y={19} width={40.8939} height={21.4693} fill="#C1E3FF" />
    <Path
      d="M44.7729 24.4166H31.2271C30.5494 24.4166 30 24.966 30 25.6437V27.1896C30 27.8672 30.5494 28.4166 31.2271 28.4166H44.7729C45.4506 28.4166 46 27.8672 46 27.1896V25.6437C46 24.966 45.4506 24.4166 44.7729 24.4166Z"
      fill="#558EFF"
    />
    <Path
      d="M44.7729 31.4166H31.2271C30.5494 31.4166 30 31.966 30 32.6437V34.1896C30 34.8672 30.5494 35.4166 31.2271 35.4166H44.7729C45.4506 35.4166 46 34.8672 46 34.1896V32.6437C46 31.966 45.4506 31.4166 44.7729 31.4166Z"
      fill="#558EFF"
    />
    <Path
      d="M23.7729 24.4166H15.2271C14.5494 24.4166 14 24.966 14 25.6437V34.1896C14 34.8672 14.5494 35.4166 15.2271 35.4166H23.7729C24.4506 35.4166 25 34.8672 25 34.1896V25.6437C25 24.966 24.4506 24.4166 23.7729 24.4166Z"
      fill="#558EFF"
    />
    <Defs>
      <LinearGradient
        id="paint0_linear_1021_3478"
        x1={-1.51974e-7}
        y1={43.7099}
        x2={59}
        y2={15.2901}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#558EFF" />
        <Stop offset={1} stopColor="#93CEFF" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default PostsHeaderIcon;
