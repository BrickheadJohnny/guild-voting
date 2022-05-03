import { Alert, Grid, Loader } from "@mantine/core"
import GuildCard from "components/index/GuildCard"
import useMyGuilds from "hooks/useMyGuilds"
import type { NextPage } from "next"
import { useAccount } from "wagmi"

const Home: NextPage = () => {
  const { data: account } = useAccount()
  const { data: guilds, isValidating, error } = useMyGuilds()

  return (
    <Grid my={28} columns={2}>
      {!account?.address ? (
        <Grid.Col span={2}>
          <Alert title="Please connect your wallet" color="red">
            Please connect your wallet so we can list your guilds.
          </Alert>
        </Grid.Col>
      ) : isValidating ? (
        <Grid.Col
          span={2}
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: 20,
          }}
        >
          <Loader />
        </Grid.Col>
      ) : error ? (
        <Grid.Col span={2}>
          <Alert title="Uh-oh!" color="red">
            Unfortunately we couldn't fetch your guilds right now.
          </Alert>
        </Grid.Col>
      ) : guilds?.length ? (
        guilds?.map((guild) => (
          <Grid.Col span={1} key={guild.id}>
            <GuildCard guild={guild} />
          </Grid.Col>
        ))
      ) : (
        <Grid.Col span={2}>
          <Alert title="Hmmm!">Seems like you haven't joined a guild yet.</Alert>
        </Grid.Col>
      )}
    </Grid>
  )
}

export default Home
