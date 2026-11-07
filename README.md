# Real-Time Disaster Management & Rescue Coordination Platform

A production-style final year project scaffold built with Next.js App Router, TypeScript, Tailwind CSS, MongoDB, Mongoose, JWT auth, and Socket.io.

## Stack

- Next.js 15.5.3 with App Router
- React 19.1.1
- TypeScript
- Tailwind CSS
- MongoDB with Mongoose
- JWT auth with role-based middleware protection
- Socket.io for realtime updates
- Zod + react-hook-form for validation and forms
- Recharts for analytics widgets
- Lucide icons and Sonner toasts

## Features

- Public landing, login, signup, incident reporting, tracking, and emergency guide pages
- Citizen dashboard with report history and status tracking
- Admin control room dashboard with analytics, incident triage, team assignment, victim tracking, resources, alerts, and settings
- Rescue team dashboard with assignment queue, mission detail view, live status updates, and field resource visibility
- Realtime refresh hooks for incident creation, assignment changes, mission updates, alerts, and resource changes
- Seed script with demo users, incidents, victims, resources, assignments, and alerts
- TODO-ready integration points for Google Maps, Twilio, and SMTP email

## Folder Structure

```text
app/
  api/
  admin/
  citizen/
  team/
components/
  charts/
  dashboard/
  forms/
  layout/
  ui/
data/
hooks/
lib/
models/
public/
scripts/
types/
server.ts
```

## Setup

1. Install dependencies.

```bash
npm install
```

2. Copy `.env.example` to `.env` and fill in at least:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/disaster-management
JWT_SECRET=replace-with-a-long-random-secret
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

3. Seed the database.

```bash
npm run seed
```

4. Start development.

```bash
npm run dev
```

5. Open `http://localhost:3000`.

## Demo Credentials

- Admin: `admin@rescuegrid.demo` / `Admin123!`
- Rescue Team: `team@rescuegrid.demo` / `Team123!`
- Citizen: `citizen@rescuegrid.demo` / `Citizen123!`

## Scripts

- `npm run dev` starts the custom Next.js + Socket.io development server
- `npm run build` builds the Next.js app
- `npm run start` starts the production server through `server.ts`
- `npm run seed` resets and seeds demo data
- `npm run lint` runs Next.js linting

## Architecture Summary

- `server.ts`: custom HTTP server that hosts Next.js and Socket.io together so App Router pages and route handlers can emit realtime events.
- `app/api/*`: route handlers for auth, incidents, assignments, victims, teams, resources, and alerts.
- `lib/db.ts`: cached Mongoose connection utility that avoids hot-reload duplication.
- `lib/auth.ts`: password hashing, JWT signing and verification, cookie handling, and server auth guards.
- `middleware.ts`: prefix-based route protection with lightweight JWT payload inspection.
- `lib/dashboard.ts`: shared query layer for dashboards and server-rendered pages.
- `components/layout/dashboard-shell.tsx`: role-aware shell with sidebar, top navbar, alerts, theme toggle, logout, and realtime refresh hook.

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: secret used to sign JWT session cookies
- `NEXT_PUBLIC_APP_URL`: public app base URL
- `NEXT_PUBLIC_SOCKET_URL`: Socket.io server URL
- `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: TODO for real map integration
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`: TODO for SMS integration
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM`: TODO for email integration

## Integration TODOs

- Google Maps: use `components/dashboard/map-placeholder.tsx` as the swap point for a live map implementation.
- Twilio: extend `lib/notifications.ts` and admin alert flows.
- Email: extend `lib/notifications.ts` with SMTP or Nodemailer transport.

## Notes

- The app uses server-rendered dashboards where helpful and client components for forms, dialogs, theme switching, realtime subscriptions, and charts.
- Middleware does a lightweight role check, while full JWT verification happens server-side before sensitive data is used.
- Run the seed script before exploring dashboards to ensure every page has presentation-ready data.
