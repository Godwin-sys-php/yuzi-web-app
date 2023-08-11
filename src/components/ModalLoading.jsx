import { Modal, useMantineTheme, Card, Text } from "@mantine/core";
import { useState, useEffect } from "react";
import { ClimbingBoxLoader } from "react-spinners";

export default function ModalLoading({ show, }) {
  const [isOpen, setIsOpen] = useState(show);
  const theme = useMantineTheme();

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  return (
    <Modal
      opened={isOpen}
      withCloseButton={false}
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      centered
      size={"90%"}
      radius={"lg"}
      style={{ overflow: "hidden", }}
    >
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "50vh",
        overflow: "hidden",
      }}
    >
      <div >
        <ClimbingBoxLoader size={"200%"} color="#8cb9de" />
      </div>
    </div>
    </Modal>
  );
}
