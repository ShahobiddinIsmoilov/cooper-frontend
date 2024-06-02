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
  const { user } = useAuthContext();
  const { language } = useLanguage();
  const isSmall = useWindowSize().screenWidth < 768;
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
  const [communityId, setCommunityId] = useState(props.community);
  const [communityAvatar, setCommunityAvatar] = useState(
    props.community_avatar
  );
  const [communityName, setCommunityName] = useState<string | undefined>(
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
  const [linkRaw, setLinkRaw] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const newPost = {
      community: communityId,
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
    toast.error(unauthorized[language], {
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
    setCommunityName(props.community_name);
    setTitle("");
    setTitleChanged(false);
    setBody("");
    setImage(null);
    setFormDisabled(false);
    setLink("");
  }

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
        overlayProps={{ backgroundOpacity: 0.9 }}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        fullScreen={isSmall}
      >
        <CreatePostForm
          communityAvatar={communityAvatar}
          communityName={communityName}
          postType={postType}
          title={title}
          body={body}
          formDisabled={formDisabled}
          setCommunityId={setCommunityId}
          setCommunityAvatar={setCommunityAvatar}
          setCommunityName={setCommunityName}
          setTitle={setTitle}
          setBody={setBody}
          setHTMLbody={setHTMLbody}
          handleSubmit={handleSubmit}
          closeForm={closeForm}
          image={image}
          setImage={setImage}
          link={link}
          linkRaw={linkRaw}
          setLink={setLink}
          setLinkRaw={setLinkRaw}
          titleChanged={titleChanged}
          setTitleChanged={setTitleChanged}
        />
      </Modal>
    </>
  );
}

const unauthorized = {
  uz: "Post yaratish uchun hisobingizga kiring",
  en: "You must be logged in to create a post",
  ru: "You must be logged in to create a post",
};
