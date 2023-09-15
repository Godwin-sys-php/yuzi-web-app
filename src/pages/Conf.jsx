import { Container } from "@mantine/core";
import React from "react";

export default class Conf extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <h1>Politique de confidentialité de Yuzi</h1>
        <h3>1. Introduction</h3>
        <p>
          Bienvenue chez Yuzi! Nous sommes déterminés à protéger la
          confidentialité de nos utilisateurs. Cette politique de
          confidentialité décrit comment nous collectons, utilisons, stockons et
          protégeons vos informations personnelles.
        </p>

        <h3>2. Informations que nous collectons</h3>
        <p>
          Lors de votre utilisation de Yuzi, nous pouvons collecter les
          informations suivantes:
        </p>
        <ul>
          <li>
            <strong>Email</strong>: utilisé pour l'authentification et la
            communication.
          </li>
          <li>
            <strong>Numéro de téléphone</strong>: utilisé pour
            l'authentification, le fonctionnement et la communication.
          </li>
          <li>
            <strong>Nom</strong>: utilisé pour le référencement au sein de notre
            application.
          </li>
        </ul>

        <h3>3. Comment nous utilisons vos informations</h3>
        <p>Nous utilisons vos informations pour:</p>
        <ul>
          <li>
            Vous permettre de créer un compte et d'utiliser notre application.
          </li>
          <li>
            Vous envoyer des notifications, des alertes ou des communications
            liées à l'application.
          </li>
          <li>
            Améliorer et optimiser notre application pour vous offrir une
            meilleure expérience utilisateur.
          </li>
        </ul>

        <h3>4. Partage de vos informations</h3>
        <p>
          Nous ne vendons, ne louons ni ne partageons vos informations
          personnelles avec des tiers à des fins de marketing sans votre
          consentement explicite. Nous pouvons partager vos informations:
        </p>
        <ul>
          <li>Si cela est requis par la loi ou par une décision judiciaire.</li>
          <li>
            Pour protéger nos droits, notre propriété, notre sécurité, nos
            utilisateurs ou le public.
          </li>
        </ul>

        <h3>5. Sécurité de vos informations</h3>
        <p>
          Nous utilisons diverses mesures de sécurité pour protéger vos
          informations. Cependant, aucune méthode de transmission ou de stockage
          électronique n'est totalement sécurisée. Bien que nous nous efforcions
          de protéger vos informations personnelles, nous ne pouvons garantir
          leur sécurité à 100%.
        </p>

        <h3>6. Communication</h3>
        <p>
          Nous pouvons utiliser votre email et votre numéro de téléphone pour
          vous contacter concernant votre compte ou des mises à jour importantes
          relatives à Yuzi.
        </p>

        <h3>7. Modifications de cette politique</h3>
        <p>
          Nous nous réservons le droit de modifier cette politique de
          confidentialité à tout moment. Si des modifications importantes sont
          apportées, nous vous en informerons par email ou via une notification
          dans l'application.
        </p>
      </Container>
    );
  }
}
