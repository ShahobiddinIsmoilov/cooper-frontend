import { Button, Menu, Modal } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { GrTextAlignLeft } from "react-icons/gr";
import { FiLink } from "react-icons/fi";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import { FileWithPath } from "@mantine/dropzone";
import { post } from "../lang_modals";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import { useAuthContext } from "../../../contexts/AuthContext";
import { Slide, toast } from "react-toastify";
import useCredentials from "../../../services/useCredentials";
import CreatePostForm from "./CreatePostForm";

interface Props {
  community?: number;
  community_name?: string;
  community_avatar?: string;
}

export default function CreatePost(props: Props) {
  const api = useCredentials();
  const queryClient = useQueryClient();
  const { language } = useLanguage();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (newPost: {}) => api.post("/api/post/create/", newPost),
    onSuccess: (response: any) => {
      queryClient.invalidateQueries({
        queryKey: [`community-page-${props.community}`],
      });
      closeForm();
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
      body_text: body,
      image: image,
      link: link,
      type: postType,
    };
    setFormDisabled(true);
    mutation.mutate(newPost);
  }

  const notifyNotAuthenticated = () =>
    toast.error("Post yaratish uchun hisobingizga kiring", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
    });

  function openForm() {
    if (user) {
      open();
    } else {
      notifyNotAuthenticated();
    }
  }

  // close modal and reset form values
  function closeForm() {
    close();
    setCombobox(props.community_name);
    setTitle("");
    setTitleChanged(false);
    setBody("");
    setImage(null);
    setFormDisabled(false);
    setLink("");
  }

  const isSmall = useWindowSize().screenWidth < 768;

  return (
    <>
      <Menu radius={12}>
        <Menu.Target>
          <Button
            className={`flex items-center bg-transparent hover:bg-dark-700 rounded-full text-white px-3`}
          >
            <FaPlus />
            {post.create[language]}
          </Button>
        </Menu.Target>
        <Menu.Dropdown w={150} className="bg-dark-850">
          <Menu.Item
            p={0}
            onClick={() => {
              setPostType("text");
              openForm();
            }}
          >
            <div className="py-2 px-4 text-xl flex items-center gap-4 hover:bg-dark-700 rounded-xl font-bold">
              <GrTextAlignLeft size={24} />
              <span>{post.text[language]}</span>
            </div>
          </Menu.Item>
          <Menu.Item
            p={0}
            onClick={() => {
              setPostType("image");
              openForm();
            }}
          >
            <div className="py-2 px-4 text-xl flex items-center gap-4 hover:bg-dark-700 p-2 rounded-xl font-bold">
              <FaRegImage size={24} />
              <span>{post.image[language]}</span>
            </div>
          </Menu.Item>
          <Menu.Item
            p={0}
            onClick={() => {
              setPostType("link");
              openForm();
            }}
          >
            <div className="py-2 px-4 text-xl flex items-center gap-4 hover:bg-dark-700 p-2 rounded-xl font-bold">
              <FiLink size={24} />
              <span>{post.link[language]}</span>
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
        fullScreen={isSmall}
      >
        <CreatePostForm
          community_avatar={props.community_avatar}
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
          closeForm={closeForm}
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
