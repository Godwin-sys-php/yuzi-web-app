import { Modal, TextInput, Textarea, Button, Alert } from "@mantine/core";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import { createRevision } from "../services/revision";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

export default function ModalRevision({ show, onClose }) {
  const [isOpen, setIsOpen] = useState(show);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const store = useStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(show);
  }, [show]);

  const form = useForm({
    initialValues: {
      educationSystem: "",
      classe: "",
      level: "",
      subject: "",
      attributes: "",
    },

    validate: {
      educationSystem: (value) =>
        value.length >= 1 && value.length <= 100 ? null : "Champs invalide",
      classe: (value) =>
        value.length >= 1 && value.length <= 100 ? null : "Champs invalide",
      level: (value) =>
        value.length >= 1 && value.length <= 100 ? null : "Champs invalide",
      subject: (value) =>
        value.length >= 1 && value.length <= 300 ? null : "Champs invalide",
      attributes: (value) =>
        value.length >= 0 && value.length <= 300 ? null : "Champs invalide",
    },
  });

  return (
    <Modal
      opened={isOpen}
      onClose={() => onClose()}
      title="Session de révision"
      centered
      radius={"lg"}
    >
      <form
        onSubmit={form.onSubmit(async (values) => {
          setError("");
          form.validate();
          if (form.isValid()) {
            setLoading(true);
            const data = await createRevision(values, store.token);
            console.log(data);
            setLoading(false);
            if (data.success) {
              navigate(`/chat/${data.revision.id}`)
            } else {
              setError(data.message);
            }
          }
        })}
      >
        <TextInput
          label="Système d'éducation"
          placeholder="Ex: Français, Congolais, Belge, etc."
          style={{ marginBottom: "3%" }}
          required
          {...form.getInputProps("educationSystem")}
        />
        <TextInput
          label="Classe"
          placeholder="Votre classe"
          style={{ marginBottom: "3%" }}
          required
          {...form.getInputProps("classe")}
        />
        <TextInput
          label="Matière"
          placeholder="Ex: Histoire, Mathématique, SVT, etc."
          style={{ marginBottom: "3%" }}
          required
          {...form.getInputProps("level")}
        />
        <TextInput
          label="Sujet"
          placeholder="Le sujet sur lequel vous souhaitez réviser"
          style={{ marginBottom: "3%" }}
          required
          {...form.getInputProps("subject")}
        />
        <Textarea
          placeholder="(Optionnel)"
          label="Eléments souhaités dans la fiche de révision"
          {...form.getInputProps("attributes")}
        />
        {error.length > 0 && (
          <>
            <br />
            <Alert color={"red"}>{error}</Alert>
          </>
        )}
        <Button type="submit" fullWidth mt="xl" loading={loading}>
          {loading ? null : "Commencer"}
        </Button>
      </form>
    </Modal>
  );
}
