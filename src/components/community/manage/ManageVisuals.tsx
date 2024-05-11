import { useRef } from "react";
import { MdEdit } from "react-icons/md";
import { Avatar, Image } from "@mantine/core";
import { FaRegTrashAlt } from "react-icons/fa";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useWindowSize } from "../../../contexts/WindowSizeContext";
import compressImage from "../../../utils/compressImage";

interface Props {
  avatar: string;
  banner: string;
  newAvatarUrl: string;
  newBannerUrl: string;
  setNewAvatar: (file: FileWithPath | undefined) => void;
  setNewBanner: (file: FileWithPath | undefined) => void;
  setNewAvatarUrl: (url: string) => void;
  setNewBannerUrl: (url: string) => void;
}

export default function ManageVisuals(props: Props) {
  const isExtraSmall = useWindowSize().screenWidth < 576;

  async function handleAvatarChange(file: any) {
    const compressedAvatar = await compressImage(file);
    props.setNewAvatar(compressedAvatar);
    props.setNewAvatarUrl(URL.createObjectURL(file));
  }

  async function handleBannerChange(file: any) {
    const compressedBanner = await compressImage(file);
    props.setNewBanner(compressedBanner);
    props.setNewBannerUrl(URL.createObjectURL(file));
  }

  const avatarRef = useRef<() => void>(null);
  const bannerRef = useRef<() => void>(null);

  return (
    <div
      className={`flex items-center gap-6 xs:gap-4 ${
        isExtraSmall && "flex-col"
      }`}
    >
      <div className="relative rounded-full w-[150px] min-w-[150px] max-w-[150px] items-center">
        <Avatar
          src={props.newAvatarUrl ? props.newAvatarUrl : props.avatar}
          size={150}
          onLoad={() => URL.revokeObjectURL(props.newAvatarUrl)}
        />
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="flex justify-between items-end h-full gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="p-2 rounded-full text-white bg-black/75 hover:bg-white hover:text-black"
            >
              <FaRegTrashAlt size={20} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                avatarRef.current?.();
              }}
              className="p-2 rounded-full text-white bg-black/75 hover:bg-white hover:text-black"
            >
              <Dropzone
                openRef={avatarRef}
                multiple={false}
                maxFiles={1}
                maxSize={15 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                hidden
                onDrop={(files) => {
                  handleAvatarChange(files[0]);
                }}
              />
              <MdEdit size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full bg-white overflow-hidden rounded-xl relative">
        <Image
          src={props.newBannerUrl ? props.newBannerUrl : props.banner}
          h={isExtraSmall ? 96 : 150}
        />
        <div className="absolute left-0 top-0 h-full w-full">
          <div className="flex justify-center items-center h-full gap-4">
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              className="p-2 rounded-full text-white bg-black/75 hover:bg-white hover:text-black"
            >
              <FaRegTrashAlt size={20} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                bannerRef.current?.();
              }}
              className="p-2 rounded-full text-white bg-black/75 hover:bg-white hover:text-black"
            >
              <Dropzone
                openRef={bannerRef}
                multiple={false}
                maxFiles={1}
                maxSize={15 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                hidden
                onDrop={(files) => {
                  handleBannerChange(files[0]);
                }}
              />
              <MdEdit size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
