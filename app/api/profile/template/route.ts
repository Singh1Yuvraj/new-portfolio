import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { templateId } = await request.json();

    if (!templateId) {
      return NextResponse.json({ error: "Template ID is required" }, { status: 400 });
    }

    const validTemplates = ["minimal", "modern", "developer", "creative", "professional", "dark"];
    if (!validTemplates.includes(templateId)) {
      return NextResponse.json({ error: "Invalid Template ID" }, { status: 400 });
    }

    await connectToDatabase();
    
    // Find the user and update the template setting, also track in template history
    const updatedUser = await User.findByIdAndUpdate(
      (session.user as any).id,
      {
        $set: { "settings.template": templateId },
        $addToSet: { "settings.templateHistory": templateId },
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, settings: updatedUser.settings });
  } catch (error: any) {
    console.error("Error updating template:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
