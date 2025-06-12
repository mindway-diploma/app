import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SearchIcon = (props: any) => (
  <Svg
    width={35}
    height={39}
    viewBox="0 0 35 39"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M17.5 6.28027C23.504 6.28027 28.371 11.1474 28.3711 17.1514C28.3711 23.1554 23.504 28.0225 17.5 28.0225C11.496 28.0224 6.62891 23.1553 6.62891 17.1514C6.62897 11.1475 11.4961 6.28034 17.5 6.28027Z"
      fill="white"
      stroke="#3D3D3D"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M25 27L31 35"
      stroke="#3D3D3D"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SearchIcon;
