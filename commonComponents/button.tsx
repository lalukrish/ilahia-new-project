"use client";
import React from "react";
import Link from "next/link";

type Variant = "filled" | "outlined" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  action?: (...args: any[]) => Promise<any>;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
  loading?: boolean;
  className?: string;
}

export default function Button({
  variant = "filled",
  size = "md",
  href,
  action,
  icon,
  iconRight,
  fullWidth = false,
  rounded = false,
  loading = false,
  disabled,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  /* ---------------- SIZE ---------------- */
  const sizeMap: Record<Size, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-3.5 text-lg",
  };

  /* ---------------- VARIANTS ---------------- */
  const variantMap: Record<Variant, string> = {
    /* PRIMARY – Black Filled */
    filled: `
      bg-black text-white border border-black
      hover:bg-neutral-900
      active:bg-black
      disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-500
    `,

    /* OUTLINED – Simple Smooth Fill */
    outlined: `
      bg-transparent text-black border border-black
      hover:bg-black hover:text-white
      active:bg-neutral-900
      disabled:border-neutral-300 disabled:text-neutral-400
    `,

    /* GHOST */
    ghost: `
      bg-transparent text-black border border-transparent
      hover:bg-neutral-100
      active:bg-neutral-200
      disabled:text-neutral-400
    `,

    /* DANGER */
    danger: `
      bg-red-600 text-white border border-red-600
      hover:bg-red-700 active:bg-red-800
    `,
  };

  /* ---------------- HELPERS ---------------- */
  const shapeClass = rounded ? "rounded-full" : "rounded-md";
  const widthClass = fullWidth ? "w-full" : "inline-flex";

  const base = `
    ${widthClass} items-center justify-center gap-2
    min-h-[44px] ${shapeClass}
    transition-colors duration-200 ease-in-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    focus-visible:ring-black/40
  `;

  const shadowClass =
    !disabled && !loading
      ? "shadow-sm hover:shadow-md active:translate-y-[1px] transition-all duration-150"
      : "shadow-none";

  const disabledClass =
    disabled || loading
      ? "cursor-not-allowed pointer-events-none"
      : "cursor-pointer";

  const classes = [
    base,
    sizeMap[size],
    variantMap[variant],
    shadowClass,
    disabledClass,
    className,
  ].join(" ");

  /* ---------------- HANDLER ---------------- */
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (rest.onClick) {
      rest.onClick(e);
      return;
    }
    if (action) action();
  };

  /* ---------------- SPINNER ---------------- */
  const Spinner = () => (
    <svg
      className="w-4 h-4 animate-spin"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.15" />
      <path d="M22 12a10 10 0 00-10-10" strokeLinecap="round" />
    </svg>
  );

  /* ---------------- LINK ---------------- */
  if (href) {
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    return (
      <Link
        href={href}
        className={classes}
        aria-disabled={disabled || loading}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {loading ? (
          <Spinner />
        ) : (
          <>
            {icon && <span className="flex items-center">{icon}</span>}
            <span className="leading-none">{children}</span>
            {iconRight && (
              <span className="flex items-center">{iconRight}</span>
            )}
          </>
        )}
      </Link>
    );
  }

  /* ---------------- BUTTON ---------------- */
  return (
    <button
      {...rest}
      type={rest.type ?? "button"}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      className={classes}
    >
      {loading ? (
        <>
          <Spinner />
          <span className="sr-only">Loading</span>
        </>
      ) : (
        <>
          {icon && <span className="flex items-center">{icon}</span>}
          <span className="leading-none">{children}</span>
          {iconRight && <span className="flex items-center">{iconRight}</span>}
        </>
      )}
    </button>
  );
}
