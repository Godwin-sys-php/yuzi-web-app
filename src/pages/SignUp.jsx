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
import { signup, verify } from "../services/users";
import useStore from "../store";
import Cookies from "js-cookie";
import VerificationInput from "react-verification-input";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "../assets/code.css";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setToken = useStore((state) => state.setToken);
  const setUserData = useStore((state) => state.setUserData);
  const setCredit = useStore((state) => state.setCredit);
  const navigate = useNavigate();
  const [ph, setPh] = useState("");
  const [validation, setValidation] = useState(false);
  const [code, setCode] = useState("");
  const [userId, setUserId] = useState("");
  const [loadingCode, setLoadingCode] = useState(false);
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
      email: "",
      password: "",
    },

    validate: {
      fname: (value) =>
        value.length >= 1 && value.length <= 100 ? null : "Prénom invalide",
      lname: (value) =>
        value.length >= 1 && value.length <= 100 ? null : "Nom invalide",
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Adresse email invalide",
      password: (value) => (value.length >= 8 ? null : "Mot de passe invalide"),
      why: (value) =>
        value.length >= 1 && value.length <= 150 ? null : "Champ invalide",
    },
  });

  const onSubmitCode = async () => {
    if (!loadingCode) {
      setLoadingCode(true);
      const data = await verify({
        id: userId,
        codeSupplied: code,
      });
      console.log(data);
      setLoadingCode(false);
      if (data.verified) {
        console.log(data);
        Cookies.set("token", data.token, { expires: 49 });
        Cookies.set("userData", JSON.stringify(data.user), {
          expires: 49,
        });
        Cookies.set("id", data.user.id, { expires: 49 });
        setToken(data.token);
        setUserData(data.user);
        setCredit(data.user.credits);
        navigate("/home");
      } else {
        setError(data.message);
      }
    }
  };

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
      {validation ? (
        <>
          <Title align="center" sx={(theme) => ({ fontWeight: 900 })}>
            Vérification
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Veuillez entrer le code à 4 chiffre qui a été envoyer au {ph}
          </Text>
        </>
      ) : (
        <>
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
        </>
      )}
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {validation ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <VerificationInput
                classNames={{
                  container: "container",
                  character: "character",
                  characterInactive: "character--inactive",
                  characterSelected: "character--selected",
                }}
                length={4}
                placeholder="_"
                onChange={(v) => setCode(v)}
              />
            </div>
              {error.length > 0 && (
                <>
                  <br />
                  <br />
                  <Alert color={"red"}>{error}</Alert>
                </>
              )}
            <Button type="button" onClick={onSubmitCode} loading={loadingCode} fullWidth mt="xl">
              Confirmer
            </Button>
          </>
        ) : (
          <form
            onSubmit={form.onSubmit(async (values) => {
              setError("");
              form.validate();
              console.log(ph);
              if (form.isValid() && ph) {
                setLoading(true);
                const data = await signup({ ...values, phoneNumber: "+" + ph });
                setLoading(false);
                if (data.created) {
                  if (data.verified) {
                    if (data.user.activate) {
                      console.log(data);
                      Cookies.set("token", data.token, { expires: 49 });
                      Cookies.set("userData", JSON.stringify(data.user), {
                        expires: 49,
                      });
                      Cookies.set("id", data.user.id, { expires: 49 });
                      setToken(data.token);
                      setUserData(data.user);
                      setCredit(data.user.credits);
                      navigate("/home");
                    } else {
                      console.log(data);
                      Cookies.set("token", data.token, { expires: 49 });
                      Cookies.set("userData", JSON.stringify(data.user), {
                        expires: 49,
                      });
                      Cookies.set("id", data.user.id, { expires: 49 });
                      setToken(data.token);
                      setUserData(data.user);
                      setCredit(data.user.credits);
                      navigate("/home");
                    }
                  } else {
                    setLoading(false);
                    setUserId(data.user.id);
                    setValidation(true);
                  }
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
            <div style={{ marginTop: "3%", width: "100%" }}>
              <Text size={"sm"}>
                Numéro de téléphone{" "}
                <Text
                  size={"sm"}
                  style={{ color: "#e03131", display: "inline" }}
                >
                  *
                </Text>
              </Text>
              <PhoneInput
                country={"cd"}
                inputStyle={{
                  color: "#d1d3dc",
                  backgroundColor: "#2b2c3d",
                  borderColor: "#4d4f66",
                  width: "100%",
                }}
                inputProps={{ maxLength: 18 }}
                buttonStyle={{
                  color: "#d1d3dc",
                  backgroundColor: "#2b2c3d",
                  borderColor: "#4d4f66",
                }}
                dropdownStyle={{
                  color: "white",
                  backgroundColor: "#2b2c3d",
                  borderColor: "#4d4f66",
                }}
                value={ph}
                onChange={setPh}
              />
            </div>
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
        )}
      </Paper>
    </Container>
  );
}
