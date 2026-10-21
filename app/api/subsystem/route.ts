import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { namesAndIds } from "@/app/utils/namesAndIds";
import { type BuildSettings } from "@/app/utils/user_settings";

export async function POST(request: NextRequest): Promise<NextResponse> {
    let data: {
        id: number,
        settings: BuildSettings
    };
    
    try {
        data = await request.json();
    }
    catch {
        if(request.signal.aborted){
            return new NextResponse(null, { status: 499 });
        }
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const name = namesAndIds.find((subsystem) => subsystem.id === data.id)?.name;
    const url = `${process.env.API_URL}api/subsystem/${data.id}`;

    const storedSettings = data.settings;

    storedSettings.defensiveVolume = 1;
    storedSettings.coreVolume = 1;
    storedSettings.propulsionVolume = 1;
    storedSettings.offensiveVolume = 1;

    try {
        const res = await axios.post(url, {...storedSettings, name}, {signal: request.signal});
        return NextResponse.json(res.data);
    }
    catch (err) {
        if(axios.isCancel(err)) return new NextResponse(null, {status: 499});
        throw err;
    }
}
