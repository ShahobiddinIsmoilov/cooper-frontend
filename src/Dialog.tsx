import { Modal } from "@mantine/core";
import { useWindowSize } from "./contexts/WindowSizeContext";
import { useDisclosure } from "@mantine/hooks";
import { useDialog } from "./contexts/DialogContext";

export default function Dialog() {
  const isSmall = useWindowSize().screenWidth < 768;
  const [_, { close }] = useDisclosure();

  const { isDialogOpen, dialogContent, withCloseButton } = useDialog();

  return (
    <Modal
      opened={isDialogOpen}
      onClose={close}
      centered
      radius={12}
      size="xl"
      shadow="xs"
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={withCloseButton}
      fullScreen={isSmall}
    >
      {dialogContent}
    </Modal>
  );
}
