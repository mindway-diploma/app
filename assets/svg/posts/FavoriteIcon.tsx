import * as React from "react";
import Svg, { Path } from "react-native-svg";
const FavoriteIcon = (props: any) => (
  <Svg
    width={28}
    height={27}
    viewBox="0 0 28 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.3311 8.7002C17.6402 9.23082 18.1323 9.62632 18.71 9.81641L18.9629 9.88477L25.4307 11.2852L21.0215 16.2217C20.6122 16.6797 20.3879 17.2697 20.3857 17.8779L20.3984 18.1387L21.0645 24.7236L15.0078 22.0547L14.7637 21.9619C14.2672 21.8026 13.7328 21.8026 13.2363 21.9619L12.9922 22.0547L6.93457 24.7236L7.60156 18.1387C7.66336 17.5278 7.49802 16.9191 7.14258 16.4258L6.97852 16.2217L2.56836 11.2852L9.03711 9.88477C9.6373 9.7548 10.1661 9.40954 10.5254 8.91895L10.6689 8.7002L14 2.97949L17.3311 8.7002Z"
      stroke="#6B9F1F"
      strokeWidth={3}
      strokeLinejoin="round"
    />
  </Svg>
);
export default FavoriteIcon;
