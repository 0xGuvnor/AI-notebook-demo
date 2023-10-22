import { Editor } from "@tiptap/react";
import TiptapToggle from "./tiptap-toggle";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";

interface Props {
  editor: Editor | null;
}

function TiptapToolbar({ editor }: Props) {
  return (
    <div className="flex flex-wrap gap-1">
      <TiptapToggle
        editor={editor}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        onClick={() => editor?.chain().focus().toggleBold().run()}
        icon={Bold}
        type="bold"
      />
      <TiptapToggle
        editor={editor}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        icon={Italic}
        type="italic"
      />
      <TiptapToggle
        editor={editor}
        disabled={!editor?.can().chain().focus().toggleStrike().run()}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        icon={Strikethrough}
        type="strike"
      />
      <TiptapToggle
        editor={editor}
        disabled={!editor?.can().chain().focus().toggleCode().run()}
        onClick={() => editor?.chain().focus().toggleCode().run()}
        icon={Code}
        type="code"
      />
      <TiptapToggle
        editor={editor}
        disabled={
          !editor?.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        icon={Heading1}
        type="heading"
        typeOptions={{ level: 1 }}
      />
      <TiptapToggle
        editor={editor}
        disabled={
          !editor?.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        icon={Heading2}
        type="heading"
        typeOptions={{ level: 2 }}
      />
      <TiptapToggle
        editor={editor}
        disabled={
          !editor?.can().chain().focus().toggleHeading({ level: 3 }).run()
        }
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
        icon={Heading3}
        type="heading"
        typeOptions={{ level: 3 }}
      />
      <TiptapToggle
        editor={editor}
        disabled={!editor?.can().chain().focus().toggleBulletList().run()}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        icon={List}
        type="bulletList"
      />
      <TiptapToggle
        editor={editor}
        disabled={!editor?.can().chain().focus().toggleOrderedList().run()}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        icon={ListOrdered}
        type="orderedList"
      />
      <TiptapToggle
        editor={editor}
        disabled={!editor?.can().chain().focus().undo().run()}
        onClick={() => editor?.chain().focus().undo().run()}
        icon={Undo}
      />
      <TiptapToggle
        editor={editor}
        disabled={!editor?.can().chain().focus().redo().run()}
        onClick={() => editor?.chain().focus().redo().run()}
        icon={Redo}
      />
    </div>
  );
}
export default TiptapToolbar;
