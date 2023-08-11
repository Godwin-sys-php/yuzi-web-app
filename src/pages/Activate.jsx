import { Container, Grid, Image, Text, Title } from "@mantine/core";
import NavbarActivate from "../components/NavbarActivate";
import PricingContainer from "../components/PriceContainer";
import logo from "../assets/logo-rond.png";

export default function Activate() {
  return (
    <>
      <Container>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
          <Image src={logo} width={"7rem"} />
        </div>
        <div style={{ marginTop: "1rem", marginBottom: "2rem" }}>
          <Title size={"h1"} fw={"900"} align="center">
            Élevez Votre Rédaction et Révision au Niveau Supérieur
          </Title>
          <br />
          <Title size={"h4"} align="center">
            Choisissez le plan qui vous convient le mieux et découvrez le
            potentiel illimité de nos outils de rédaction et de révision.
            Commencez à transformer vos idées en textes exceptionnels dès
            aujourd'hui.
          </Title>
        </div>
        <Grid style={{ justifyContent: "center", marginBottom: "3rem" }}>
          <Grid.Col sm={12} md={4}>
            <PricingContainer
              price={"0"}
              credit={"5 crédits d'essais"}
              name={"Essai Gratuit"}
              support={"Support standard"}
            />
          </Grid.Col>
          <Grid.Col sm={12} md={4}>
            <PricingContainer
              price={"7"}
              credit={"10 crédits par jours"}
              name={"Eco"}
              support={"Support standard"}
            />
          </Grid.Col>
          <Grid.Col sm={12} md={4}>
            <PricingContainer
              price={"15"}
              credit={"20 crédits par jours"}
              name={"Standard"}
              support={"Support standard"}
            />
          </Grid.Col>
          <Grid.Col sm={12} md={4}>
            <PricingContainer
              price={"25"}
              credit={"50 crédits par jours"}
              name={"Premium"}
              support={"Support prioritaire"}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
}
