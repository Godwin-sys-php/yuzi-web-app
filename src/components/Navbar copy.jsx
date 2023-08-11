import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Image,
  Card,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "../assets/logo-rond.png";
import { Link } from "react-router-dom";
import useStore from "../store";

const HEADER_HEIGHT = rem(80);
const LOGO_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  root: {
    position: "sticky",
    zIndex: 100,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none !important",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

function FalseNavbar({ links }) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const { classes, cx } = useStyles();
  const credits = useStore((state) => state.credits);

  const items = links.map((link) => (
    <Link
      to={link.link}
      key={link.label}
      className={cx(classes.link, {
        [classes.linkActive]: window.location.pathname === link.link,
      })}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          &nbsp;
          &nbsp;
          <div>
            <Image src={logo} width={"4rem"} />
          </div>
        </div>

        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Card align={"center"} justify={"space-between"}>
          <i className="fa-solid fa-coins fa-xl"></i>
          &nbsp; {credits}
        </Card>

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>

      </Container>
    </Header>
  );
}

export default function Navbar() {
  return (
    <FalseNavbar
      links={[
        {
          link: "/home",
          label: "Accueil",
        },
        {
          link: "/revision",
          label: "Révision",
        },
        {
          link: "/redaction",
          label: "Rédaction",
        },
        {
          link: "/about",
          label: "À propos",
        },
        {
          link: "/faq",
          label: "FAQ",
        },
        {
          link: "/account",
          label: <><i className="fa-regular fa-circle-user"></i>&nbsp; Compte</>,
        },
      ]}
    />
  );
}
