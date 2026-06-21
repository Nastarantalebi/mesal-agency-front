import { Loader2, Trash2 } from "lucide-react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AlertDialogTitle,
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface DeleteDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
  extraBtn?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

function DeleteDialog({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
  extraBtn,
  confirmText = "بله",
  cancelText = "خیر",
  isLoading = false,
}: DeleteDialogProps) {
  const [focusedButton, setFocusedButton] = useState<"confirm" | "cancel">(
    "cancel",
  );
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ✅ SOLUTION 1: Save focus and manage dialog opening
  useEffect(() => {
    if (isOpen) {
      // Save the currently focused element
      previousFocusRef.current = document.activeElement as HTMLElement;

      // Focus cancel button after render
      const timer = setTimeout(() => {
        cancelButtonRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Restore focus when dialog closes
      if (previousFocusRef.current) {
        requestAnimationFrame(() => {
          previousFocusRef.current?.focus();
        });
      }
    }
  }, [isOpen]);

  // ✅ SOLUTION 2: Reset focus state in separate effect with deferral
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        setFocusedButton("cancel");
      });
    }
  }, [isOpen]);

  // Focus the appropriate button when focusedButton changes
  useEffect(() => {
    if (!isOpen) return;

    const button =
      focusedButton === "confirm"
        ? confirmButtonRef.current
        : cancelButtonRef.current;

    if (button) {
      requestAnimationFrame(() => {
        button.focus();
      });
    }
  }, [focusedButton, isOpen]);

  // ✅ SOLUTION 3: Memoize keyboard handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen || isLoading) return;

      const dialogElement = document.querySelector('[role="alertdialog"]');
      if (!dialogElement) return;

      const isRelevantKey = [
        "ArrowLeft",
        "ArrowRight",
        "Enter",
        "Escape",
      ].includes(e.key);

      if (!isRelevantKey) return;

      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      switch (e.key) {
        case "ArrowLeft":
          setFocusedButton("cancel");
          break;

        case "ArrowRight":
          setFocusedButton("confirm");
          break;

        case "Enter":
          if (focusedButton === "confirm") {
            onConfirm();
          } else {
            onClose();
          }
          break;

        case "Escape":
          onClose();
          break;

        default:
          break;
      }
    },
    [isOpen, focusedButton, isLoading, onConfirm, onClose],
  );

  // Keyboard event listener
  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, [isOpen, handleKeyDown]);

  // ✅ SOLUTION 4: Memoize individual click handlers
  const handleConfirmClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onConfirm();
    },
    [onConfirm],
  );

  const handleCancelClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onClose();
    },
    [onClose],
  );

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-red-50 w-96">
        <AlertDialogHeader>
          <div className="w-full flex justify-center ">
            <div className="size-16 bg-destructive rounded-full shadow-[inset_0_4px_8px_rgba(0,0,0,0.35),inset_0_-4px_6px_rgba(255,255,255,0.5)] flex items-center justify-center">
              <Trash2 className="text-white size-10" />
            </div>
          </div>
          <AlertDialogTitle className="text-destructive">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-4 items-center justify-center">
          <AlertDialogAction
            ref={confirmButtonRef}
            onClick={handleConfirmClick}
            onFocus={() => setFocusedButton("confirm")}
            onMouseEnter={() => setFocusedButton("confirm")}
            disabled={isLoading}
            className={cn(
              "bg-destructive! text-white rounded-lg hover:bg-destructive/10 focus-visible:bg-destructive/10",
              "disabled:opacity-50 disabled:cursor-not-allowed transition-all",
              focusedButton === "confirm" &&
                "ring-2 ring-destructive ring-offset-2 scale-105",
            )}
            aria-label={confirmText}
            aria-busy={isLoading}
            variant={undefined}
            size={undefined}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>در حال حذف...</span>
              </div>
            ) : (
              confirmText
            )}
          </AlertDialogAction>

          {extraBtn}

          <AlertDialogAction
            ref={cancelButtonRef}
            onClick={handleCancelClick}
            onFocus={() => setFocusedButton("cancel")}
            onMouseEnter={() => setFocusedButton("cancel")}
            disabled={isLoading}
            className={cn(
              "border border-border! text-default! bg-white rounded-lg hover:bg-destructive/10 focus-visible:bg-destructive/10",
              "disabled:opacity-50 disabled:cursor-not-allowed transition-all",
              focusedButton === "cancel" &&
                "ring-2 ring-primary ring-offset-2 scale-105",
            )}
            aria-label={cancelText}
            variant={undefined}
            size={undefined}
          >
            {cancelText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDialog;
