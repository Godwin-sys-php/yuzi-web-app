import { Modal, useMantineTheme, Card, Text } from "@mantine/core";
import { useState, useEffect } from "react";

export default function ModalTool({ name, show, onClose, data }) {
  const [isOpen, setIsOpen] = useState(show);
  const theme = useMantineTheme();

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  return (
    <Modal
      opened={isOpen}
      onClose={() => onClose()}
      title={`Historique de l'outil "${name}"`}
      overlayProps={{
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      centered
      size="80%"
      radius={"lg"}
    >
      {data.map((element) => (
        <>
        <Card>
          <Text fw={"bolder"}>Entrée:</Text>
          <Text fw={"bolder"}>{element.input}</Text>
          <br />
          <Text fw={"bold"}>Sortie:</Text>
          <div dangerouslySetInnerHTML={{ __html: element.output.replace(/\n/g, "<br />"), }}></div>
        </Card>
        <br />
        </>
      ))}
    </Modal>
  );
}
