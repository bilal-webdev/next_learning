import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/connection/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password ")

        return NextResponse.json({ message: "User found successgully", data: user, success: true })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}