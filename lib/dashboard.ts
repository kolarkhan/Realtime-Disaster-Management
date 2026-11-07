import { subDays } from "date-fns";

import { safePercent } from "@/lib/query-utils";
import { serializeDocument } from "@/lib/serializers";
import { connectToDatabase } from "@/lib/db";
import { Alert } from "@/models/Alert";
import { Assignment } from "@/models/Assignment";
import { Incident } from "@/models/Incident";
import { RescueTeam } from "@/models/RescueTeam";
import { Resource } from "@/models/Resource";
import { User } from "@/models/User";
import { Victim } from "@/models/Victim";

export async function getPlatformOverview() {
  await connectToDatabase();

  const [totalIncidents, activeIncidents, resolvedIncidents, availableTeams, totalResources] = await Promise.all([
    Incident.countDocuments(),
    Incident.countDocuments({ status: { $in: ["reported", "verified", "assigned", "in_progress"] } }),
    Incident.countDocuments({ status: { $in: ["resolved", "closed"] } }),
    RescueTeam.countDocuments({ availabilityStatus: "available" }),
    Resource.aggregate([{ $group: { _id: null, sum: { $sum: "$quantityAvailable" } } }])
  ]);

  return {
    totalIncidents,
    activeIncidents,
    resolvedIncidents,
    availableTeams,
    totalResources: totalResources[0]?.sum ?? 0
  };
}

