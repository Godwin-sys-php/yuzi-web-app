import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Image,
  Alert,
} from "@mantine/core";
import logo from "../assets/logo-rond.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { deleteUser } from "../services/users";
import useStore from "../store";
import Cookies from "js-cookie";

export default function Delete() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setToken = useStore((state) => state.setToken);
  const setUserData = useStore((state) => state.setUserData);
  const setCredit = useStore((state) => state.setCredit);
  const navigate = useNavigate();
  
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Adresse email invalide",
      password: (value) => (value.length >= 1 ? null : "Mot de passe invalide"),
    },
  });

  return (
    <Container size={500} my={40}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "5%",
        }}
      >
        <Image src={logo} width={150} />
      </div>
      <Title align="center" sx={(theme) => ({ fontWeight: 900 })}>
        Suppression de votre compte Yuzi
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Veuillez renseigner vos identifiants de connexion
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(async (values) => {
            setError("");
            form.validate();
            if (form.isValid()) {
              setLoading(true);
              const data = await deleteUser(values);
              setLoading(false);
              if (data.deleted) {
                Cookies.remove("token");
                Cookies.remove("userData");
                Cookies.remove("id");
                setToken("");
                setUserData({});
                setCredit(0);
                navigate("/");
              } else {
                setError(data.message);
              }
            }
          })}
        >
          <TextInput
            label="Adresse email"
            placeholder="john@doe.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Mot de passe"
            placeholder="******"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          {error.length > 0 && (
            <>
              <br />
              <Alert color={"red"}>{error}</Alert>
            </>
          )}
          <Button type={"submit"} fullWidth mt="xl" loading={loading}>
            Confirmer
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
