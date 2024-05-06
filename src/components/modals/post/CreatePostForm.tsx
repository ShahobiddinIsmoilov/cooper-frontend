import { Stack, Group, Button, Text } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import { post } from "../lang_modals";
import { useLanguage } from "../../../contexts/LanguageContext";
import CommunityCombobox from "./CommunityCombobox";
import FancyTextEditor from "./FancyTextEditor";
import PostTitle from "./PostTitle";
import ImageDrop from "./ImageDrop";
import LinkInput from "./LinkInput";
import UserAvatar from "./UserAvatar";

interface Props {
  community_avatar?: string;
  postType: string;
  combobox: string | undefined;
  title: string;
  body: string;
  formDisabled: boolean;
  image: FileWithPath | null;
  link: string;
  titleChanged: boolean;
  setTitle: (value: string) => void;
  setBody: (value: string) => void;
  setHTMLbody: (value: string) => void;
  setCombobox: (value: string) => void;
  handleSubmit: (value: any) => void;
  closeModal: () => void;
  setImage: (image: FileWithPath) => void;
  setLink: (link: string) => void;
  setTitleChanged: (value: boolean) => void;
}

export default function CreatePostForm(props: Props) {
  const { language } = useLanguage();

  return (
    <form onSubmit={(e) => props.handleSubmit(e)} className="bg-modal p-4">
      <Stack gap={0} pt="md" px="md">
        <div className="xs:flex justify-between items-center mb-6">
          <Group mb={{ base: 24, xs: 0 }}>
            <UserAvatar />
            <Text className="text-xl font-bold">{post.new_post[language]}</Text>
          </Group>
          <CommunityCombobox
            community_name={props.combobox}
            community_avatar={props.community_avatar}
            setCommunity={props.setCombobox}
          />
        </div>
        <div className="mb-4">
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
              setContent={props.setBody}
              setHTMLbody={props.setHTMLbody}
              formDisabled={props.formDisabled}
            />
          ) : props.postType === "image" ? (
            <ImageDrop image={props.image} setImage={props.setImage} />
          ) : (
            <LinkInput
              link={props.link}
              setLink={props.setLink}
              title={props.title}
              setTitle={props.setTitle}
              titleChanged={props.titleChanged}
              formDisabled={props.formDisabled}
            />
          )}
        </div>
        <Group justify="flex-end">
          <Button
            variant="default"
            onClick={props.closeModal}
            size="md"
            className="rounded-xl w-32"
          >
            {post.cancel_post[language]}
          </Button>
          <Button
            type="submit"
            size="md"
            disabled={props.title.length === 0 ? true : false}
            className={`bg-cyan-700 hover:bg-cyan-600 rounded-xl w-32`}
          >
            {post.create_post[language]}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
