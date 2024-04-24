import { Stack, Flex, Group, Avatar, Button, Text } from "@mantine/core";
import { FileWithPath } from "@mantine/dropzone";
import CommunityCombobox from "./CommunityCombobox";
import FancyTextEditor from "./FancyTextEditor";
import PostTitle from "./PostTitle";
import ImageDrop from "./ImageDrop";
import LinkInput from "./LinkInput";

interface Props {
  postType: string;
  combobox: string | undefined;
  title: string;
  body: string;
  formDisabled: boolean;
  image: FileWithPath | null;
  link: string;
  setTitle: (value: string) => void;
  titleChanged: boolean;
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
  return (
    <form onSubmit={(e) => props.handleSubmit(e)}>
      <Stack gap={0} pt="md" px="md">
        <Flex className="justify-between items-center mb-6">
          <Group>
            <Avatar src={"none"} size={48} maw={48} />
            <Text className="text-xl font-bold">New Post</Text>
          </Group>
          <CommunityCombobox
            community={props.combobox}
            setCommunity={props.setCombobox}
          />
        </Flex>
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
            Cancel
          </Button>
          <Button
            type="submit"
            size="md"
            disabled={props.title.length === 0 ? true : false}
            className={`bg-cyan-700 hover:bg-cyan-600 rounded-xl w-32`}
          >
            Create Post
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
