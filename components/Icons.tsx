import clsx from "clsx";

export type SVGProps = React.AnchorHTMLAttributes<SVGElement>;

export const MenuIcon: React.FC<SVGProps> = ({ className, ...props }) => {
  const rootClassName = clsx("h-5 h-5", className);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={rootClassName}
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const RSSIcon: React.FC<SVGProps> = ({ className, ...props }) => {
  const rootClassName = clsx("h-5 h-5", className);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={rootClassName}
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
      <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
    </svg>
  );
};

export const CloseIcon: React.FC<SVGProps> = ({ className, ...props }) => {
  const rootClassName = clsx("h-5 h-5", className);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={rootClassName}
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
};
