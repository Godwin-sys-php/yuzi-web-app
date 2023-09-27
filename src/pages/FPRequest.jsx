import React from "react";
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
import { fpRequest } from "../services/users";

export default class FPRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      email: "",
      success: false,
    };
  }

  _onClick = async () => {
    try {
      this.setState({ loading: true, })
      const data = await fpRequest({ email: this.state.email });
      if (data.emailSent) {
        this.setState({ success: true });
      } else {
        this.setState({ error: data.message, success: false, });
      }
    } catch (error) {
      this.setState({ error: "Une erreur inconnu a eu lieu", success: false });
    }
  };

  render() {
    if (this.state.success) {
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
          <br />
          <Alert color={"green"}>
            Mail envoyé avec succès !
            <br />
            Vérifiez votre boîte email {this.state.email}
          </Alert>
        </Container>
      );
    }
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
          Mot de passe oublié ?
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Rentrez votre adresse email afin de recevoir un mail de
          réinitialisation
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Adresse email"
            placeholder="john@doe.com"
            onChange={({ target }) => this.setState({ email: target.value })}
            value={this.state.email}
          />
          {this.state.error.length > 0 && (
            <>
              <br />
              <Alert color={"red"}>{this.state.error}</Alert>
            </>
          )}
          <Button
            fullWidth
            mt="xl"
            disabled={this.state.email.length === 0}
            loading={this.state.loading}
            onClick={!this.state.loading ? this._onClick : null}
          >
            Confirmer
          </Button>
        </Paper>
      </Container>
    );
  }
}
