import { chain, createWagmiClient, defaultChains } from "wagmi"
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet"
import { InjectedConnector } from "wagmi/connectors/injected"
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { WalletConnectConnector } from "wagmi/connectors/walletConnect"

const chains = defaultChains
const defaultChain = chain.mainnet

// Set up connectors
const client = createWagmiClient({
  autoConnect: true,
  connectors({ chainId }) {
    const currentChain = chains.find((c) => c.id === chainId) ?? defaultChain
    const rpcUrl = currentChain.rpcUrls.default
    return [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: "wagmi",
          chainId: currentChain.id,
          jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          qrcode: true,
          rpc: { [currentChain.id]: rpcUrl },
        },
      }),
      new InjectedConnector({
        chains,
        options: { name: "Injected" },
      }),
    ]
  },
})

export { client }
