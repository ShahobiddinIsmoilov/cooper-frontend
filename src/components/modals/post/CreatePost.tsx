import { Menu, Modal } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { GrTextAlignLeft } from "react-icons/gr";
import { FiLink } from "react-icons/fi";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { FileWithPath } from "@mantine/dropzone";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import useCredentials from "../../../services/useCredentials";
import CreatePostForm from "./CreatePostForm";

interface Props {
  community?: number;
  community_name?: string;
}

export default function CreatePost(props: Props) {
  const api = useCredentials();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newPost: {}) => api.post("/api/post/create/", newPost),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: [`community-page-${props.community}`],
      });
      closeModal();
      setFormDisabled(false);
      navigate(`/c/${props.community}/post/${response.data}`);
    },
  });

  // modal state
  const [opened, { open, close }] = useDisclosure();

  // initial values of form fields
  const [combobox, setCombobox] = useState<string | undefined>(
    props.community_name
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [HTMLbody, setHTMLbody] = useState({});
  const [formDisabled, setFormDisabled] = useState(false);
  const [postType, setPostType] = useState("");
  const [image, setImage] = useState<FileWithPath | null>(null);
  const [titleChanged, setTitleChanged] = useState(false);
  const [link, setLink] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const newPost = {
      community: props.community,
      title: title,
      body: HTMLbody,
      image: image,
      link: link,
      type: postType,
    };
    setFormDisabled(true);
    mutation.mutate(newPost);
  }

  // close modal and reset form values
  function closeModal() {
    close();
    setCombobox(props.community_name);
    setTitle("");
    setTitleChanged(false);
    setBody("");
    setImage(null);
    setFormDisabled(false);
  }

  const screenHeight = useWindowSize().screenHeight;
  const plussize = screenHeight > 700 ? 20 : 16;

  return (
    <>
      <Menu radius={12}>
        <Menu.Target>
          <button
            className={`flex items-center gap-1 hover:bg-dark-700 border-white border-opacity-25 rounded-full ${
              plussize === 20 ? "p-[10px]" : "p-[8px]"
            }`}
          >
            <FaPlus size={plussize} />
            Create
          </button>
        </Menu.Target>
        <Menu.Dropdown w={150} className="bg-dark-850">
          <Menu.Item
            p={0}
            onClick={() => {
              setPostType("text");
              open();
            }}
          >
            <div className="py-2 px-4 text-xl flex items-center gap-4 hover:bg-dark-700 rounded-xl font-bold">
              <GrTextAlignLeft size={24} />
              <span>Text</span>
            </div>
          </Menu.Item>
          <Menu.Item
            p={0}
            onClick={() => {
              setPostType("image");
              open();
            }}
          >
            <div className="py-2 px-4 text-xl flex items-center gap-4 hover:bg-dark-700 p-2 rounded-xl font-bold">
              <FaRegImage size={24} />
              <span>Image</span>
            </div>
          </Menu.Item>
          <Menu.Item
            p={0}
            onClick={() => {
              setPostType("link");
              open();
            }}
          >
            <div className="py-2 px-4 text-xl flex items-center gap-4 hover:bg-dark-700 p-2 rounded-xl font-bold">
              <FiLink size={24} />
              <span>Link</span>
            </div>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Modal
        opened={opened}
        onClose={close}
        centered
        radius={12}
        size="xl"
        shadow="xs"
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
      >
        <CreatePostForm
          postType={postType}
          combobox={combobox}
          title={title}
          body={body}
          formDisabled={formDisabled}
          setTitle={setTitle}
          setBody={setBody}
          setHTMLbody={setHTMLbody}
          setCombobox={setCombobox}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
          image={image}
          setImage={setImage}
          link={link}
          setLink={setLink}
          titleChanged={titleChanged}
          setTitleChanged={setTitleChanged}
        />
      </Modal>
    </>
  );
}
