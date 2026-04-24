import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/mongodb";
import Feedback from "../../../model/Feedback";
import { logError } from "../../../lib/logger";

export async function POST(request) {
    let hasEmail = false;
    try {
        const { text, email } = await request.json();
        hasEmail = !!email;

        if (!text) {
            return NextResponse.json({ message: "Feedback text is required" }, { status: 400 });
        }

        await connectMongoDB();
        await Feedback.create({ text, email });

        return NextResponse.json({ message: "Feedback submitted successfully" }, { status: 201 });
    } catch (error) {
        logError("feedback.post.failed", error, { route: "feedback", hasEmail });
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
