import { createStyles, Paper, Text, ThemeIcon, rem } from "@mantine/core";

export default function RevisionToolCard({ title, description, icon, onClick }) {
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
        background: "linear-gradient(#FC466B 0%, #3F5EFB 100%)",
      },
    },
  }));
  const { classes } = useStyles();
  return (
    <Paper withBorder radius="md" className={classes.card} onClick={onClick}>
      <ThemeIcon
        size="xl"
        radius="md"
        variant="gradient"
        gradient={{ deg: 0, from: "#FC466B", to: "#3F5EFB" }}
      >
        {icon}
      </ThemeIcon>
      <Text size="xl" weight={500} mt="md">
        {title}
      </Text>
      <Text size="sm" mt="sm" color="dimmed">
        {description}
      </Text>
    </Paper>
  );
}