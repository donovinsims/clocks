import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const CAL_LINK = "donovin"; // cal.com/donovin

type Ctx = { open: () => void; close: () => void };
const BookingCtx = createContext<Ctx | null>(null);

export function useBooking() {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error("useBooking must be used inside <BookingProvider>");
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [calReady, setCalReady] = useState(false);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      setCalReady(true);
    })().catch(() => {});
  }, []);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  const ctxValue = useMemo(() => ({ open: openModal, close: closeModal }), [openModal, closeModal]);

  return (
    <BookingCtx.Provider value={ctxValue}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="booking-dialog max-w-3xl w-[calc(100vw-1.5rem)] sm:w-[calc(100vw-2rem)] max-h-[calc(100dvh-2rem)] sm:max-h-[85dvh] p-0 overflow-hidden border-[color:var(--color-rule-strong)] bg-[color:var(--color-paper-2)] !rounded-2xl flex flex-col">
          <DialogHeader className="booking-dialog__header px-4 py-3 sm:px-5 sm:pt-5 sm:pb-3 border-b border-[color:var(--color-rule)] shrink-0">
            <DialogTitle className="booking-dialog__title font-[var(--font-display)] tracking-tight text-[color:var(--color-ink)] text-base sm:text-xl">
              Book your free 20-minute audit
            </DialogTitle>
            <DialogDescription className="booking-dialog__desc text-[color:var(--color-ink-3)] text-[10px] sm:text-xs uppercase tracking-[0.12em] font-[var(--font-mono)] mt-1">
              No pitch. Written report either way.
            </DialogDescription>
          </DialogHeader>
          <div className="booking-dialog__body flex-1 overflow-y-auto overflow-x-hidden relative bg-[color:var(--color-paper)] min-h-[60vh] sm:h-[min(70vh,640px)]">
            {!calReady && (
              <div className="booking-dialog__loading" aria-label="Loading booking calendar">
                <div className="booking-dialog__spinner" />
                <p className="booking-dialog__loading-text">Loading calendar…</p>
              </div>
            )}
            {open && (
              <Cal
                calLink={CAL_LINK}
                style={{ width: "100%", height: "100%", minHeight: "100%", overflow: "auto" }}
                config={{ layout: "mobile", theme: "dark" } as Record<string, string>}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </BookingCtx.Provider>
  );
}

type BtnProps = {
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};
export function BookingButton({ className, children, arrow = true, style, onClick }: BtnProps) {
  const { open } = useBooking();
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        open();
      }}
      className={className}
      style={style}
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
