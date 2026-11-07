"use client";

import { TeamForm } from "@/components/forms/team-form";
import { Button } from "@/components/ui/button";
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/dialog";

export function TeamCreateModal() {
  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Create Team</Button>
      </ModalTrigger>
      <ModalContent className="max-w-4xl">
        <ModalHeader>
          <ModalTitle>Create team account</ModalTitle>
          <ModalDescription>Create both the login user and the linked operational rescue team profile from one admin flow.</ModalDescription>
        </ModalHeader>
        <TeamForm />
      </ModalContent>
    </Modal>
  );
}
