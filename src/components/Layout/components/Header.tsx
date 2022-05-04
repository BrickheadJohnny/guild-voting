import { Header as MantineHeader, Title } from "@mantine/core"
import dynamic from "next/dynamic"
import Link from "next/link"

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
    <Link href="/" passHref>
      <Title
        sx={(theme) => ({
          fontSize: theme.fontSizes.xl,
          height: 40,
          lineHeight: "40px",
          cursor: "pointer",
        })}
      >
        Guild voting
      </Title>
    </Link>
    <DynamicConnectButton />
  </MantineHeader>
)

export default Header
