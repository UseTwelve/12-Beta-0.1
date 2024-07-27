import Link from "next/link";

export default function Logo() {
  return (
    <Link className="block" href="/">
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="34.000000pt"
        height="34.000000pt"
        viewBox="0 0 34.000000 34.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,34.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M98 299 c-43 -22 -78 -81 -78 -129 0 -50 35 -107 80 -130 50 -25 90
-25 140 0 45 23 80 80 80 130 0 50 -35 107 -80 130 -49 25 -94 25 -142 -1z
m142 -38 c14 -10 31 -36 39 -58 13 -36 12 -43 -5 -79 -27 -55 -81 -81 -134
-65 -72 21 -105 93 -73 159 33 68 112 88 173 43z"
          />
          <path
            d="M160 221 c0 -34 4 -61 10 -61 6 0 10 24 10 54 0 30 -4 58 -10 61 -6
4 -10 -17 -10 -54z"
          />
        </g>
      </svg>
    </Link>
  );
}
