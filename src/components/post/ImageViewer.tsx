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
      <Image src={imageUrl} fit="contain" ref={dialogContentRef} />
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

// import { Image } from "@mantine/core";
// import { useState } from "react";
// import { Modal } from "react-responsive-modal";
// import "react-responsive-modal/styles.css";
// import "./modalStyle.css";

// export default function ImageViewer({ imageUrl }: { imageUrl: string }) {
//   // const baseDir = "C:/Users/Triton/Desktop/cooper/backend";
//   const sampleUrl = `../../../../src/assets/${imageUrl}`;
//   const [open, setOpen] = useState(false);

//   function openModal() {
//     setOpen(true);
//   }
//   function closeModal() {
//     setOpen(false);
//   }

//   return (
//     <>
//       <Modal
//         open={open}
//         onClose={closeModal}
//         center
//         showCloseIcon={false}
//         classNames={{
//           overlay: "customOverlay",
//           modal: "customModal",
//           // overlayAnimationIn: "customOverlayIn",
//           // overlayAnimationOut: "customOverlayOut",
//           // modalAnimationIn: "customModalIn",
//           // modalAnimationOut: "customModalOut",
//         }}
//       >
//         <Image src={sampleUrl} fit="contain" className="w-screen h-screen" />
//       </Modal>
//       <div
//         onClick={openModal}
//         className="bg-dark-900 rounded-xl relative overflow-hidden cursor-pointer"
//       >
//         <Image
//           src={sampleUrl}
//           mih={50}
//           mah={500}
//           className="blur-3xl opacity-50 border"
//         />
//         <Image
//           src={sampleUrl}
//           mih={50}
//           mah={500}
//           fit="contain"
//           className="absolute top-0 left-0 border border-white border-opacity-25 rounded-xl"
//         />
//       </div>
//     </>
//   );
// }
