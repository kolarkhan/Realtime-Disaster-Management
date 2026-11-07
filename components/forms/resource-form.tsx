"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { RESOURCE_CATEGORIES, RESOURCE_STATUSES } from "@/lib/constants";
import { resourceSchema } from "@/lib/validators/resource";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function ResourceForm({ initialValues }: { initialValues?: any }) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm({
    resolver: zodResolver(resourceSchema),
    defaultValues: initialValues ?? {
      category: "ambulance",
      status: "available",
      allocatedQuantity: 0,
      quantityAvailable: 0
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("/api/resources", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      toast.error("Unable to save resource.");
      return;
    }

    toast.success("Resource added successfully.");
    window.location.reload();
  });

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
      <Input {...register("name")} placeholder="Resource name" />
      <Input {...register("location")} placeholder="Storage or staging location" />
      <Select {...register("category")}>
        {RESOURCE_CATEGORIES.map((category) => (
          <option key={category} value={category}>{category.replace("_", " ")}</option>
        ))}
      </Select>
      <Select {...register("status")}>
        {RESOURCE_STATUSES.map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
      </Select>
      <Input type="number" {...register("quantityAvailable")} placeholder="Available quantity" />
      <Input type="number" {...register("allocatedQuantity")} placeholder="Allocated quantity" />
      <div className="md:col-span-2">
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Add resource"}</Button>
      </div>
    </form>
  );
}
