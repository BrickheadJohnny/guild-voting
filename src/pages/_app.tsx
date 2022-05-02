import { MantineProvider } from "@mantine/core"
import { AppProps } from "next/app"
import Head from "next/head"
import { WagmiProvider } from "wagmi"
import Layout from "../components/Layout"
import { Web3ConnectionProvider } from "../components/Layout/Web3ConnectionContext"
import { client } from "../connectors"

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <title>Page title</title>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
    </Head>

    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <WagmiProvider client={client}>
        <Web3ConnectionProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3ConnectionProvider>
      </WagmiProvider>
    </MantineProvider>
  </>
)

export default App
