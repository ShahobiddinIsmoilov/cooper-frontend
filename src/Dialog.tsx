import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useDialog } from "./contexts/DialogContext";

export default function Dialog() {
  const [_, { close }] = useDisclosure();

  const { isDialogOpen, dialogContent } = useDialog();

  return (
    <Modal
      opened={isDialogOpen}
      onClose={close}
      centered
      radius={12}
      size="fit"
      shadow="xs"
      withCloseButton={false}
    >
      {dialogContent}
    </Modal>
  );
}
