"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/dialog";

export function ConfirmDialog({
  title,
  description,
  actionLabel,
  onConfirm
}: {
  title: string;
  description: string;
  actionLabel: string;
  onConfirm: () => Promise<void> | void;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructive">{actionLabel}</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={async () => {
              setLoading(true);
              await onConfirm();
              setLoading(false);
            }}
          >
            {loading ? "Please wait..." : actionLabel}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
