import { AppShell, Container } from "@mantine/core"
import { PropsWithChildren } from "react"
import Header from "./components/Header"

const Layout = ({ children }: PropsWithChildren<unknown>): JSX.Element => (
  <AppShell
    header={<Header />}
    padding="md"
    styles={(theme) => ({
      main: {
        paddingInline: 0,
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
        minHeight: "calc(100vh - 60px)",
      },
    })}
  >
    <Container>{children}</Container>
  </AppShell>
)

export default Layout
