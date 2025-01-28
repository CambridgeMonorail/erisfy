import { FC, HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@erisfy/shadcnui";

const tagVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * TagProps interface extends HTML attributes and VariantProps for the Tag component.
 * It includes properties for className, variant, and onRemove.
 */
export type TagProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof tagVariants> & {
  onRemove?: () => void;
};

/**
 * Tag component is used to display a small tag with different variants and a remove button.
 * @param {TagProps} props - Props for the Tag component.
 * @returns {JSX.Element} The Tag component.
 */
export const Tag: FC<TagProps> = ({ className, variant, onRemove, ...props }) => {
  return (
    <div className={cn(tagVariants({ variant }), className)} {...props}>
      {props.children}
      {onRemove && (
        <button
          type="button"
          className="ml-2 text-xs focus:outline-none"
          onClick={onRemove}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
