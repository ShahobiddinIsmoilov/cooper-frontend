import { Image } from "@mantine/core";
import { useDialog } from "../../contexts/DialogContext";

export default function ImageViewer({ imageUrl }: { imageUrl: string }) {
  const {
    setDialogContent,
    setIsDialogVisible,
    setWithCloseButton,
    dialogContentRef,
  } = useDialog();

  function handleImageClick() {
    setDialogContent(
      <Image
        src={imageUrl}
        fit="contain"
        ref={dialogContentRef}
        className="w-screen max-w-screen max-h-screen"
      />
    );
    setWithCloseButton(true);
    setIsDialogVisible(true);
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
