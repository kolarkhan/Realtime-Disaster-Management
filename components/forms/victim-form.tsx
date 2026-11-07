"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { VICTIM_CONDITIONS, VICTIM_RESCUE_STATUSES } from "@/lib/constants";
import { victimSchema } from "@/lib/validators/incident";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function VictimForm({ incidentId }: { incidentId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm({
    resolver: zodResolver(victimSchema),
    defaultValues: { incidentId, condition: "stable", rescueStatus: "awaiting" }
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch(`/api/incidents/${incidentId}/victims`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      toast.error("Unable to add victim.");
      return;
    }

    toast.success("Victim added successfully.");
    reset({ incidentId, condition: "stable", rescueStatus: "awaiting", name: "", age: undefined, notes: "" });
    window.location.reload();
  });

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
      <Input {...register("name")} placeholder="Victim name" />
      <Input type="number" {...register("age")} placeholder="Age" />
      <Select {...register("condition")}>
        {VICTIM_CONDITIONS.map((condition) => (
          <option key={condition} value={condition}>{condition}</option>
        ))}
      </Select>
      <Select {...register("rescueStatus")}>
        {VICTIM_RESCUE_STATUSES.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </Select>
      <div className="md:col-span-2">
        <Textarea {...register("notes")} placeholder="Condition notes or extraction details" />
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Add victim"}</Button>
      </div>
    </form>
  );
}
