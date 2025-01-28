import { cn } from "@erisfy/shadcnui";
import { HTMLAttributes, ReactNode } from "react";


/**
 * TagGroupProps interface extends HTML attributes for the TagGroup component.
 * It includes properties for className and direction.
 */
export type TagGroupProps = HTMLAttributes<HTMLDivElement> & {
  direction?: "row" | "column";
};

/**
 * TagGroup component is used to display a collection of Tag components in a flex row or column layout.
 * @param {TagGroupProps} props - Props for the TagGroup component.
 * @returns {ReactNode} The TagGroup component.
 */
export const TagGroup = ({
  className,
  direction = "row",
  ...props
}: TagGroupProps): ReactNode => {
  return (
    <div
      className={cn(
        "flex",
        direction === "row" ? "flex-row" : "flex-col",
        "w-full",
        className
      )}
      {...props}
    />
  );
};
