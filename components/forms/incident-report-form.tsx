"use client";

import { LocateFixed, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { DISASTER_TYPES, SEVERITY_LEVELS } from "@/lib/constants";
import { incidentReportSchema } from "@/lib/validators/incident";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function IncidentReportForm() {
  const router = useRouter();
  const [locating, setLocating] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(incidentReportSchema),
    defaultValues: { severity: "high", type: "flood", address: "" }
  });

  const onSubmit = handleSubmit(async (values) => {
    const response = await fetch("/api/incidents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    const payload = await response.json();

    if (!response.ok) {
      toast.error(payload.error ?? "Unable to submit incident report.");
      return;
    }

    toast.success("Incident reported successfully.");
    router.push(`/citizen/reports/${payload.incident._id}`);
    router.refresh();
  });

  async function fillCurrentAddress() {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported on this device.");
      return;
    }

    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = Number(position.coords.latitude.toFixed(6));
        const lng = Number(position.coords.longitude.toFixed(6));

        setValue("lat", lat, { shouldDirty: true, shouldValidate: true });
        setValue("lng", lng, { shouldDirty: true, shouldValidate: true });

        try {
          const response = await fetch(`/api/maps/reverse-geocode?lat=${lat}&lng=${lng}`);
          const payload = await response.json();

          if (!response.ok) {
            toast.error(payload.error ?? "Current address could not be detected.");
            setValue("address", `${lat}, ${lng}`, { shouldDirty: true, shouldValidate: true });
          } else {
            setValue("address", payload.address, { shouldDirty: true, shouldValidate: true });
            toast.success("Current address detected successfully.");
          }
        } catch {
          setValue("address", `${lat}, ${lng}`, { shouldDirty: true, shouldValidate: true });
          toast.error("Current address could not be resolved from Google Maps.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        toast.error("Location access was denied. Please allow location permission and try again.");
        setLocating(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="text-3xl">Report an emergency incident</CardTitle>
          <CardDescription>Provide clear details so the control room can assess, dispatch, and coordinate rescue operations immediately.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={onSubmit}>
          <input type="hidden" {...register("lat", { valueAsNumber: true })} />
          <input type="hidden" {...register("lng", { valueAsNumber: true })} />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Incident title</label>
              <Input {...register("title")} placeholder="Flash flooding near Riverside Bridge" />
              {errors.title ? <p className="text-xs text-rose-500">{errors.title.message as string}</p> : null}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select {...register("type")}>
                  {DISASTER_TYPES.map((type) => (
                    <option key={type} value={type}>{type.replace("_", " ")}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Severity</label>
                <Select {...register("severity")}>
                  {SEVERITY_LEVELS.map((severity) => (
                    <option key={severity} value={severity}>{severity}</option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea {...register("description")} placeholder="Describe the situation, visible hazards, trapped people, blocked roads, or urgent medical needs." />
            {errors.description ? <p className="text-xs text-rose-500">{errors.description.message as string}</p> : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <div className="relative">
              <Input {...register("address")} className="pr-14" placeholder="Tap the location icon to detect your current address" />
              <button
                type="button"
                onClick={fillCurrentAddress}
                disabled={locating}
                className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl border border-border bg-background/80 text-muted-foreground transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Use current address"
                title="Use current address"
              >
                {locating ? <LoaderCircle className="size-4 animate-spin" /> : <LocateFixed className="size-4" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">The location icon uses your device GPS and Google Maps reverse geocoding to fill the address automatically.</p>
            {errors.address ? <p className="text-xs text-rose-500">{errors.address.message as string}</p> : null}
            {errors.lat || errors.lng ? <p className="text-xs text-rose-500">Use the current-location icon to capture your live address before submitting the report.</p> : null}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact name</label>
              <Input {...register("contactName")} placeholder="Resident contact" />
              {errors.contactName ? <p className="text-xs text-rose-500">{errors.contactName.message as string}</p> : null}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact phone</label>
              <Input {...register("contactPhone")} placeholder="+92 300 1234567" />
              {errors.contactPhone ? <p className="text-xs text-rose-500">{errors.contactPhone.message as string}</p> : null}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input {...register("imageUrl")} placeholder="https://..." />
              {errors.imageUrl ? <p className="text-xs text-rose-500">{errors.imageUrl.message as string}</p> : null}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Contact email</label>
            <Input {...register("contactEmail")} placeholder="optional@example.com" />
            {errors.contactEmail ? <p className="text-xs text-rose-500">{errors.contactEmail.message as string}</p> : null}
          </div>
          <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting || locating}>
            {isSubmitting ? "Submitting report..." : "Submit incident report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
