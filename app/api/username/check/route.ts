import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { username } = await request.json();

    if (!username || typeof username !== "string") {
      return NextResponse.json({ error: "Invalid username" }, { status: 400 });
    }

    // Basic regex: only allow letters, numbers, and hyphens/underscores
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

    await connectToDatabase();

    // Check if username is already taken by ANOTHER user
    const existingUser = await User.findOne({ username: username.toLowerCase() });
    
    if (existingUser) {
      // If it exists, check if it belongs to the current user (case insensitive)
      const currentUserId = (session.user as any).id;
      if (existingUser._id.toString() === currentUserId) {
        return NextResponse.json({ available: true, message: "This is your current username" });
      }
      return NextResponse.json({ available: false, error: "Username is already taken" });
    }

    return NextResponse.json({ available: true });
  } catch (error: any) {
    console.error("Error checking username:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
