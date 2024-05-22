import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Avatar, Grid, Stack } from "@mantine/core";
import { usersettings } from "./../lang_userprofile";
import { useLanguage } from "../../../contexts/LanguageContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { useRef } from "react";
import { MdEdit } from "react-icons/md";
import Line from "../../../utils/Line";
import compressImage from "../../../utils/compressImage";

interface Props {
  avatar: string;
  setNewAvatar: (file: FileWithPath | undefined) => void;
  newAvatarUrl: string;
  setNewAvatarUrl: (url: string) => void;
  username: string;
  displayName: string;
  phone: string;
  setDisplayName: (value: string) => void;
  setPhone: (value: string) => void;
  removeSpaces: (s: string) => string;
}

export default function AccountSettings(props: Props) {
  const { language } = useLanguage();
  const avatarRef = useRef<() => void>(null);

  async function handleAvatarChange(file: any) {
    const compressedAvatar = await compressImage(file);
    props.setNewAvatar(compressedAvatar);
    props.setNewAvatarUrl(URL.createObjectURL(file));
  }

  function handleDisplayNameChange(value: string) {
    props.setDisplayName(handleSpaces(value));
  }

  function handleSpaces(s: string) {
    s = s.replace(/\s\s+/g, " ");
    return s;
  }

  function handlePhoneChange(value: string) {
    props.setPhone(props.removeSpaces(value));
  }

  return (
    <Stack>
      <div className="mt-4 xs:mt-0">
        <p className="mb-2 text-xs font-bold tracking-widest">
          {usersettings.account.profile[language]}
        </p>
        <Line />
      </div>
      <Grid>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <div className="flex justify-center items-center w-full h-full">
            <div className="relative w-[182px] min-w-[182px] max-w-[182px] h-[164px] min-h-[164px] max-h-[164px] items-center">
              <Avatar
                size={150}
                radius={16}
                src={props.newAvatarUrl ? props.newAvatarUrl : props.avatar}
                onLoad={() => URL.revokeObjectURL(props.newAvatarUrl)}
              />
              <div className="absolute -left-4 top-0 h-full w-full">
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
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6 }}>
          <p className="m-1">{usersettings.account.display_name[language]}:</p>
          <input
            onChange={(e) => handleDisplayNameChange(e.target.value)}
            value={props.displayName}
            type="text"
            maxLength={32}
            id="display_name"
            name="display_name"
            placeholder={props.username}
            className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
          />
          <div className="mt-4">
            <p className="m-1">
              {usersettings.account.phone_number[language]}:
            </p>
            <input
              onChange={(e) => handlePhoneChange(e.target.value)}
              value={props.phone}
              type="text"
              maxLength={32}
              id="phone_number"
              name="phone_number"
              placeholder="+998 (99) 999-99-99"
              disabled
              className="w-full py-3 px-4 text-lg rounded-xl bg-dark-850 outline-none placeholder-white placeholder-opacity-25 border border-line"
            />
          </div>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}
