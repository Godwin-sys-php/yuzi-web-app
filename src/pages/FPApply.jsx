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
import { fpApply } from "../services/users";

export default class FPApply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: "",
      pwd: "",
      success: false,
    };
    this.token = window.location.pathname.split("/reset-password/")[1]
  }

  _onClick = async () => {
    try {
      this.setState({ loading: true, })
      const data = await fpApply({ newPass: this.state.pwd, token: this.token });
      if (data.update) {
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
            <br />
            Mot de passe modifié avec succès !
            <br />
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
          Changer de mot de passe
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Choisissez votre nouveau mot de passe
        </Text>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Mot de passe"
            placeholder="********"
            type={"password"}
            onChange={({ target }) => this.setState({ pwd: target.value })}
            value={this.state.pwd}
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
            disabled={this.state.pwd.length <= 8}
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
