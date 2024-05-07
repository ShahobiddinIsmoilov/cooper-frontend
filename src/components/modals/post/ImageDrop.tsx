import { Group, Image, rem } from "@mantine/core";
import { IconUpload, IconX } from "@tabler/icons-react";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { IoMdCloudUpload } from "react-icons/io";
import { useState } from "react";
import { post } from "../lang_modals";
import { useLanguage } from "../../../contexts/LanguageContext";
import { useMediaQuery } from "@mantine/hooks";
import imageCompression from "browser-image-compression";

interface Props {
  image: FileWithPath | null;
  setImage: (image: FileWithPath) => void;
}

export default function ImageDrop({ image, setImage }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const { language } = useLanguage();
  const isMobile = useMediaQuery("(max-width: 50em)");

  async function handleDrop(file: any) {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    try {
      const compressedBlob = await imageCompression(file, options);
      const compressedFile = new File([compressedBlob], compressedBlob.name);
      setImage(compressedFile);
      setImageUrl(URL.createObjectURL(file));
    } catch (error) {
      alert(post.imagepost_error[language]);
    }
  }

  return !image ? (
    <Dropzone
      multiple={false}
      maxFiles={1}
      onDrop={(files) => handleDrop(files[0])}
      // onDrop={(files) => {
      //   setImage(files[0]);
      //   setImageUrl(URL.createObjectURL(files[0]));
      // }}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={15 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      p={12}
    >
      <Group
        justify="center"
        gap="xl"
        mih={isMobile ? 50 : 100}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <div
            className={`${
              isMobile
                ? "flex flex-col items-center"
                : "flex justify-center items-center gap-3"
            }`}
          >
            <IoMdCloudUpload size={isMobile ? 40 : 60} opacity={0.5} />
            <div className="text-center sm:text-left">
              <p className="sm:text-lg">
                {isMobile
                  ? post.imagepost_placeholder_mobile[language]
                  : post.imagepost_placeholder[language]}
              </p>
              <p className="text-white/50 -mt-1 text-sm sm:text-base">
                {post.imagepost_limit[language]}
              </p>
            </div>
          </div>
        </Dropzone.Idle>
      </Group>
    </Dropzone>
  ) : (
    <div className="bg-dark-900 rounded-md relative overflow-hidden">
      <Image
        src={imageUrl}
        mih={100}
        mah={{ base: 350, xs: 500 }}
        className="blur-3xl opacity-50 border rounded-md"
      />
      <Image
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        mih={100}
        mah={{ base: 350, xs: 500 }}
        fit="contain"
        className="absolute top-0 left-0 border border-white border-opacity-25 rounded-md"
      />
    </div>
  );
}