export async function getAdminDashboardData() {
  await connectToDatabase();

  const sevenDaysAgo = subDays(new Date(), 6);

  const [
    totalIncidents,
    activeIncidents,
    resolvedIncidents,
    highSeverityIncidents,
    availableTeams,
    inventory,
    incidents,
    recentAlerts,
    assignments,
    victims
  ] = await Promise.all([
    Incident.countDocuments(),
    Incident.countDocuments({ status: { $in: ["reported", "verified", "assigned", "in_progress"] } }),
    Incident.countDocuments({ status: { $in: ["resolved", "closed"] } }),
    Incident.countDocuments({ severity: { $in: ["high", "critical"] } }),
    RescueTeam.countDocuments({ availabilityStatus: "available" }),
    Resource.aggregate([{ $group: { _id: null, total: { $sum: "$quantityAvailable" }, allocated: { $sum: "$allocatedQuantity" } } }]),
    Incident.find().populate("reportedBy", "name").sort({ createdAt: -1 }).limit(8).lean(),
    Alert.find().sort({ createdAt: -1 }).limit(5).lean(),
    Assignment.find().populate("teamId", "teamName").sort({ updatedAt: -1 }).limit(6).lean(),
    Victim.find().sort({ createdAt: -1 }).limit(10).lean()
  ]);

  const trendsRaw = await Incident.aggregate([
    { $match: { createdAt: { $gte: sevenDaysAgo } } },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        incidents: { $sum: 1 },
        critical: {
          $sum: {
            $cond: [{ $eq: ["$severity", "critical"] }, 1, 0]
          }
        }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const severityDistribution = await Incident.aggregate([
    { $group: { _id: "$severity", value: { $sum: 1 } } }
  ]);

  const resourceAllocation = await Resource.aggregate([
    {
      $project: {
        name: 1,
        allocated: "$allocatedQuantity",
        available: "$quantityAvailable"
      }
    }
  ]);

  const teamPerformance = await Assignment.aggregate([
    {
      $lookup: {
        from: "rescueteams",
        localField: "teamId",
        foreignField: "_id",
        as: "team"
      }
    },
    { $unwind: "$team" },
    {
      $group: {
        _id: "$team.teamName",
        missions: { $sum: 1 },
        completed: {
          $sum: {
            $cond: [{ $eq: ["$progressStatus", "completed"] }, 1, 0]
          }
        }
      }
    }
  ]);

  return serializeDocument({
    metrics: {
      totalIncidents,
      activeIncidents,
      resolvedIncidents,
      highSeverityIncidents,
      availableTeams,
      resourceInventory: inventory[0]?.total ?? 0,
      allocatedResources: inventory[0]?.allocated ?? 0,
      averageResponseTime: "08m 42s",
      resolutionRate: safePercent(resolvedIncidents, totalIncidents)
    },
    trends: trendsRaw,
    severityDistribution,
    resourceAllocation,
    teamPerformance,
    incidents,
    recentAlerts,
    assignments,
    victims
  });
}

export async function getCitizenDashboardData(userId: string) {
  await connectToDatabase();

  const [totalReports, reports, activeCount, resolvedCount] = await Promise.all([
    Incident.countDocuments({ reportedBy: userId }),
    Incident.find({ reportedBy: userId }).sort({ createdAt: -1 }).limit(6).lean(),
    Incident.countDocuments({ reportedBy: userId, status: { $in: ["reported", "verified", "assigned", "in_progress"] } }),
    Incident.countDocuments({ reportedBy: userId, status: { $in: ["resolved", "closed"] } })
  ]);

  return serializeDocument({
    metrics: {
      totalReports,
      activeCount,
      resolvedCount,
      responseWindow: "12-18 min"
    },
    reports
  });
}

export async function getTeamDashboardData(userId: string) {
  await connectToDatabase();

  const team = await RescueTeam.findOne({ linkedUser: userId }).lean();

  if (!team) {
    return serializeDocument({
      team: null,
      metrics: {
        assignedIncidents: 0,
        activeMissions: 0,
        completedMissions: 0,
        readinessScore: 0
      },
      assignments: []
    });
  }

  const assignments = await Assignment.find({ teamId: team._id })
    .populate("incidentId")
    .sort({ updatedAt: -1 })
    .lean();

  const activeMissions = assignments.filter((item) => ["accepted", "en_route", "in_progress", "rescued"].includes(item.progressStatus)).length;
  const completedMissions = assignments.filter((item) => item.progressStatus === "completed").length;

  return serializeDocument({
    team,
    metrics: {
      assignedIncidents: assignments.length,
      activeMissions,
      completedMissions,
      readinessScore: 92
    },
    assignments
  });
}

export async function listIncidents(filters?: Record<string, unknown>) {
  await connectToDatabase();

  const incidents = await Incident.find(filters ?? {})
    .populate("reportedBy", "name email")
    .populate("assignedTeam", "teamName availabilityStatus")
    .sort({ createdAt: -1 })
    .lean();

  return serializeDocument(incidents);
}

export async function getIncidentById(id: string) {
  await connectToDatabase();

  const [incident, victims, assignments] = await Promise.all([
    Incident.findById(id)
      .populate("reportedBy", "name email phone")
      .populate("assignedTeam", "teamName contactNumber availabilityStatus currentLocation membersCount vehicleType")
      .lean(),
    Victim.find({ incidentId: id }).sort({ createdAt: -1 }).lean(),
    Assignment.find({ incidentId: id }).populate("teamId", "teamName").sort({ updatedAt: -1 }).lean()
  ]);

  if (!incident) {
    return null;
  }

  return serializeDocument({ incident, victims, assignments });
}

export async function getCitizenIncidents(userId: string) {
  await connectToDatabase();
  const incidents = await Incident.find({ reportedBy: userId }).sort({ createdAt: -1 }).lean();
  return serializeDocument(incidents);
}

export async function listTeams() {
  await connectToDatabase();
  const teams = await RescueTeam.find().sort({ teamName: 1 }).lean();
  return serializeDocument(teams);
}

export async function listResources() {
  await connectToDatabase();
  const resources = await Resource.find().sort({ updatedAt: -1 }).lean();
  return serializeDocument(resources);
}

export async function listVictims() {
  await connectToDatabase();
  const victims = await Victim.find().populate("incidentId", "title severity status").sort({ createdAt: -1 }).lean();
  return serializeDocument(victims);
}

export async function listAlerts(role?: string) {
  await connectToDatabase();
  const query = role ? { sentToRole: role } : {};
  const alerts = await Alert.find(query).sort({ createdAt: -1 }).lean();
  return serializeDocument(alerts);
}

export async function listAssignments(teamId?: string) {
  await connectToDatabase();
  const query = teamId ? { teamId } : {};
  const assignments = await Assignment.find(query)
    .populate("incidentId")
    .populate("teamId", "teamName")
    .sort({ updatedAt: -1 })
    .lean();
  return serializeDocument(assignments);
}

export async function getAdminSettingsSummary() {
  await connectToDatabase();

  const [userCount, teamCount, incidentCount, alertCount] = await Promise.all([
    User.countDocuments(),
    RescueTeam.countDocuments(),
    Incident.countDocuments(),
    Alert.countDocuments()
  ]);

  return {
    userCount,
    teamCount,
    incidentCount,
    alertCount,
    integrations: {
      mapsConfigured: Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
      smsConfigured: Boolean(process.env.TWILIO_ACCOUNT_SID),
      emailConfigured: Boolean(process.env.SMTP_HOST)
    }
  };
}


