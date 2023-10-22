import CreateNoteDialog from "@/components/create-note-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

interface Props {}

const DashboardPage = async (props: Props) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const notes = await db.select().from($notes).where(eq($notes.userId, userId));

  return (
    <>
      <div className="grainy min-h-screen">
        <div className="mx-auto max-w-7xl p-10">
          <div className="h-14"></div>
          <div
            className={cn(
              "flex flex-col items-center justify-between",
              "md:flex-row",
            )}
          >
            <div className="flex items-center gap-4">
              <Button
                asChild
                size={"sm"}
                className="bg-green-600 hover:bg-green-500"
              >
                <Link href={"/"}>
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back
                </Link>
              </Button>

              <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>

              <UserButton />
            </div>
          </div>

          <Separator className="my-8" />
          {notes.length === 0 && (
            <div className="text-center">
              <h2 className="text-xl text-gray-500">You have no notes yet.</h2>
            </div>
          )}

          <div
            className={cn(
              "grid grid-cols-1 gap-3",
              "sm:grid-cols-3",
              "md:grid-cols-5",
            )}
          >
            <CreateNoteDialog />
            {notes.map((note) => (
              <Link key={note.id} href={`/notebook/${note.id}`}>
                <div
                  className={cn(
                    "flex flex-col overflow-hidden rounded-lg border border-stone-200 transition",
                    "hover:-translate-y-1 hover:shadow-xl",
                  )}
                >
                  <img
                    src={
                      note.imageUrl ||
                      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png"
                    }
                    alt={note.name}
                    width={400}
                    height={200}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {note.name}
                    </h3>
                    <div className="h-1"></div>
                    <p className="text-sm text-gray-500">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardPage;
