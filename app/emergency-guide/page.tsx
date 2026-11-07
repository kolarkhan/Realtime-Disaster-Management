import { AlertTriangle, Cross, Droplets, Flame, HousePlus, Siren } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Logo } from "@/components/logo";

const guides = [
  { icon: Flame, title: "Fire response", description: "Evacuate immediately, shut gas lines if safe, and avoid elevators in multi-story buildings." },
  { icon: Droplets, title: "Flood safety", description: "Move to higher ground, avoid moving water, and switch off mains electricity if accessible." },
  { icon: AlertTriangle, title: "Earthquake protocol", description: "Drop, cover, and hold. Stay away from windows and re-check structural hazards before re-entry." },
  { icon: HousePlus, title: "Medical emergency", description: "Share exact coordinates, number of victims, visible injuries, and whether CPR or first aid is underway." },
  { icon: Cross, title: "Victim triage", description: "Prioritize airway, breathing, circulation, and separate critical, injured, and stable victims when possible." },
  { icon: Siren, title: "Communication tips", description: "Keep phone lines free, use concise updates, and send only verified information to responders." }
];

export default function EmergencyGuidePage() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-8">
      <div className="space-y-6">
        <Logo />
        <div className="glass-panel rounded-[2rem] p-8">
          <h1 className="text-4xl font-semibold">Emergency help instructions</h1>
          <p className="mt-3 max-w-3xl text-muted-foreground">Quick-response guidance for citizens while rescue teams are being dispatched. This section is optimized for clarity during high-stress situations.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Card key={guide.title}><CardContent className="space-y-4"><div className="w-fit rounded-2xl bg-primary/10 p-3 text-primary"><Icon className="size-5" /></div><h2 className="text-xl font-semibold">{guide.title}</h2><p className="text-sm text-muted-foreground">{guide.description}</p></CardContent></Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
