"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { TEAM_MISSION_STATUSES } from "@/lib/constants";
import { missionUpdateSchema } from "@/lib/validators/incident";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function MissionUpdateForm({ assignmentId, defaults }: { assignmentId: string; defaults?: any }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    resolver: zodResolver(missionUpdateSchema),
    defaultValues: {
      progressStatus: defaults?.progressStatus ?? "accepted",
      currentLat: defaults?.currentLat ?? defaults?.currentLocation?.lat ?? 24.86,
      currentLng: defaults?.currentLng ?? defaults?.currentLocation?.lng ?? 67.01,
      remarks: defaults?.remarks ?? ""
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch(`/api/assignments/${assignmentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const payload = await response.json();

    if (!response.ok) {
      toast.error(payload.error ?? "Unable to update mission.");
      return;
    }

    toast.success("Mission progress updated.");
    window.location.reload();
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium">Mission status</label>
        <Select {...register("progressStatus")}>
          {TEAM_MISSION_STATUSES.map((status) => (
            <option key={status} value={status}>{status.replace(/_/g, " ")}</option>
          ))}
        </Select>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Current latitude</label>
          <Input {...register("currentLat")} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Current longitude</label>
          <Input {...register("currentLng")} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Rescue notes</label>
        <Textarea {...register("remarks")} placeholder="Add victim conditions, access constraints, or support requests." />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update mission"}
      </Button>
    </form>
  );
}
