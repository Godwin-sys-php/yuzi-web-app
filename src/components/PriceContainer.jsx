import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import url from "../services/url";
import useStore from "../store";

export default function PricingContainer({
  name,
  price,
  credit,
  support,
  beta,
}) {
  const theme = useMantineTheme();
  const store = useStore((state) => state);

  return (
    <Box
      style={{
        boxShadow: "0px 30px 50px -7px rgba(0,0,0,0.1)",
        padding: "1.5rem",
        paddingInline: "1.5rem",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[5] : "white",
        borderRadius: "0.7rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        "@media (max-width: 755px)": {
          width: "19rem",
          borderRadius: "0.7rem",
        },
        "@media (min-width: 756px) and (max-width: 820px)": {
          width: "15rem",
          borderRadius: "0.7rem 0 0 0.7rem",
        },
      }}
    >
      <Stack w={"100%"} align={"center"} spacing={20}>
        <Text
          sx={{
            fontWeight: 700,
            color:
              theme.colorScheme === "dark"
                ? theme.colors.dark[1]
                : "hsl(233, 13%, 49%)",
          }}
          fz={"md"}
        >
          {name}
        </Text>
        <Title
          order={2}
          sx={{
            color:
              theme.colorScheme === "dark" ? "white" : "hsl(232, 13%, 33%)",
            fontSize: 50,
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Text fz={"2rem"}>$</Text>
          {price}
          {price == "0" ? null : <Text fz={"1rem"}>/mois</Text>}
        </Title>
        <Stack
          w={"100%"}
          align="center"
          spacing={10}
          sx={{ color: theme.colorScheme === "light" && "hsl(233, 13%, 49%)" }}
        >
          <Divider
            sx={{
              width: "100%",
              borderColor: theme.colorScheme === "dark" && "gray",
              opacity: theme.colorScheme === "dark" && 0.7,
            }}
          />
          <Text fz={"sm"} fw={600}>
            {credit}
          </Text>
          <Divider
            sx={{
              width: "100%",
              borderColor: theme.colorScheme === "dark" && "gray",
              opacity: theme.colorScheme === "dark" && 0.7,
            }}
          />
          <Text fz={"sm"} fw={600}>
            {support}
          </Text>
          <Divider
            sx={{
              width: "100%",
              borderColor: theme.colorScheme === "dark" && "gray",
              opacity: theme.colorScheme === "dark" && 0.7,
            }}
          />
        </Stack>
        <form action={`${url}/users/activate`} method="POST">
          <input type={"hidden"} value={store.token} name="token" />
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            w="100%"
          >
            COMMENCER
          </Button>
        </form>
      </Stack>
    </Box>
  );
}
