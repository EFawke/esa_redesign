import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { namesAndIds } from "@/app/utils/namesAndIds";
import {type BuildSettings, DEFAULT_SETTINGS} from "@/app/utils/user_settings";

export async function POST(request: NextRequest): Promise<NextResponse> {
    let data: {id: number};
    
    try {
        data = await request.json();
    }
    catch {
        if(request.signal.aborted){
            return new NextResponse(null, { status: 499 });
        }
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    
    const cookieStore = await cookies();
    const stored = cookieStore.get("buildSettings");
    const settings: BuildSettings = stored ? JSON.parse(stored.value) : DEFAULT_SETTINGS;
    if(!stored) cookieStore.set('buildSettings', JSON.stringify(DEFAULT_SETTINGS));

    const name = namesAndIds.find((subsystem) => subsystem.id === data.id)?.name;
    const url = `${process.env.API_URL}api/subsystem/${data.id}`;

    settings.defensiveVolume = 1;
    settings.coreVolume = 1;
    settings.propulsionVolume = 1;
    settings.offensiveVolume = 1;

    try {
        const res = await axios.post(url, {...settings, name}, {signal: request.signal});
        return NextResponse.json(res.data);
    }
    catch (err) {
        if(axios.isCancel(err)) return new NextResponse(null, {status: 499});
        throw err;
    }
}
