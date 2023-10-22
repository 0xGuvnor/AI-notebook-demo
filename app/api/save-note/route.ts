import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    let { noteId, editorState } = await req.json();

    if (!noteId || !editorState) {
      return new NextResponse("Incomplete information", { status: 400 });
    }

    noteId = parseInt(noteId);

    const notes = await db.select().from($notes).where(eq($notes.id, noteId));
    if (notes.length !== 1) {
      return new NextResponse("Failed to update", { status: 500 });
    }

    const note = notes[0];
    if (note.editorState !== editorState) {
      await db.update($notes).set({ editorState }).where(eq($notes.id, noteId));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse("Error", { status: 500 });
  }
}
