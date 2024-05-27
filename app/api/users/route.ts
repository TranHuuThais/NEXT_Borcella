import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse(
        JSON.stringify({ message: "Unauthorized" }),
        { status: 401 }
      );
    }

    await connectToDB();

    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      user = await User.create({ clerkId: userId });
      await user.save();
    }

    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (err) {
    console.error("[users_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
