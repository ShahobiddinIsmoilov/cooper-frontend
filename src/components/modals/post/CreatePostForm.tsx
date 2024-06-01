import { Stack, Group, Button, Text } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { post } from "../lang_modals";
import { useLanguage } from "../../../contexts/LanguageContext";
import { IoMdClose } from "react-icons/io";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { ImSpinner4 } from "react-icons/im";
import validator from "validator";
import CommunityCombobox from "./CommunityCombobox";
import FancyTextEditor from "./FancyTextEditor";
import PostTitle from "./PostTitle";
import ImageDrop from "./ImageDrop";
import LinkInput from "./LinkInput";
import UserAvatar from "./UserAvatar";

interface Props {
  communityAvatar?: string;
  communityName: string | undefined;
  postType: string;
  title: string;
  body: string;
  formDisabled: boolean;
  image: FileWithPath | null;
  link: string;
  linkRaw: string;
  titleChanged: boolean;
  setCommunityId: (value: number) => void;
  setCommunityAvatar: (value: string) => void;
  setCommunityName: (value: string) => void;
  setTitle: (value: string) => void;
  setBody: (value: string) => void;
  setHTMLbody: (value: string) => void;
  handleSubmit: (value: any) => void;
  closeForm: () => void;
  setImage: (image: FileWithPath) => void;
  setLink: (link: string) => void;
  setLinkRaw: (link: string) => void;
  setTitleChanged: (value: boolean) => void;
}

export default function CreatePostForm(props: Props) {
  const { language } = useLanguage();
  const isSmall = useWindowSize().screenWidth < 768;
  let safeToPost =
    props.title.length > 0 &&
    props.communityAvatar != undefined &&
    !props.formDisabled;
  if (props.postType === "image" && !props.image) safeToPost = false;
  if (props.postType === "link" && !validator.isURL(props.linkRaw))
    safeToPost = false;

  return (
    <form onSubmit={(e) => props.handleSubmit(e)}>
      <Stack
        gap={0}
        pt={isSmall ? 4 : "md"}
        px={isSmall ? 0 : "md"}
        className="h-screen sm:h-fit mb-1"
      >
        <div className="xs:flex justify-between items-center mb-4 xs:mb-6">
          <div className="flex justify-between items-center mb-6 xs:mb-0">
            <div className="flex items-center gap-3">
              <UserAvatar size={isSmall ? 32 : 48} />
              <Text className="text-lg sm:text-xl font-bold">
                {post.new_post[language]}
              </Text>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                props.closeForm();
              }}
              className="p-2 bg-dark-750 rounded-full xs:hidden"
            >
              <IoMdClose size={20} />
            </button>
          </div>
          <CommunityCombobox
            communityName={props.communityName}
            communityAvatar={props.communityAvatar}
            setCommunityId={props.setCommunityId}
            setCommunityAvatar={props.setCommunityAvatar}
            setCommunityName={props.setCommunityName}
          />
        </div>
        <div className="mb-3 sm:mb-4">
          <PostTitle
            title={props.title}
            setTitle={props.setTitle}
            setTitleChanged={props.setTitleChanged}
            formDisabled={props.formDisabled}
          />
        </div>
        <div className="mb-4">
          {props.postType === "text" ? (
            <FancyTextEditor
              content={props.body}
              setBody={props.setBody}
              setHTMLbody={props.setHTMLbody}
              formDisabled={props.formDisabled}
            />
          ) : props.postType === "image" ? (
            <ImageDrop image={props.image} setImage={props.setImage} />
          ) : (
            <LinkInput
              link={props.link}
              setLink={props.setLink}
              setLinkRaw={props.setLinkRaw}
              title={props.title}
              setTitle={props.setTitle}
              titleChanged={props.titleChanged}
              formDisabled={props.formDisabled}
            />
          )}
        </div>
        <Group justify="flex-end">
          <Button
            disabled={props.formDisabled}
            variant="default"
            onClick={props.closeForm}
            size={isSmall ? "sm" : "md"}
            radius={12}
          >
            {post.cancel_post[language]}
          </Button>
          <Button
            type="submit"
            size={isSmall ? "sm" : "md"}
            radius={12}
            disabled={!safeToPost}
            className={
              !safeToPost || props.formDisabled
                ? "bg-dark-700"
                : "bg-cyan-700 hover:bg-cyan-600"
            }
          >
            {post.create_post[language]}
            {props.formDisabled && (
              <ImSpinner4 size={18} className="animate-spin ml-2" />
            )}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
