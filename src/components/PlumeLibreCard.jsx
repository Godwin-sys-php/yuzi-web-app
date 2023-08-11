import {
  createStyles,
  Paper,
  Text,
  ThemeIcon,
  rem,
  Grid,
  MediaQuery,
} from "@mantine/core";

export default function PlumeLibreCard({ onClick }) {
  const useStyles = createStyles((theme) => ({
    card: {
      position: "relative",
      cursor: "pointer",
      overflow: "hidden",
      transition: "transform 150ms ease, box-shadow 100ms ease",
      padding: theme.spacing.xl,
      paddingLeft: `calc(${theme.spacing.xl} * 2)`,

      "&:hover": {
        boxShadow: theme.shadows.xl,
        transform: "scale(1.02)",
      },

      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: rem(6),
        background: "linear-gradient(#4A00E0 0%, #8E2DE2 100%)",
      },
    },
  }));
  const { classes } = useStyles();
  return (
    <>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Paper
          withBorder
          radius="md"
          className={classes.card}
          onClick={onClick}
        >
          <Grid align={"center"}>
            <Grid.Col sm={12} md={2}>
              <ThemeIcon
                style={{ width: "5rem", height: "5rem" }}
                size="xl"
                radius="md"
                variant="gradient"
                gradient={{ deg: 0, from: "#4A00E0", to: "#8E2DE2" }}
              >
                <span style={{ fontSize: "2em" }}>
                  <i className="fas fa-feather fa-xl"></i>
                </span>
              </ThemeIcon>
            </Grid.Col>
            <Grid.Col sm={12} md={10}>
              <Text size="xl" weight={500} mt="md">
                {"Plume Libre"}
              </Text>
              <Text size="sm" mt="sm" color="dimmed">
                {
                  "Libérez votre créativité avec Plume Libre. Dirigez l'IA pour rédiger, questionner ou explorer des idées, sans aucune contrainte."
                }
              </Text>
            </Grid.Col>
          </Grid>
        </Paper>
      </MediaQuery>

      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Paper
          withBorder
          radius="md"
          className={classes.card}
          onClick={onClick}
        >
          <ThemeIcon
            size="xl"
            radius="md"
            variant="gradient"
            gradient={{ deg: 0, from: "#4A00E0", to: "#8E2DE2" }}
          >
          <i className="fas fa-feather fa-xl"></i>
          </ThemeIcon>
          <Text size="xl" weight={500} mt="md">
          {"Plume Libre"}
          </Text>
          <Text size="sm" mt="sm" color="dimmed">
            {"Libérez votre créativité avec Plume Libre. Dirigez l'IA pour rédiger, questionner ou explorer des idées, sans aucune contrainte."}
          </Text>
        </Paper>
      </MediaQuery>
    </>
  );
}
