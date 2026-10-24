import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const buildSettings = await request.json();
        const cookiesStore = await cookies();
        cookiesStore.set("buildSettings", JSON.stringify(buildSettings))
        return NextResponse.json({response: "ok"});
    }
    catch(err){
        return NextResponse.json({response: "err", message: err})
    }
}
