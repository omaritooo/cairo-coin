export const ButtonSwap = () => (
  <svg
    className="self-center rotate-90 w-6 h-6 text-black dark:text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      className="hidden md:block"
      d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      className="block md:hidden"
      d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
