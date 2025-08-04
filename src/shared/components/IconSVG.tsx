import { SVGProps } from 'react';

interface IconSVGProps extends SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
}

export default function IconSVG({ width = 24, height = 24, ...rest }: IconSVGProps) {
  return (
    <svg
      fill="none"
      stroke="#777"
      width={width}
      height={height}
      strokeWidth="1.5"
      aria-hidden="true"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-user-star"
      {...rest}
    >
      <path d="M17 17l-2 2l2 2" />
      <path d="M20 21l2 -2l-2 -2" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
}
