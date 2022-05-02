import { Header as MantineHeader, Title } from "@mantine/core"
import dynamic from "next/dynamic"

const DynamicConnectButton = dynamic(() => import("./ConnectButton"), { ssr: false })

const Header = (): JSX.Element => (
  <MantineHeader
    height={60}
    px="md"
    py="xs"
    sx={{
      display: "flex",
      justifyContent: "space-between",
    }}
  >
    <Title
      sx={(theme) => ({
        fontSize: theme.fontSizes.xl,
        height: 40,
        lineHeight: "40px",
      })}
    >
      Frontend
    </Title>
    <DynamicConnectButton />
  </MantineHeader>
)

export default Header
