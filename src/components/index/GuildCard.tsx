import { Badge, Box, Card, Group, Image, Title } from "@mantine/core"
import Link from "next/link"
import { GuildSimple } from "types"

type Props = {
  guild: GuildSimple
}

const GuildCard = ({ guild }: Props): JSX.Element => (
  <Link href={`/${guild.urlName}`} passHref>
    <Card
      component="a"
      shadow="sm"
      p="lg"
      sx={(theme) => ({
        textDecoration: "none",
        backgroundColor: theme.colors.dark[7],
        "&:hover": {
          textDecoration: "none",
          backgroundColor: theme.colors.dark[6],
        },
      })}
      withBorder
    >
      <Group spacing={20} noWrap>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            src={
              guild.imageUrl?.startsWith("https")
                ? guild.imageUrl
                : `https://guild.xyz${guild.imageUrl}`
            }
            alt={guild.name}
            width={guild.imageUrl?.startsWith("https") ? 40 : 20}
            height={guild.imageUrl?.startsWith("https") ? 40 : 20}
            fit={guild.imageUrl?.startsWith("https") ? "cover" : undefined}
          />
        </Box>
        <Group
          direction="column"
          spacing={8}
          style={{
            maxWidth: "calc(100% - 60px)",
          }}
        >
          <Title
            order={2}
            sx={(theme) => ({
              maxWidth: "100%",
              fontSize: theme.fontSizes.lg,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            })}
          >
            {guild.name}
          </Title>
          <Group spacing={5}>
            <Badge
              size="sm"
              sx={(theme) => ({
                backgroundColor: theme.colors.dark[6],
                color: theme.colors.dark[1],
              })}
            >{`${guild.memberCount} member${
              guild.memberCount > 1 ? "s" : ""
            }`}</Badge>
            <Badge
              size="sm"
              sx={(theme) => ({
                backgroundColor: theme.colors.dark[6],
                color: theme.colors.dark[1],
              })}
            >{`${guild.roles?.length} member${
              guild.roles?.length > 1 ? "s" : ""
            }`}</Badge>
          </Group>
        </Group>
      </Group>
    </Card>
  </Link>
)

export default GuildCard
