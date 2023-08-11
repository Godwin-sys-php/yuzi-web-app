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
  Select,
  Alert,
} from "@mantine/core";
import logo from "../assets/logo-rond.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { signup } from "../services/users";
import useStore from "../store";
import Cookies from "js-cookie";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setToken = useStore((state) => state.setToken);
  const setUserData = useStore((state) => state.setUserData);
  const setCredit = useStore((state) => state.setCredit);
  const navigate = useNavigate();
  const [why, setWhy] = useState([
    {
      value: "Au sein de mon établissement",
      label: "Au sein de mon établissement",
    },
    { value: "Réseau Sociaux", label: "Réseau Sociaux" },
    { value: "Bouche à oreille", label: "Bouche à oreille" },
    { value: "Affiche", label: "Affiche" },
  ]);

  const form = useForm({
    initialValues: {
      fname: "",
      lname: "",
      phoneNumber: "",
      email: "",
      password: "",
    },

    validate: {
      fname: (value) =>
        value.length >= 1 && value.length <= 100 ? null : "Prénom invalide",
      lname: (value) =>
        value.length >= 1 && value.length <= 100 ? null : "Nom invalide",
      phoneNumber: (value) =>
        value.length >= 1 && value.length <= 20
          ? null
          : "Numéro de téléphone invalide",
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Adresse email invalide",
      password: (value) => (value.length >= 8 ? null : "Mot de passe invalide"),
      why: (value) =>
        value.length >= 1 && value.length <= 150 ? null : "Champ invalide",
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
        Bienvenue parmi nous !
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Déjà inscrit•e ?{" "}
        <Anchor size="sm" component="button">
          <Link style={{ color: "inherit" }} to={"/login"}>
            Se connecter
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
              const data = await signup(values);
              setLoading(false);
              if (data.created) {
                console.log(data);
                Cookies.set("token", data.token, { expires: 49 });
                Cookies.set("userData", JSON.stringify(data.user), { expires: 49 });
                Cookies.set("id", data.user.id, { expires: 49 });
                setToken(data.token);
                setUserData(data.user);
                setCredit(data.user.credits);
                navigate("/home")
              } else {
                setError(data.message);
              }
            }
          })}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <TextInput
              label="Nom"
              placeholder="John"
              required
              style={{ marginRight: "10px" }}
              {...form.getInputProps("lname")}
            />
            <TextInput
              label="Prénom"
              placeholder="Doe"
              required
              style={{ paddingLeft: "10px" }}
              {...form.getInputProps("fname")}
            />
          </div>
          <TextInput
            style={{ marginTop: "3%" }}
            label="Numéro de téléphone"
            placeholder="+243 *** *** ***"
            required
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            style={{ marginTop: "3%" }}
            label="Adresse email"
            placeholder="john@doe.com"
            required
            {...form.getInputProps("email")}
          />
          <Select
            style={{ marginTop: "3%" }}
            required
            label="Comment avez-vous entendu parler de nous ?"
            data={why}
            placeholder="Choisissez une option"
            nothingFound="Aucun résultat"
            searchable
            creatable
            getCreateLabel={(query) => `Autre: ${query}`}
            onCreate={(query) => {
              const item = { value: query, label: query };
              setWhy((current) => [...current, item]);
              return item;
            }}
            {...form.getInputProps("why")}
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
          {/* <Group position="apart" mt="lg">
            <Anchor component="button" size="sm">
              Mot de passe oublié ?
            </Anchor>
          </Group> */}
          <Button type="submit" fullWidth mt="xl" loading={loading}>
            S'inscire
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
