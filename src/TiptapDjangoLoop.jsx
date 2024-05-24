import { useEditor, EditorContent } from "@tiptap/react";
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

const TiptapMalformedHtml = () => {
  const editor = useEditor({
    extensions: [
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
    ],
    content: `{% with obj=person.obj %}

    <table>
      {% for item in items %}
      <tr>
        <td>{{item.name}}<td/>
        <td>{{item.price}}<td/>
      </tr>
      {% endfor %}
    </table>

    <a href="{% unsubscribe_link %}">
      <img src="https://placehold.co/200x50?text=Unsubscribe&param={{ obj|lookup:'prop'|replace_first:'%|@'trim }}" />
    </a>

    {% endwith %}`,
  });

  return <EditorContent editor={editor} />;
};

export default TiptapMalformedHtml;
