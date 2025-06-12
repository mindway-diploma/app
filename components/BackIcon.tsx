import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";
const BackIcon = (props: any) => (
  <Svg
    width={35}
    height={35}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Circle cx={17.5} cy={17.5} r={17.5} fill="white" />
    <Path
      d="M18.1261 9.01355C18.686 8.45394 19.5936 8.45392 20.1535 9.01355C20.7134 9.57345 20.7139 10.4816 20.1542 11.0416L13.0569 18.139L20.1549 25.237C20.7149 25.797 20.7142 26.7051 20.1542 27.2651C19.5942 27.8249 18.6867 27.825 18.1268 27.2651L10.0268 19.1651C10.0227 19.1611 10.0178 19.1574 10.0137 19.1534C9.45406 18.5934 9.45406 17.6859 10.0137 17.1259L18.1261 9.01355Z"
      fill="black"
    />
  </Svg>
);
export default BackIcon;
