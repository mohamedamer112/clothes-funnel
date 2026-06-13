import { NextRequest, NextResponse } from "next/server";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbxdeAj9euJNjI6LCJuerH4S7-Z0SBq86RIEJTALcpYtWg63XmYQvkdbxkOeuFn-4_vF/exec";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const formBody = new URLSearchParams();
    formBody.append("name", body.name || "");
    formBody.append("phone", body.phone || "");
    formBody.append("email", body.email || "");
    formBody.append("message", body.message || "");

    const response = await fetch(SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody.toString(),
    });

    if (response.ok || response.type === "opaque") {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
