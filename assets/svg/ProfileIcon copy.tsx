import * as React from "react";
import Svg, { Path } from "react-native-svg";

function ProfileIcon(props: any) {
  return (
    <Svg
      width={32}
      height={36}
      viewBox="0 0 32 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        clipRule="evenodd"
        d="M22.2 22.028H10.542a9.064 9.064 0 00-7.85 5.414c-1.665 3.266 1.656 6.354 5.518 6.354h16.324c3.865 0 7.186-3.088 5.52-6.354a9.063 9.063 0 00-7.852-5.414zM23.432 9.06a7.06 7.06 0 11-14.121 0 7.06 7.06 0 0114.121 0z"
        stroke={props.color ? props.color : "#898D7A"}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ProfileIcon;
