import { Avatar, Flex } from "@mantine/core";
import { UserDetailProps } from "../../../interfaces/userDetailProps";
import { FaEdit } from "react-icons/fa";
import { useRef } from "react";
import { Dropzone } from "@mantine/dropzone";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthContext } from "../../../contexts/AuthContext";
import imageCompression from "browser-image-compression";
import SocialIcons from "./SocialIcons";
import useCredentials from "../../../services/useCredentials";

interface Props {
  user: UserDetailProps;
}

export default function UserProfile({ user }: Props) {
  const api = useCredentials();
  const queryClient = useQueryClient();
  const auth_user = useAuthContext().user?.user_id;

  const mutation = useMutation({
    mutationFn: (newAvatar: {}) =>
      api.patch(`/api/user/update/${user.id}/`, newAvatar),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile-page"],
      });
    },
  });

  async function handleEdit(file: any) {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 400,
      useWebWorker: true,
    };
    try {
      const compressedBlob = await imageCompression(file, options);
      const compressedFile = new File([compressedBlob], compressedBlob.name);
      const newAvatar = {
        avatar: compressedFile,
      };
      mutation.mutate(newAvatar);
    } catch (error) {
      alert("Something went wrong during image processing");
    }
  }

  const openRef = useRef<() => void>(null);

  return (
    <Flex justify={"space-between"} mb={32}>
      <Flex align="center" gap={16}>
        <div className="relative rounded-[16px] overflow-hidden">
          <Avatar src={user.avatar} radius={16} size={150}>
            {user.username[0]}
          </Avatar>
          {user.id === auth_user && (
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
          )}
        </div>
        <div>
          <p className="text-white text-3xl font-bold break-words">
            {user.display_name}
          </p>
          <p className="text-orange-400 text-xl font-bold">{user.username}</p>
          <SocialIcons user={user} />
        </div>
      </Flex>
      {/* <Stack w={200} miw={200} justify="center" align="end">
        <div className="text-end">
          <p className="opacity-75">Date joined:</p>
          <p className="text-white text-lg">12-aprel, 2024</p>
        </div>
        <div className="text-end">
          <p className="opacity-75">Likes:</p>
          <p className="text-lg">
            <BiSolidLike className="text-yellow-400 inline-block mr-1" />
            {user.votes.toLocaleString()}
          </p>
        </div>
      </Stack> */}
    </Flex>
  );
}
