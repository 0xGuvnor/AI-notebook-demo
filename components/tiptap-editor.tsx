"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";
import TiptapToolbar from "./tiptap-toolbar";
import { Button } from "./ui/button";
import useDebounce from "@/hooks/useDebounce";
import { useMutation } from "@tanstack/react-query";
import { Note } from "@/lib/db/schema";
import Text from "@tiptap/extension-text";
import { useCompletion } from "ai/react";

interface Props {
  note: Note;
}

function TiptapEditor({ note }: Props) {
  const [editorState, setEditorState] = useState(note.editorState || "");
  const debouncedEditorState = useDebounce(editorState, 500);
  const { complete, completion } = useCompletion({ api: "/api/completion" });
  const lastCompletion = useRef("");

  const saveNote = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/save-note", {
        method: "POST",
        body: JSON.stringify({ noteId: note.id, editorState }),
      });
      if (!res.ok) return undefined;
      const data = await res.json();

      return data;
    },
  });

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Shift-a": () => {
          const prompt = this.editor?.getText();
          complete(prompt);
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor || !completion) return;

    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;

    editor.commands.insertContent(diff);
  }, [completion, editor]);

  useEffect(() => {
    if (debouncedEditorState === "") return;

    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (err) => {
        console.error(err);
      },
    });
  }, [debouncedEditorState]);

  return (
    <>
      <div className="flex">
        <TiptapToolbar editor={editor} />
        <Button disabled variant={"outline"} size={"sm"}>
          {saveNote.isPending ? "Saving..." : "Saved"}
        </Button>
      </div>

      <div className="prose prose-sm mt-4 w-full">
        <EditorContent editor={editor} />
      </div>
      <div className="h-4"></div>
      <span className="text-sm">
        Tip: Press{" "}
        <kbd className="rounded-lg border border-gray-200 bg-gray-100 px-2 py-1.5 font-mono text-xs font-semibold text-gray-800">
          Shift + A
        </kbd>{" "}
        for AI autocomplete
      </span>
    </>
  );
}
export default TiptapEditor;
