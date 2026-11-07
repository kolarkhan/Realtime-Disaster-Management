import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!lat || !lng) {
    return NextResponse.json({ error: "Latitude and longitude are required." }, { status: 400 });
  }

  if (!apiKey) {
    return NextResponse.json({ error: "Google Maps API key is not configured." }, { status: 500 });
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${encodeURIComponent(`${lat},${lng}`)}&key=${encodeURIComponent(apiKey)}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Unable to reach Google Maps Geocoding API." }, { status: 502 });
    }

    const payload = (await response.json()) as {
      status?: string;
      results?: Array<{ formatted_address?: string }>;
      error_message?: string;
    };

    if (payload.status !== "OK" || !payload.results?.length) {
      return NextResponse.json(
        { error: payload.error_message ?? "No address found for the current coordinates." },
        { status: 404 }
      );
    }

    return NextResponse.json({ address: payload.results[0].formatted_address });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Reverse geocoding failed." },
      { status: 500 }
    );
  }
}
