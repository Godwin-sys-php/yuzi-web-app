import { createStyles, Paper, Text, ThemeIcon, rem, Grid } from "@mantine/core";

export default function AccountCard({ onClick, title, icon, from, to, desc }) {
  const useStyles = createStyles((theme) => ({
    card: {
      position: "relative",
      cursor: "pointer",
      overflow: "hidden",
      transition: "transform 150ms ease, box-shadow 100ms ease",
      padding: theme.spacing.sm,
      paddingLeft: `calc(${theme.spacing.sm} * 2)`,

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
        background: `linear-gradient(${from} 0%, ${to} 100%)`,
      },
    },
  }));
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.card} onClick={onClick}>
      <Grid align={"center"}>
        <Grid.Col span={3}>
          <ThemeIcon
            style={{ width: "3rem", height: "3rem" }}
            size="xl"
            radius="md"
            variant="gradient"
            gradient={{ deg: 0, from: from, to: to }}
          >
            <span style={{ fontSize: "2em" }}>
              {icon}
            </span>
          </ThemeIcon>
        </Grid.Col>
        <Grid.Col span={9}>
          <Text size="xl" weight={500}>
            {title}
          </Text>
          <Text size="sm" color="dimmed">
            {desc}
          </Text>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
