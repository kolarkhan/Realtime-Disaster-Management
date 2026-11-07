"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { ALERT_TYPES, USER_ROLES } from "@/lib/constants";
import { alertSchema } from "@/lib/validators/resource";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function AlertForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    resolver: zodResolver(alertSchema),
    defaultValues: { type: "warning", sentToRole: "citizen", status: "sent" }
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("/api/alerts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      toast.error("Unable to create alert.");
      return;
    }

    toast.success("Alert issued successfully.");
    window.location.reload();
  });

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <Input {...register("title")} placeholder="Alert title" />
      <Textarea {...register("message")} placeholder="Write the emergency alert message." />
      <div className="grid gap-4 md:grid-cols-3">
        <Select {...register("type")}>
          {ALERT_TYPES.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
        <Select {...register("sentToRole")}>
          {USER_ROLES.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </Select>
        <Select {...register("status")}>
          <option value="sent">Sent</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </Select>
      </div>
      <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Create alert"}</Button>
    </form>
  );
}
