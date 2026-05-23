import React from "react";

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

export function BookingButton({ className, children, arrow = true, style, onClick }: BtnProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      style={style}
      data-tally-open="RGVJ1J"
      data-tally-layout="modal"
      data-tally-width="600"
      data-tally-auto-close="0"
    >
      <span>{children}</span>
      {arrow && (
        <span className="cta__arrow" aria-hidden="true">
          →
        </span>
      )}
    </button>
  );
}
