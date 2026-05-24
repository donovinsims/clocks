import React from "react";
import { Link } from "@tanstack/react-router";

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
}: BtnProps) {
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
