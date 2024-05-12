import { Image } from "@mantine/core";
import { useCustomModal } from "../../contexts/CustomModalContext";

export default function ImageViewer({ imageUrl }: { imageUrl: string }) {
  const { openCustomModal, setCustomModalContent, customModalContentRef } =
    useCustomModal();

  function handleImageClick() {
    setCustomModalContent(
      <Image
        src={imageUrl}
        fit="contain"
        ref={customModalContentRef}
        className="w-screen max-w-screen max-h-screen"
      />
    );
    openCustomModal();
  }

  return (
    <>
      <div
        onClick={handleImageClick}
        className="bg-dark-900 rounded-xl relative overflow-hidden cursor-pointer"
      >
        <Image
          src={imageUrl}
          mih={100}
          mah={{ base: 350, xs: 500 }}
          className="blur-3xl opacity-50 border"
        />
        <Image
          src={imageUrl}
          mih={100}
          mah={{ base: 350, xs: 500 }}
          fit="contain"
          className="absolute top-0 left-0 border border-white border-opacity-25 rounded-xl"
        />
      </div>
    </>
  );
}
