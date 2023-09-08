import Navbar from "../components/Navbar";
import {
  createStyles,
  Avatar,
  Text,
  Group,
  Container,
  Grid,
  Divider,
  SimpleGrid,
} from "@mantine/core";
import AccountCard from "../components/AccountCard";
import { useNavigate } from "react-router-dom";
import useStore from "../store";
import Cookies from "js-cookie";

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export default function Account() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const store = useStore();

  const _blurPN = (numero) => {
    // Vérifier si le numéro est valide
    // Extraire les parties du numéro
    var indicatif = numero.substring(0, 4);
    var chiffresMasques = "*****";
    var numeroFinal = numero.substring(9);

    // Retourner le numéro masqué
    return indicatif + chiffresMasques + numeroFinal;
  };

  return (
    <>
      <Navbar />
      <Container>
        <br />
        <Grid align={"center"}>
          <Grid.Col sm={4} md={2} style={{ fontSize: "50px" }}>
            <i className="fa-solid fa-circle-user fa-2xl"></i>
          </Grid.Col>
          <Grid.Col sm={8} md={10}>
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              ESSAI GRATUIT
            </Text>

            <Text fz="2xl" fw={500} className={classes.name}>
              {store.userData.fname + " " + store.userData.lname}
            </Text>

            <Group noWrap spacing={10} mt={3}>
              <i className="fa-solid fa-at"></i>
              <Text fz="lg" c="dimmed">
                {store.userData.email}
              </Text>
            </Group>

            <Group noWrap spacing={10} mt={5}>
              <i className="fa-solid fa-phone"></i>
              <Text fz="lg" c="dimmed">
                {_blurPN(store.userData.phoneNumber)}
              </Text>
            </Group>
          </Grid.Col>
        </Grid>
      </Container>
      <br />
      <Divider color={"#34354a"} />
      <Container>
        <br />
        <Grid>
          <Grid.Col sm={12} md={4}>
            <AccountCard
              title={"Favoris"}
              icon={<i className="fa-solid fa-heart"></i>}
              from="orange"
              to="red"
              desc="Naviguez dans vos éléments favoris"
              onClick={() => navigate("/account/favorite")}
            />
          </Grid.Col>
          <Grid.Col sm={12} md={4}>
            <AccountCard
              title={"Historique"}
              icon={<i className="fa-solid fa-history"></i>}
              from="indigo"
              to="cyan"
              desc="Naviguez dans votre historique d'utilisation"
              onClick={() => navigate("/account/history")}
            />
          </Grid.Col>
          <Grid.Col sm={12} md={4}>
            <AccountCard
              title={"Déconnexion"}
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
              from="grey"
              to="grey"
              desc="Déconnectez vous de votre compte"
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("userData");
                Cookies.remove("id");
                store.setToken("");
                store.setUserData({});
                navigate("/")
              }}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
