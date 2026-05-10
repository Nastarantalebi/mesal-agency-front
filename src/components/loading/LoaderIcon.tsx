import type { SVGProps } from "react";

const LoaderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="12" cy="20" r="2"></circle>
    <circle cx="12" cy="4" r="2"></circle>
    <circle cx="6.343" cy="17.657" r="2"></circle>
    <circle cx="17.657" cy="6.343" r="2"></circle>
    <circle cx="4" cy="12" r="2.001"></circle>
    <circle cx="20" cy="12" r="2"></circle>
    <circle cx="6.343" cy="6.344" r="2"></circle>
    <circle cx="17.657" cy="17.658" r="2"></circle>
  </svg>
);

export default LoaderIcon;