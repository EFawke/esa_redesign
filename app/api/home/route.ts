import axios from "axios"
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest):Promise<NextResponse>{
    const data = await request.json();
    try {
        const res = await axios.post(`${process.env.API_URL}api/home`, { tradeHub: data.hub, page: data.page });
        return NextResponse.json(res.data);
    }
    catch(err) {
        console.error(err);
        return NextResponse.json({error: "Failed to fetch subsystem data"}, {status: 502});
    }
}