import { Flex, Group, Text, Image, rem } from "@mantine/core";
import { IconUpload, IconX } from "@tabler/icons-react";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { MdFileUpload } from "react-icons/md";
import { useState } from "react";
import imageCompression from "browser-image-compression";

interface Props {
  image: FileWithPath | null;
  setImage: (image: FileWithPath) => void;
}

export default function ImageDrop({ image, setImage }: Props) {
  const [imageUrl, setImageUrl] = useState("");

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
      alert("Something went wrong during image processing");
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
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      p={12}
    >
      <Group
        justify="center"
        gap="xl"
        mih={100}
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
          <Flex className="items-center gap-2">
            <MdFileUpload
              style={{
                width: rem(55),
                height: rem(55),
                color: "var(--mantine-color-dimmed)",
              }}
            />
            <div>
              <Text size="lg" inline>
                Drag your image here or click to select
              </Text>
              <Text c="dimmed" inline mt={7}>
                File size should not exceed 5MB
              </Text>
            </div>
          </Flex>
        </Dropzone.Idle>
      </Group>
    </Dropzone>
  ) : (
    <div className="bg-dark-900 rounded-md relative overflow-hidden">
      <Image
        src={imageUrl}
        mih={50}
        mah={700}
        className="blur-3xl opacity-50 border rounded-md"
      />
      <Image
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
        mih={50}
        mah={700}
        fit="contain"
        className="absolute top-0 left-0 border border-white border-opacity-25 rounded-md"
      />
    </div>
  );
}
