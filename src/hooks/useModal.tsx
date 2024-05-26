import { useState } from "react";
import { useToggle } from "react-use";
import { Modal } from "../components/Modal";

export function useModal() {
  const [modalOpen, setModalOpen] = useToggle(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const handleModal = (content: JSX.Element) => {
    setModalContent(content);
    setModalOpen();
  }

  return {
    modal: <Modal open={modalOpen} toggleOpen={setModalOpen}>{modalContent}</Modal>,
    handleModal
  };
}
