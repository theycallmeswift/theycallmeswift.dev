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
  const defaultClassName =
    "flex flex-col justify-center items-start max-w-2xl mx-auto px-8 pb-16";
  const Component = el as ComponentType<React.HTMLAttributes<HTMLElement>>;

  return (
    <Component className={clsx(className, defaultClassName)} {...props}>
      {children}
    </Component>
  );
};

export default Container;
