"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalDescription, ModalHeader, ModalTitle, ModalTrigger } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";

export function AssignmentModal({ incidentId, teams }: { incidentId: string; teams: any[] }) {
  const [teamId, setTeamId] = useState(teams[0]?._id ?? "");
  const [loading, setLoading] = useState(false);

  async function handleAssign() {
    setLoading(true);
    const response = await fetch(`/api/incidents/${incidentId}/assign`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ teamId })
    });

    if (!response.ok) {
      toast.error("Unable to assign rescue team.");
    } else {
      toast.success("Rescue team assigned successfully.");
      window.location.reload();
    }

    setLoading(false);
  }

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button>Assign Team</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Assign Rescue Team</ModalTitle>
          <ModalDescription>Dispatch the most suitable team and start the response workflow.</ModalDescription>
        </ModalHeader>
        <div className="space-y-4">
          <Select value={teamId} onChange={(event) => setTeamId(event.target.value)}>
            {teams.map((team) => (
              <option key={team._id} value={team._id}>
                {team.teamName} - {team.availabilityStatus}
              </option>
            ))}
          </Select>
          <Button className="w-full" onClick={handleAssign} disabled={loading}>
            {loading ? "Assigning..." : "Confirm Assignment"}
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
