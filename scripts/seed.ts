import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function seed() {
  const [{ seedAlerts, seedResources, seedUsers }, { connectToDatabase }, { Alert }, { Assignment }, { Incident }, { RescueTeam }, { Resource }, { User }, { Victim }] = await Promise.all([
    import("../data/seed"),
    import("../lib/db"),
    import("../models/Alert"),
    import("../models/Assignment"),
    import("../models/Incident"),
    import("../models/RescueTeam"),
    import("../models/Resource"),
    import("../models/User"),
    import("../models/Victim")
  ]);

  await connectToDatabase();

  await Promise.all([
    Alert.deleteMany({}),
    Assignment.deleteMany({}),
    Victim.deleteMany({}),
    Incident.deleteMany({}),
    RescueTeam.deleteMany({}),
    Resource.deleteMany({}),
    User.deleteMany({})
  ]);

  const [adminSeed, teamSeed, citizenSeed] = seedUsers;
  const [adminPassword, teamPassword, citizenPassword] = await Promise.all([
    bcrypt.hash(adminSeed.password, 10),
    bcrypt.hash(teamSeed.password, 10),
    bcrypt.hash(citizenSeed.password, 10)
  ]);

  const [admin, teamUser, citizen] = await User.create([
    { ...adminSeed, passwordHash: adminPassword },
    { ...teamSeed, passwordHash: teamPassword },
    { ...citizenSeed, passwordHash: citizenPassword }
  ]);

  const rescueTeam = await RescueTeam.create({
    teamName: "Alpha Swift Water Unit",
    membersCount: 7,
    vehicleType: "Flood Response Truck",
    currentLocation: { lat: 24.8607, lng: 67.0011 },
    availabilityStatus: "deployed",
    contactNumber: "+92 300 5550200",
    linkedUser: teamUser._id
  });

  const incidents = await Incident.create([
    {
      title: "Flash flooding near Riverside Bridge",
      type: "flood",
      description: "Water levels are rising rapidly, several vehicles are stranded, and residents on the ground floor need evacuation support.",
      severity: "critical",
      status: "assigned",
      location: { lat: 24.8712, lng: 67.0321, address: "Riverside Bridge, District East" },
      contact: { name: citizen.name, phone: citizen.phone, email: citizen.email },
      reportedBy: citizen._id,
      assignedTeam: rescueTeam._id,
      imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa"
    },
    {
      title: "Warehouse fire in industrial zone",
      type: "fire",
      description: "A medium-scale warehouse fire is generating heavy smoke. Nearby workers have evacuated, but two injuries were reported.",
      severity: "high",
      status: "in_progress",
      location: { lat: 24.8911, lng: 67.0788, address: "Korangi Industrial Area" },
      contact: { name: "Site Supervisor", phone: "+92 300 4441200", email: "supervisor@industry.demo" },
      reportedBy: citizen._id,
      imageUrl: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef"
    },
    {
      title: "Collapsed wall after tremor",
      type: "earthquake",
      description: "A boundary wall collapsed after a tremor and blocked the lane. Multiple households are requesting inspection and aid.",
      severity: "medium",
      status: "reported",
      location: { lat: 24.9135, lng: 67.1132, address: "Gulshan Block 7" },
      contact: { name: "Community Lead", phone: "+92 300 4441300", email: "lead@community.demo" },
      reportedBy: citizen._id
    }
  ]);

  rescueTeam.assignedIncidents = [incidents[0]._id, incidents[1]._id];
  await rescueTeam.save();

  await Assignment.create({
    incidentId: incidents[0]._id,
    teamId: rescueTeam._id,
    assignedBy: admin._id,
    progressStatus: "accepted",
    remarks: "Primary water rescue unit deployed. Maintain radio updates every 10 minutes."
  });

  await Victim.create([
    { incidentId: incidents[0]._id, name: "Sana Ahmed", age: 26, condition: "injured", rescueStatus: "identified", notes: "Moved to safe rooftop zone." },
    { incidentId: incidents[0]._id, name: "Ali Raza", age: 42, condition: "critical", rescueStatus: "awaiting", notes: "Requires stretcher extraction." },
    { incidentId: incidents[1]._id, name: "Hamza Tariq", age: 34, condition: "stable", rescueStatus: "rescued", notes: "First aid completed on site." }
  ]);

  await Resource.insertMany(seedResources);
  await Alert.insertMany(seedAlerts.map((alert) => ({ ...alert, createdBy: admin._id })));

  console.log("Seed completed successfully.");
  console.log(`Admin: ${admin.email} / ${seedUsers[0].password}`);
  console.log(`Team: ${teamUser.email} / ${seedUsers[1].password}`);
  console.log(`Citizen: ${citizen.email} / ${seedUsers[2].password}`);
}

seed()
  .catch((error) => {
    console.error("Seed failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
