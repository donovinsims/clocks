import React from "react";
import { Link } from "@tanstack/react-router";

export function BookingProvider({ children }: { children: React.ReactNode }): JSX.Element {
  // No-op provider wrapper to avoid breaking dependencies
  return <>{children}</>;
}

type BtnProps = {
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export function BookingButton({
  className,
  children,
  arrow = true,
  style,
  onClick,
}: BtnProps): JSX.Element {
  return (
    <Link to="/assessment" className={className} style={style} onClick={onClick}>
      <span>{children}</span>
      {arrow && (
        <span className="cta__arrow" aria-hidden="true">
          →
        </span>
      )}
    </Link>
  );
}
