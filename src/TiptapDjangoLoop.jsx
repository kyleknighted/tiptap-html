import {useMemo} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { generateJSON } from '@tiptap/html'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Typography from '@tiptap/extension-typography';
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Link from "@tiptap/extension-link";
import {DjangoWrapper} from "./plugins/djangoWrap";

const html = `{% with obj=person.obj %}

<table>
  {% for item in items %}
  <tr>
    <td>{{item.name}}<td/>
    <td>{{item.price}}<td/>
  </tr>
  {% endfor %}
</table>

<a href="https://placehold.co/">
  <img src="https://placehold.co/200x50?text=Unsubscribe" widht="200" height="50" />
</a>

{% endwith %}`

const TiptapMalformedHtml = () => {
  const extensions = [
    Color,
    DjangoWrapper,
    Document,
    Image,
    Link,
    Paragraph,
    Table,
    TableCell,
    TableHeader,
    TableRow,
    Text,
    Text,
    TextStyle,
    Typography,
  ];

  const output = generateJSON(html, extensions);

  const editor = useEditor({
    extensions,
    content: html,
  });

  return (
    <>
    <EditorContent editor={editor} />
    <br/><br/><br/><br/>
    <pre>
      <code>{JSON.stringify(output, null, 2)}</code>
    </pre>
    </>
  );
};

export default TiptapMalformedHtml;
