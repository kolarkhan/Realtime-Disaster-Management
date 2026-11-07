"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { createTeamSchema } from "@/lib/validators/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

export function TeamForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(createTeamSchema),
    defaultValues: {
      availabilityStatus: "available",
      membersCount: 6,
      currentLat: 24.8607,
      currentLng: 67.0011
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("/api/teams", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const payload = await response.json();

    if (!response.ok) {
      toast.error(payload.error ?? "Unable to create team account.");
      return;
    }

    toast.success("Rescue team account created successfully.");
    reset({
      availabilityStatus: "available",
      membersCount: 6,
      currentLat: 24.8607,
      currentLng: 67.0011,
      name: "",
      email: "",
      password: "",
      phone: "",
      teamName: "",
      vehicleType: "",
      contactNumber: ""
    });
    window.location.reload();
  });

  return (
    <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
      <div className="space-y-2">
        <label className="text-sm font-medium">Team leader name</label>
        <Input {...register("name")} placeholder="Ali Rescue Lead" />
        {errors.name ? <p className="text-xs text-rose-500">{errors.name.message as string}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Login email</label>
        <Input {...register("email")} placeholder="bravo.team@rescuegrid.demo" />
        {errors.email ? <p className="text-xs text-rose-500">{errors.email.message as string}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Temporary password</label>
        <Input type="password" {...register("password")} placeholder="Team123!" />
        {errors.password ? <p className="text-xs text-rose-500">{errors.password.message as string}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">User phone</label>
        <Input {...register("phone")} placeholder="+92 300 5550400" />
        {errors.phone ? <p className="text-xs text-rose-500">{errors.phone.message as string}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Team name</label>
        <Input {...register("teamName")} placeholder="Bravo Rescue Unit" />
        {errors.teamName ? <p className="text-xs text-rose-500">{errors.teamName.message as string}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Vehicle type</label>
        <Input {...register("vehicleType")} placeholder="Ambulance Van" />
        {errors.vehicleType ? <p className="text-xs text-rose-500">{errors.vehicleType.message as string}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Members count</label>
        <Input type="number" {...register("membersCount")} />
        {errors.membersCount ? <p className="text-xs text-rose-500">{errors.membersCount.message as string}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Team contact number</label>
        <Input {...register("contactNumber")} placeholder="+92 300 5550401" />
        {errors.contactNumber ? <p className="text-xs text-rose-500">{errors.contactNumber.message as string}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Current latitude</label>
        <Input type="number" step="any" {...register("currentLat")} />
        {errors.currentLat ? <p className="text-xs text-rose-500">{errors.currentLat.message as string}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Current longitude</label>
        <Input type="number" step="any" {...register("currentLng")} />
        {errors.currentLng ? <p className="text-xs text-rose-500">{errors.currentLng.message as string}</p> : null}
      </div>
      <div className="space-y-2 md:col-span-2">
        <label className="text-sm font-medium">Availability status</label>
        <Select {...register("availabilityStatus")}>
          <option value="available">Available</option>
          <option value="deployed">Deployed</option>
          <option value="maintenance">Maintenance</option>
        </Select>
      </div>
      <div className="md:col-span-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating team account..." : "Create team account"}
        </Button>
      </div>
    </form>
  );
}
