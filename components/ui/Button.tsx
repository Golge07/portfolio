import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
} from "react";

export type ButtonVariant = "primary" | "ghost";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "btn-primary hover:btn-primary-hover",
  ghost: "btn-ghost hover:btn-ghost-hover",
};

function cx(...parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function buttonClassName(variant: ButtonVariant = "primary", className?: string) {
  return cx(VARIANT_CLASSES[variant], className);
}

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function AppButton({ variant = "primary", className, ...props }: AppButtonProps) {
  return <button {...props} className={buttonClassName(variant, className)} />;
}

type AppLinkButtonProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: ButtonVariant;
  className?: string;
};

export function AppLinkButton({ variant = "primary", className, ...props }: AppLinkButtonProps) {
  return <Link {...props} className={buttonClassName(variant, cx("no-underline", className))} />;
}

type AppExternalButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: ButtonVariant;
};

export function AppExternalButton({
  variant = "primary",
  className,
  ...props
}: AppExternalButtonProps) {
  return <a {...props} className={buttonClassName(variant, cx("no-underline", className))} />;
}
