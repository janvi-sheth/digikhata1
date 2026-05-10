import { NextResponse } from "next/server";
import { normalizeScraperPayload, type ScraperPayload } from "@/lib/scrape-normalize";

export const runtime = "nodejs";

type SubmitResponse = {
  jobId?: string;
  id?: string;
  status?: string;
  error?: string;
};

type JobResponse = ScraperPayload & {
  id?: string;
  status?: "pending" | "processing" | "completed" | "failed";
  error?: string | null;
};

const ANAKIN_BASE_URL = "https://api.anakin.io/v1";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isValidHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

async function pollScrapeJob(jobId: string, apiKey: string): Promise<JobResponse> {
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const response = await fetch(`${ANAKIN_BASE_URL}/url-scraper/${jobId}`, {
      headers: { "X-API-Key": apiKey },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Anakin job polling failed with ${response.status}`);
    }

    const payload = (await response.json()) as JobResponse;
    if (payload.status === "completed" || payload.status === "failed") {
      return payload;
    }

    await sleep(900 + attempt * 250);
  }

  return { id: jobId, status: "processing" };
}

export async function POST(request: Request) {
  try {
    const { url } = (await request.json()) as { url?: string };
    if (!url || !isValidHttpUrl(url)) {
      return NextResponse.json({ error: "A valid HTTP or HTTPS URL is required" }, { status: 400 });
    }

    const apiKey = process.env.ANAKIN_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "ANAKIN_API_KEY is not configured", transactions: [] }, { status: 503 });
    }

    const response = await fetch(`${ANAKIN_BASE_URL}/url-scraper`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey
      },
      body: JSON.stringify({
        url,
        country: "in",
        useBrowser: true,
        generateJson: true
      }),
      cache: "no-store"
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Anakin scraper request failed", transactions: [] }, { status: response.status });
    }

    const submitted = (await response.json()) as SubmitResponse;
    const jobId = submitted.jobId ?? submitted.id;
    if (!jobId) {
      return NextResponse.json({ error: "Anakin did not return a scrape job id", transactions: [] }, { status: 502 });
    }

    const payload = await pollScrapeJob(jobId, apiKey);
    if (payload.status !== "completed") {
      return NextResponse.json(
        { error: payload.error ?? "Anakin scrape is still processing", jobId, status: payload.status, transactions: [] },
        { status: payload.status === "failed" ? 502 : 202 }
      );
    }

    const transactions = normalizeScraperPayload(payload);

    return NextResponse.json({ source: url, jobId, transactions });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to scrape URL", transactions: [] },
      { status: 500 }
    );
  }
}
