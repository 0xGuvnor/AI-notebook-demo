import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateImage, generateImagePrompt } from "@/lib/openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { name } = await req.json();

  const imageDescription = await generateImagePrompt(name);

  if (!imageDescription) {
    return new NextResponse("Failed to generate image description", {
      status: 500,
    });
  }

  const imageUrl = await generateImage(imageDescription);

  if (!imageUrl) {
    return new NextResponse("Failed to generate image", {
      status: 500,
    });
  }

  const note = await db
    .insert($notes)
    .values({ name, userId, imageUrl })
    .returning({ insertedId: $notes.id });

  return NextResponse.json({ noteId: note[0].insertedId });
}
