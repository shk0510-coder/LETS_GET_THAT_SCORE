import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-primary-container text-on-primary hover:bg-primary border border-primary-container",
  secondary:
    "bg-transparent text-primary border border-outline-variant hover:border-primary",
  ghost: "bg-transparent text-primary hover:bg-surface-container-low border border-transparent",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 rounded px-6 py-3 text-label-md uppercase tracking-wider transition-colors disabled:opacity-50 disabled:pointer-events-none";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "className" | "children"
>;

type ButtonAsButton = CommonProps & NativeButtonProps & { href?: undefined };

type ButtonAsLink = CommonProps & {
  href: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`;

  if (props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _variant, className: _className, children: _children, type = "button", ...nativeProps } =
    props as ButtonAsButton;

  return (
    <button type={type} className={classes} {...nativeProps}>
      {children}
    </button>
  );
}
