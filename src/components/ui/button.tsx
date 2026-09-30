import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-6 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold: "bg-gold-gradient text-primary shadow-gold hover:-translate-y-0.5 hover:shadow-gold-lg",
        outline: "border border-gold/70 bg-transparent text-foreground hover:bg-gold-soft",
        ivory: "border border-ivory/30 bg-ivory/10 text-ivory backdrop-blur-sm hover:bg-ivory/20",
        icon: "size-11 rounded-full bg-primary p-0 text-primary-foreground hover:bg-primary-soft",
        ghost: "bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        default: "bg-primary text-primary-foreground hover:bg-primary-soft",
        destructive: "bg-primary text-primary-foreground hover:bg-primary-soft",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12",
        sm: "h-10 px-4",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: { variant: "gold", size: "default" },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button({ className, variant, size, asChild, ...props }, ref) {
  const Comp = asChild ? Slot : "button";
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
});

export { Button, buttonVariants };