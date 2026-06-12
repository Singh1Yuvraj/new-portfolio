import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findById((session.user as any).id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !(session.user as any).id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const currentUserId = (session.user as any).id;

    await connectToDatabase();

    // If username is being updated, perform availability checks
    if (body.username !== undefined) {
      const username = body.username.trim().toLowerCase();
      
      if (username) {
        const usernameRegex = /^[a-zA-Z0-9-_]+$/;
        if (!usernameRegex.test(username)) {
          return NextResponse.json(
            { error: "Username can only contain alphanumeric characters, hyphens, and underscores." },
            { status: 400 }
          );
        }

        if (username.length < 3 || username.length > 20) {
          return NextResponse.json(
            { error: "Username must be between 3 and 20 characters." },
            { status: 400 }
          );
        }

        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== currentUserId) {
          return NextResponse.json({ error: "Username is already taken" }, { status: 400 });
        }
        
        body.username = username;
      } else {
        // If they send empty username, check if they already had one (don't allow unsetting if already set)
        const currentUserDoc = await User.findById(currentUserId);
        if (currentUserDoc?.username) {
          return NextResponse.json({ error: "Username cannot be empty once set" }, { status: 400 });
        }
      }
    }

    // Prepare update data payload
    const updateData: any = {};
    if (body.username !== undefined) updateData.username = body.username;
    if (body.profile !== undefined) updateData.profile = body.profile;
    if (body.skills !== undefined) updateData.skills = body.skills;
    if (body.projects !== undefined) updateData.projects = body.projects;
    if (body.experience !== undefined) updateData.experience = body.experience;
    if (body.education !== undefined) updateData.education = body.education;
    if (body.socials !== undefined) updateData.socials = body.socials;
    if (body.settings !== undefined) updateData.settings = body.settings;

    const updatedUser = await User.findByIdAndUpdate(
      currentUserId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("Error updating user profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
