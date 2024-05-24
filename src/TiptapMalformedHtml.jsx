import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

const TiptapMalformedHtml = () => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Color],
    content: `
    <div>
      <p>
        <span>Can you believe this happens?
      </p>
      <p>
        <span style="color:#f00">Someone who doesn't close a tag?!</span>
      </p>
      <ul>
        <li>List item 1
        <li>List item 2
        <li>List item 3
      </ul>
    </div>`,
  });

  return <EditorContent editor={editor} />;
};

export default TiptapMalformedHtml;
