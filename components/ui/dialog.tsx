"use client";

import type React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

export const Modal = Dialog.Root;
export const ModalTrigger = Dialog.Trigger;
export const ModalClose = Dialog.Close;

export function ModalContent({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm" />
      <Dialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-border bg-background p-6 shadow-soft",
          className
        )}
      >
        {children}
        <Dialog.Close className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground">
          <X className="size-4" />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export const ModalHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4 space-y-1", className)} {...props} />
);

export const ModalTitle = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Title>) => (
  <Dialog.Title className={cn("text-xl font-semibold", className)} {...props} />
);

export const ModalDescription = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Description>) => (
  <Dialog.Description className={cn("text-sm text-muted-foreground", className)} {...props} />
);
