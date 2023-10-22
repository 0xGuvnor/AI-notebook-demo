import DeleteNotebook from "@/components/delete-notebook";
import TiptapEditor from "@/components/tiptap-editor";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {
  params: { noteId: string };
}

async function NoteIdPage({ params: { noteId } }: Props) {
  const { userId } = auth();
  if (!userId) {
    redirect("/dashboard");
  }

  const user = await currentUser();

  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

  if (notes.length !== 1) {
    redirect("/dashboard");
  }

  const note = notes[0];

  return (
    <main className="grainy min-h-screen p-8">
      <div className="mx-auto max-w-4xl space-y-4">
        <div className="flex items-center gap-3 rounded-lg border border-stone-200 p-4 shadow-xl">
          <Button asChild size={"sm"} className="bg-green-600">
            <Link href={"/dashboard"}>Back</Link>
          </Button>

          <div className="flex items-center gap-1">
            <span className="font-semibold">
              {user?.firstName} {user?.lastName}
            </span>

            <span>/</span>
            <span className="font-semibold text-stone-500">{note.name}</span>
          </div>

          <div className="ml-auto">
            <DeleteNotebook noteId={noteId} />
          </div>
        </div>

        <div className="w-full rounded-lg border border-stone-200 px-16 py-8 shadow-xl">
          <TiptapEditor note={note} />
        </div>
      </div>
    </main>
  );
}
export default NoteIdPage;
