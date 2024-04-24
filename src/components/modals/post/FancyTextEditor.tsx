import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { ImBold } from "react-icons/im";
import { LuItalic } from "react-icons/lu";
import { MdFormatUnderlined } from "react-icons/md";
import { RiStrikethrough } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { MdFormatQuote } from "react-icons/md";
import { PiListBulletsBold } from "react-icons/pi";
import { GoListOrdered } from "react-icons/go";
import { TbSubscript } from "react-icons/tb";
import { TbSuperscript } from "react-icons/tb";
import { BsThreeDots } from "react-icons/bs";
import { LuLink2 } from "react-icons/lu";
import { LuLink2Off } from "react-icons/lu";
import { MdFormatAlignLeft } from "react-icons/md";
import { MdOutlineFormatAlignRight } from "react-icons/md";
import { MdOutlineFormatAlignCenter } from "react-icons/md";
import { MdOutlineFormatAlignJustify } from "react-icons/md";
import { GrUndo } from "react-icons/gr";
import { GrRedo } from "react-icons/gr";
import { RiFontSize2 } from "react-icons/ri";

interface FancyTextEditorProps {
  content: string;
  setContent: (content: string) => void;
  setHTMLbody: (body: any) => void;
  formDisabled: boolean;
}

export default function FancyTextEditor({
  content,
  setContent,
  setHTMLbody,
  formDisabled,
}: FancyTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      // TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder: "Text (optional)" }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getText());
      setHTMLbody(editor.getHTML());
    },
    editable: !formDisabled,
  });

  const fancyToolStyle = {
    border: "none",
    width: "32px",
    height: "32px",
  };

  return (
    <div className="tiptap-editor">
      <RichTextEditor editor={editor} className="bg-dark-850">
        <RichTextEditor.Toolbar
          sticky
          p={0}
          className="h-fit m-2 -mb-2 border-none bg-inherit"
        >
          <RichTextEditor.Bold icon={ImBold} style={fancyToolStyle} />
          <RichTextEditor.Italic icon={LuItalic} style={fancyToolStyle} />
          <RichTextEditor.Underline
            icon={MdFormatUnderlined}
            style={fancyToolStyle}
          />
          <RichTextEditor.Strikethrough
            icon={RiStrikethrough}
            style={fancyToolStyle}
          />
          <RichTextEditor.Subscript icon={TbSubscript} style={fancyToolStyle} />
          <RichTextEditor.Superscript
            icon={TbSuperscript}
            style={fancyToolStyle}
          />
          <RichTextEditor.Code icon={FaCode} style={fancyToolStyle} />
          <RichTextEditor.H2 icon={RiFontSize2} style={fancyToolStyle} />
          <RichTextEditor.Link icon={LuLink2} style={fancyToolStyle} />
          <RichTextEditor.Unlink icon={LuLink2Off} style={fancyToolStyle} />
          <RichTextEditor.Blockquote
            icon={MdFormatQuote}
            style={fancyToolStyle}
          />
          <RichTextEditor.Hr icon={BsThreeDots} style={fancyToolStyle} />
          <RichTextEditor.BulletList
            icon={PiListBulletsBold}
            style={fancyToolStyle}
          />
          <RichTextEditor.OrderedList
            icon={GoListOrdered}
            style={fancyToolStyle}
          />
          {/* <RichTextEditor.AlignLeft
            icon={MdFormatAlignLeft}
            style={fancyToolStyle}
          />
          <RichTextEditor.AlignCenter
            icon={MdOutlineFormatAlignCenter}
            style={fancyToolStyle}
          />
          <RichTextEditor.AlignJustify
            icon={MdOutlineFormatAlignJustify}
            style={fancyToolStyle}
          />
          <RichTextEditor.AlignRight
            icon={MdOutlineFormatAlignRight}
            style={fancyToolStyle}
          /> */}
          <RichTextEditor.Undo icon={GrUndo} style={fancyToolStyle} />
          <RichTextEditor.Redo icon={GrRedo} style={fancyToolStyle} />
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content bg={"dark"} className="text-lg" mih={95} />
      </RichTextEditor>
      {/* <span className={`inline-block w-full text-end opacity-75`}>
        {content?.length}/10000
      </span> */}
    </div>
  );
}
