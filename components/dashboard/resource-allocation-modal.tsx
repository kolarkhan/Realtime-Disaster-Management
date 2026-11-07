"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/dialog";

export function ResourceAllocationModal({ resource }: { resource: any }) {
  const [allocatedQuantity, setAllocatedQuantity] = useState(String(resource.allocatedQuantity ?? 0));
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    const response = await fetch(`/api/resources/${resource._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ allocatedQuantity: Number(allocatedQuantity) })
    });

    if (!response.ok) {
      toast.error("Unable to update allocation.");
    } else {
      toast.success("Allocation updated.");
      window.location.reload();
    }

    setLoading(false);
  }

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="outline">Allocate</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Allocate Resource</ModalTitle>
          <ModalDescription>Adjust allocation levels based on live mission demand.</ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <Input type="number" value={allocatedQuantity} onChange={(event) => setAllocatedQuantity(event.target.value)} />
          <Button className="w-full" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Allocation"}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
