# Architectural Plan: Automated NPK Tracking Module

## Overview
This document outlines the architecture for an automated NPK tracking module. This feature will allow users to save their calculated fertilizer recipes, log application dates, and track historical nutrient loads across their crops or reservoirs over time.

We will utilize **Supabase** (PostgreSQL + Auth) as the backend, leveraging its seamless integration with Next.js App Router for RESTful data management.

---

## 1. Task Group: Database Schema (Supabase)
We will establish a secure, relational database schema to persist user tracking data.

**Target Files / Setup:**
- `supabase/migrations/00001_create_npk_logs.sql` (If using local Supabase CLI, or run via dashboard)
- **Dependencies Required:** `@supabase/supabase-js`

**Schema Design (`npk_logs` table):**
- `id` (uuid, primary key)
- `user_id` (uuid, references `auth.users`)
- `application_date` (timestamp)
- `use_case` (varchar) - e.g., 'hydroponics', 'turf'
- `fertilizer_id` (varchar) - e.g., 'masterblend_4_18_38'
- `amount_g` (numeric) - Exact mass applied
- `volume_l` (numeric) - Total reservoir or soil area volume
- `target_n`, `target_p`, `target_k` (numeric) - The ratio applied
- `notes` (text) - Optional user observations

---

## 2. Task Group: API Routing & Middleware
Next.js Route Handlers will manage the secure transfer of data between the client and Supabase, enforcing Row Level Security (RLS).

**Target Files:**
- `app/lib/supabase/server.ts` (Supabase Server Client utility)
- `app/api/npk-logs/route.ts` (GET: Fetch user history, POST: Add new log)
- `app/api/npk-logs/[id]/route.ts` (DELETE/PUT: Manage existing logs)
- `middleware.ts` (Update existing proxy to handle Supabase Auth session refreshing)

**Dependencies Required:**
- `@supabase/ssr` (For Next.js App Router cookies handling)

---

## 3. Task Group: Client-side State
A robust data fetching and caching layer to ensure the UI feels instantaneous and reactive.

**Target Files:**
- `app/lib/supabase/client.ts` (Supabase Browser Client)
- `app/hooks/useNpkLogs.ts` (Custom hook abstracting the fetching and mutating logic)

**Dependencies Required:**
- `swr` OR `@tanstack/react-query` (Recommended for caching historical tracking data)

---

## 4. Task Group: Visual UI Components
New interactive components to visualize the agronomic data.

**Target Files:**
- `app/tracker/page.tsx` (Main Dashboard page route for logged-in users)
- `app/components/tracker/NpkHistoryChart.tsx` (A visual line/bar chart showing NPK accumulation over time)
- `app/components/tracker/LogApplicationModal.tsx` (A modal triggered from the `ResultCard` to instantly save a calculation)
- `app/components/ResultCard.tsx` (Modification: Add "💾 Save to Tracker" button)

**Dependencies Required:**
- `recharts` OR `chart.js` (For rendering the `NpkHistoryChart`)
- `lucide-react` (For tracking UI icons)

---

## Pending Approval
**Status: PENDING APPROVAL FLAG** 🚩
I have completed the structural scanning and initialized the PLAN MODE. I will not touch or modify any source files until you review this plan. 

Please review the architectural breakdown above. Let me know if you would like to adjust the database provider, the state management library (SWR vs React Query), or the charting library before we proceed to execution.
