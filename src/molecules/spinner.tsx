type IProps = {
  color?: string;
  size?: string;
};

export const Spinner = ({ color = "text-white", size = "4" }: IProps) => {
  return (
    <svg
      className={`mr-2 h-${size} w-${size} animate-spin ${color}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      ></path>
    </svg>
  );
};
