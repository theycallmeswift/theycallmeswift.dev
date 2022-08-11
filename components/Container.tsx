import type { ComponentType, HTMLAttributes } from "react";

import clsx from "clsx";

export type ContainerProps = HTMLAttributes<HTMLElement> & {
  el?: unknown;
};

const Container: React.FC<ContainerProps> = ({
  children,
  className,
  el = "main",
  ...props
}) => {
  const rootClassName = clsx(
    "flex flex-col justify-center items-start w-full max-w-2xl mx-auto",
    className
  );
  const Component = el as ComponentType<React.HTMLAttributes<HTMLElement>>;

  return (
    <Component className={rootClassName} {...props}>
      {children}
    </Component>
  );
};

export default Container;
