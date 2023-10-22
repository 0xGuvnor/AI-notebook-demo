"use client";

import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface Props {
  noteId: string;
}

function DeleteNotebook({ noteId }: Props) {
  const router = useRouter();

  const handleDelete = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/delete-note", {
        method: "POST",
        body: JSON.stringify({ noteId }),
      });
      if (!res.ok) return;
      const data = await res.json();

      return data;
    },
  });

  return (
    <Button
      variant={"destructive"}
      size={"sm"}
      disabled={handleDelete.isPending}
      onClick={() => {
        const confirm = window.confirm("Are you sure you want to delete?");
        if (!confirm) return;

        handleDelete.mutate(undefined, {
          onSuccess: () => {
            router.push("/dashboard");
          },

          onError: (err) => {
            console.error(err);
          },
        });
      }}
    >
      <Trash2 />
    </Button>
  );
}
export default DeleteNotebook;
