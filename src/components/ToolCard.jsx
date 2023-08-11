import { createStyles, Paper, Text, ThemeIcon, rem } from "@mantine/core";

export default function ToolCard({ title, description, icon, colorCombo, onClick }) {
  const getBgImage = (theme) => {
    switch (colorCombo) {
      case 1:
        return theme.fn.linearGradient(
          0,
          theme.colors.pink[6],
          theme.colors.orange[6]
        );
      case 2:
        return theme.fn.linearGradient(
          0,
          theme.colors.teal[6],
          theme.colors.lime[6]
        );
      case 3:
        return theme.fn.linearGradient(
          0,
          theme.colors.teal[6],
          theme.colors.blue[6]
        );
      case 4:
        return theme.fn.linearGradient(
          0,
          theme.colors.indigo[6],
          theme.colors.cyan[6]
        );
    }
  };

  const getFrom = () => {
    switch (colorCombo) {
      case 1:
        return "pink";
      case 2:
        return "teal";
      case 3:
        return "teal";
      case 4:
        return "indigo";
    }
  };

  const getTo = () => {
    switch (colorCombo) {
      case 1:
        return "orange";
      case 2:
        return "lime";
      case 3:
        return "blue";
      case 4:
        return "cyan";
    }
  };

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
        backgroundImage: getBgImage(theme),
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
        gradient={{ deg: 0, from: getFrom(), to: getTo() }}
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
