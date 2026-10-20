import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const buildSettings = await request.json();
    const url = `${process.env.API_URL}api/build/`;
    const res = await axios.post(url, buildSettings);
    const cookiesStore = await cookies();
    cookiesStore.set("buildSettings", JSON.stringify(buildSettings))
    return NextResponse.json(res.data);
}
