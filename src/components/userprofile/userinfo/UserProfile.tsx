import { Avatar, Stack, Image, Button } from "@mantine/core";
import { UserDetailProps } from "../../../interfaces/userDetailProps";
import { useDialog } from "../../../contexts/DialogContext";
import { BiSolidLike } from "react-icons/bi";
import { userinfo } from "./../lang_userprofile";
import { Link } from "react-router-dom";
import { useLanguage } from "../../../contexts/LanguageContext";
import { IoMdSettings } from "react-icons/io";
import { useAuthContext } from "../../../contexts/AuthContext";
// import { FaEdit } from "react-icons/fa";
// import { useRef } from "react";
// import { Dropzone } from "@mantine/dropzone";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import imageCompression from "browser-image-compression";
// import useCredentials from "../../../services/useCredentials";
import SocialIcons from "./SocialIcons";
import exactTime from "../../../utils/exactTime";
import readableTime from "../../../utils/readableTime";

interface Props {
  user: UserDetailProps;
}

export default function UserProfile({ user }: Props) {
  // const api = useCredentials();
  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: (newAvatar: {}) =>
  //     api.patch(`/api/user/update/${user.id}/`, newAvatar),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["profile-page"],
  //     });
  //   },
  // });

  // async function handleEdit(file: any) {
  //   const options = {
  //     maxSizeMB: 0.5,
  //     maxWidthOrHeight: 400,
  //     useWebWorker: true,
  //   };
  //   try {
  //     const compressedBlob = await imageCompression(file, options);
  //     const compressedFile = new File([compressedBlob], compressedBlob.name);
  //     const newAvatar = {
  //       avatar: compressedFile,
  //     };
  //     mutation.mutate(newAvatar);
  //   } catch (error) {
  //     alert("Something went wrong during image processing");
  //   }
  // }

  // const openRef = useRef<() => void>(null);

  const {
    setDialogContent,
    setIsDialogVisible,
    setWithCloseButton,
    dialogContentRef,
  } = useDialog();

  function handleAvatarClick() {
    setDialogContent(
      <Image src={user.avatar} fit="contain" ref={dialogContentRef} />
    );
    setWithCloseButton(true);
    setIsDialogVisible(true);
  }

  return (
    <Stack align="start" gap={0} mx={20} mt={16}>
      <div className="flex justify-between w-full gap-4">
        <div className="relative rounded-[16px] overflow-hidden min-w-fit min-h-fit">
          <Avatar
            onClick={handleAvatarClick}
            src={user.avatar}
            radius={16}
            size={150}
          >
            {user.username[0]}
          </Avatar>
          {/* {user.id === auth_user && (
          <div
            onClick={() => openRef.current?.()}
            className={`opacity-0 hover:opacity-100 flex justify-center items-center bg-black/50 w-[150px] h-[150px] min-w-[150px] min-h-[150px] absolute top-0 left-0 cursor-pointer`}
          >
            <Dropzone
              openRef={openRef}
              onDrop={(files) => {
                handleEdit(files[0]);
              }}
              className="hidden"
            />
            ;
            <FaEdit size={32} color="white" />
          </div>
        )} */}
        </div>
        <UserInfoCard
          created_at={user.created_at}
          votes={user.votes}
          user_id={user.id}
        />
      </div>
      <p className="text-white text-3xl font-bold break-words mt-3">
        {user.display_name}
      </p>
      <p className="text-orange-400 text-xl font-bold">{user.username}</p>
      <div className="flex justify-between">
        <SocialIcons user={user} />
      </div>
    </Stack>
  );
}

interface UserInfoCardProps {
  created_at: string;
  votes: number;
  user_id: number;
}

function UserInfoCard(props: UserInfoCardProps) {
  const auth_user_id = useAuthContext().user?.user_id;
  const { language } = useLanguage();

  return props.user_id === auth_user_id ? (
    <Stack justify="space-between" align="end" gap={0}>
      <div className="text-end text-sm">
        <p className="text-white/50">{userinfo.date_joined[language]}:</p>
        <p className="text-white">
          {exactTime(props.created_at, language, "short")}
        </p>
        <p className="text-white">
          ({readableTime(props.created_at, language)})
        </p>
      </div>
      <div className="text-end text-sm">
        <p className="text-white/50">{userinfo.likes[language]}:</p>
        <p className="">
          <BiSolidLike className="text-yellow-400 inline-block mr-1" />
          {props.votes.toLocaleString()}
        </p>
      </div>
      <Link to="/profile/settings">
        <Button className="rounded-full border border-white/50 bg-transparent hover:bg-dark-700 text-default">
          <IoMdSettings size={20} />
          <span className="ml-1">{userinfo.settings[language]}</span>
        </Button>
      </Link>
    </Stack>
  ) : (
    <Stack align="end" mt={8} gap={8}>
      <div className="text-end">
        <p className="text-white/50">{userinfo.date_joined[language]}:</p>
        <p className="text-white">
          {exactTime(props.created_at, language, "short")}
        </p>
        <p className="text-white">
          ({readableTime(props.created_at, language)})
        </p>
      </div>
      <div className="text-end">
        <p className="text-white/50">{userinfo.likes[language]}:</p>
        <p className="">
          <BiSolidLike className="text-yellow-400 inline-block mr-1" />
          {props.votes.toLocaleString()}
        </p>
      </div>
    </Stack>
  );
}
