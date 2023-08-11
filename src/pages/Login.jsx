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
import { login } from "../services/users";
import useStore from "../store";
import Cookies from "js-cookie";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setToken = useStore((state) => state.setToken);
  const setUserData = useStore((state) => state.setUserData);
  const setCredit = useStore((state) => state.setCredit);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      Cookies.get("token") &&
      Cookies.get("userData") &&
      Cookies.get("id")
    ) {
      navigate("/home")
    }
  }, []);
  
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
        Content de vous revoir !
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Pas encore de compte ?{" "}
        <Anchor size="sm" component="button">
          <Link style={{ color: "inherit" }} to={"/signup"}>
            S'inscrire
          </Link>
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(async (values) => {
            setError("");
            form.validate();
            if (form.isValid()) {
              setLoading(true);
              const data = await login(values);
              setLoading(false);
              if (data.logged) {
                Cookies.set("token", data.token, { expires: 49 });
                Cookies.set("userData", JSON.stringify(data.user), { expires: 49 });
                Cookies.set("id", data.user.id, { expires: 49 });
                setToken(data.token);
                setUserData(data.user);
                setCredit(data.user.credits);
                navigate("/home");
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
          <Group position="apart" mt="lg">
            <Anchor component="button" size="sm">
              Mot de passe oublié ?
            </Anchor>
          </Group>
          {error.length > 0 && (
            <>
              <br />
              <Alert color={"red"}>{error}</Alert>
            </>
          )}
          <Button type={"submit"} fullWidth mt="xl" loading={loading}>
            Se connecter
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
