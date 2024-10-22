import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { useEditor } from "@tiptap/react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { ImBold } from "react-icons/im";
import { LuItalic } from "react-icons/lu";
import { MdFormatUnderlined } from "react-icons/md";
import { RiStrikethrough } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { MdFormatQuote } from "react-icons/md";
import { TbSubscript } from "react-icons/tb";
import { TbSuperscript } from "react-icons/tb";
import { LuLink2 } from "react-icons/lu";
import { LuLink2Off } from "react-icons/lu";
import { GrUndo } from "react-icons/gr";
import { GrRedo } from "react-icons/gr";
import { RiFontSize2 } from "react-icons/ri";
import { post } from "../lang_modals";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useWindowSize } from "../../../contexts/WindowSizeContext";

interface FancyTextEditorProps {
  content: string;
  setBody: (text: string) => void;
  setHTMLbody: (body: any) => void;
  formDisabled: boolean;
}

export default function FancyTextEditor({
  content,
  setBody,
  setHTMLbody,
  formDisabled,
}: FancyTextEditorProps) {
  const { language } = useLanguage();
  const isSmall = useWindowSize().screenWidth < 768;

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Placeholder.configure({
        placeholder: post.textpost_placeholder[language],
      }),
      CharacterCount.configure({
        limit: 10000,
      }),
    ],
    content,
    onUpdate({ editor }) {
      setBody(editor.getText());
      setHTMLbody(editor.getHTML());
    },
    editable: !formDisabled,
  });

  const fancyToolStyle = {
    border: "none",
    width: isSmall ? "26px" : "32px",
    height: isSmall ? "26px" : "32px",
    backgroundColor: "transparent",
  };

  return (
    <div className="tiptap-editor">
      <RichTextEditor editor={editor} className="bg-dark-850">
        <RichTextEditor.Toolbar
          sticky
          p={0}
          className="m-2 -mb-2 border-none bg-inherit"
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

          <RichTextEditor.Undo icon={GrUndo} style={fancyToolStyle} />
          <RichTextEditor.Redo icon={GrRedo} style={fancyToolStyle} />
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content bg={"dark"} className="sm:text-lg" mih={95} />
      </RichTextEditor>
    </div>
  );
}
