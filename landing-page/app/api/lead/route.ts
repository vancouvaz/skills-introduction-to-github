/**
 * /api/lead — Email capture API route
 *
 * Dev mode: stores leads to ./data/leads.json (created automatically)
 * Production: swap the storage backend to Supabase by setting
 *   SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.
 *
 * Set NEXT_PUBLIC_USE_API_ROUTE=true in .env.local to use this route
 * instead of the Formspree backendless option.
 */

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface LeadPayload {
  email: string;
  priceBand?: string;
}

interface Lead {
  id: string;
  email: string;
  priceBand: string;
  createdAt: string;
  ip?: string;
  referrer?: string;
}

// ─── Storage backend ─────────────────────────────────────────────────────────

async function storeLeadLocal(lead: Lead): Promise<void> {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "leads.json");

  // Ensure data/ directory exists
  await fs.mkdir(dataDir, { recursive: true });

  // Read existing
  let leads: Lead[] = [];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    leads = JSON.parse(raw) as Lead[];
  } catch {
    // File doesn't exist yet — start fresh
  }

  // Deduplicate by email
  const alreadyExists = leads.some(
    (l) => l.email.toLowerCase() === lead.email.toLowerCase()
  );
  if (!alreadyExists) {
    leads.push(lead);
    await fs.writeFile(filePath, JSON.stringify(leads, null, 2), "utf-8");
  }
}

async function storeLeadSupabase(lead: Lead): Promise<void> {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase env vars not configured");
  }

  const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email: lead.email,
      price_band: lead.priceBand,
      created_at: lead.createdAt,
      referrer: lead.referrer,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed: ${res.status} ${text}`);
  }
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Rate limit hint — implement real rate limiting via middleware or Upstash in prod
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const payload = body as Partial<LeadPayload>;

  // Validate
  if (!payload.email || typeof payload.email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const email = payload.email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const lead: Lead = {
    id: crypto.randomUUID(),
    email,
    priceBand: payload.priceBand?.trim() ?? "",
    createdAt: new Date().toISOString(),
    ip,
    referrer: request.headers.get("referer") ?? "",
  };

  try {
    // Use Supabase if configured, otherwise fall back to local JSON
    if (process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      await storeLeadSupabase(lead);
    } else {
      await storeLeadLocal(lead);
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("[/api/lead] Storage error:", err);
    return NextResponse.json(
      { error: "Failed to save lead. Please try again." },
      { status: 500 }
    );
  }
}

// Reject non-POST
export async function GET(): Promise<NextResponse> {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
