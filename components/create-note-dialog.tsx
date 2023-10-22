"use client";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {}

const CreateNoteDialog = (props: Props) => {
  const router = useRouter();
  const [input, setInput] = useState("");

  const uploadToFirebase = useMutation({
    mutationFn: async (noteId: string) => {
      const res = await fetch("/api/save-thumbnail", {
        method: "POST",
        body: JSON.stringify({ noteId }),
      });
      if (!res.ok) return undefined;
      const data = await res.json();

      return data;
    },
  });

  const createNotebook = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/create-notebook", {
        method: "POST",
        body: JSON.stringify({ name: input }),
      });
      if (!res.ok) return undefined;
      const data = await res.json();

      return data;
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) {
      window.alert("Please enter a name for your notebook.");
      return;
    }

    createNotebook.mutate(undefined, {
      onSuccess: ({ noteId }) => {
        console.log(`Created new notebook: ${noteId}`);
        uploadToFirebase.mutate(noteId);
        router.push(`/notebook/${noteId}`);
      },
      onError: (err) => {
        console.error(err);
        window.alert("Failed to create notebook");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={cn(
            "flex h-full flex-row items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-600 p-4 transition",
            "hover:-translate-y-1 hover:shadow-xl",
            "sm:flex-col sm:gap-2",
          )}
        >
          <Plus className="h-6 w-6 text-green-600" strokeWidth={3} />
          <h2 className={cn("font-semibold text-green-600")}>New Notebook</h2>
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Notebook</DialogTitle>
          <DialogDescription>Create a new notebook.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Name..."
          />
          <div className="flex items-center gap-2">
            <Button variant={"secondary"} type="reset">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createNotebook.isPending}
              className="bg-green-600"
            >
              {createNotebook.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateNoteDialog;
