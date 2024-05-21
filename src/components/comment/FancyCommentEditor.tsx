import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { ImBold } from "react-icons/im";
import { LuItalic } from "react-icons/lu";
import { MdFormatUnderlined } from "react-icons/md";
import { RiStrikethrough } from "react-icons/ri";
import { FaCode } from "react-icons/fa6";
import { TbSubscript } from "react-icons/tb";
import { TbSuperscript } from "react-icons/tb";
import { LuLink2 } from "react-icons/lu";
import { LuLink2Off } from "react-icons/lu";
import { RiFontSize2 } from "react-icons/ri";

interface FancyCommentEditorProps {
  setHTMLComment: (body: any) => void;
  formDisabled: boolean;
  setControlsVisible: (visible: boolean) => void;
  toolbarVisible: boolean;
  clearForm: boolean;
  placeholder?: string;
  autofocus?: boolean;
  setClearForm: (clear: boolean) => void;
}

export default function FancyCommentEditor({
  setHTMLComment,
  formDisabled,
  setControlsVisible,
  toolbarVisible,
  clearForm,
  placeholder,
  autofocus,
  setClearForm,
}: FancyCommentEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Placeholder.configure({ placeholder: placeholder }),
      CharacterCount.configure({
        limit: 1000,
      }),
    ],
    onUpdate({ editor }) {
      setHTMLComment(editor.getHTML());
    },
    onFocus() {
      setClearForm(false);
      setControlsVisible(true);
    },
    editable: !formDisabled,
  });

  clearForm && editor?.commands.clearContent();
  autofocus && editor?.commands.focus();

  const fancyToolStyle = {
    border: "none",
    width: "32px",
    height: "32px",
    backgroundColor: "transparent",
  };

  return (
    <div className="tiptap-editor">
      <RichTextEditor
        editor={editor}
        className="bg-dark-850 rounded-xl border-none overflow-hidden"
      >
        {toolbarVisible && (
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
            <RichTextEditor.Subscript
              icon={TbSubscript}
              style={fancyToolStyle}
            />
            <RichTextEditor.Superscript
              icon={TbSuperscript}
              style={fancyToolStyle}
            />
            <RichTextEditor.Code icon={FaCode} style={fancyToolStyle} />
            <RichTextEditor.H2 icon={RiFontSize2} style={fancyToolStyle} />
            <RichTextEditor.Link icon={LuLink2} style={fancyToolStyle} />
            <RichTextEditor.Unlink icon={LuLink2Off} style={fancyToolStyle} />
          </RichTextEditor.Toolbar>
        )}
        <RichTextEditor.Content bg={"dark"} />
      </RichTextEditor>
    </div>
  );
}
