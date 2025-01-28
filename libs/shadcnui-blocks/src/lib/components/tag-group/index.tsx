import { FC, HTMLAttributes } from "react";
import { cn } from "../../../../../shadcnui/src/lib/utils";

/**
 * TagGroupProps interface extends HTML attributes for the TagGroup component.
 * It includes properties for className and direction.
 */
export interface TagGroupProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
}

/**
 * TagGroup component is used to display a collection of Tag components in a flex row or column layout.
 * @param {TagGroupProps} props - Props for the TagGroup component.
 * @returns {JSX.Element} The TagGroup component.
 */
export const TagGroup: FC<TagGroupProps> = ({
  className,
  direction = "row",
  ...props
}) => {
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
