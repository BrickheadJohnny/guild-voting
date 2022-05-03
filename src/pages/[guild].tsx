import { Alert, Box, Card, Container, Loader, Title } from "@mantine/core"
import useGuild from "hooks/useGuild"
import { useAccount } from "wagmi"

const Guild = (): JSX.Element => {
  const { data: account } = useAccount()
  const {
    data: { name },
    isValidating,
    error,
  } = useGuild()

  return (
    <Container size="xs" py={16}>
      {!account?.address ? (
        <Alert title="Please connect your wallet" color="red">
          Please connect your wallet in order to continue.
        </Alert>
      ) : isValidating ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      ) : error ? (
        <Alert title="Uh-oh!" color="red">
          Unfortunately we couldn't fetch this guild right now.
        </Alert>
      ) : (
        <>
          <Title order={2} mb={24} align="center">{`${name} - new voting`}</Title>
          <Card>TODO</Card>
        </>
      )}
    </Container>
  )
}

export default Guild
