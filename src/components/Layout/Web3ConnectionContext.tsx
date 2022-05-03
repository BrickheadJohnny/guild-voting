import { Alert, Button, Group, Modal, Text } from "@mantine/core"
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import shortenHex from "../../utils/shortenHex"

const Web3ConnectionContext = createContext({
  isConnectionModalOpen: false,
  openConnectionModal: () => {},
  closeConnectionModal: () => {},
  openAccountModal: () => {},
  closeAccountModal: () => {},
})

const Web3ConnectionProvider = ({
  children,
}: PropsWithChildren<unknown>): JSX.Element => {
  const { connectors, connect, isConnected, isConnecting, pendingConnector, error } =
    useConnect()
  const { disconnect } = useDisconnect()
  const { data: accountData } = useAccount()

  const [isConnectionModalOpen, setIsConnectionModalOpen] = useState(false)
  const openConnectionModal = () => setIsConnectionModalOpen(true)
  const closeConnectionModal = () => setIsConnectionModalOpen(false)

  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
  const openAccountModal = () => setIsAccountModalOpen(true)
  const closeAccountModal = () => setIsAccountModalOpen(false)

  useEffect(() => closeConnectionModal(), [isConnected])

  return (
    <Web3ConnectionContext.Provider
      value={{
        isConnectionModalOpen,
        openConnectionModal,
        closeConnectionModal,
        openAccountModal,
        closeAccountModal,
      }}
    >
      {children}

      <Modal
        opened={isConnectionModalOpen}
        onClose={closeConnectionModal}
        centered
        size="sm"
        title="Connect to a wallet"
      >
        {error && (
          <Alert title="Connection error" color="red" mb={16}>
            {error.message}
          </Alert>
        )}

        <Group spacing="sm" direction="column">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              variant="default"
              size="lg"
              fullWidth
              sx={(theme) => ({
                fontSize: theme.fontSizes.md,
              })}
              disabled={
                !connector.ready ||
                (isConnecting && connector.id === pendingConnector?.id)
              }
              loading={isConnecting && connector.id === pendingConnector?.id}
              loaderProps={{
                size: "xs",
              }}
              onClick={() => connect(connector)}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isConnecting &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </Button>
          ))}
        </Group>
      </Modal>

      <Modal
        opened={isAccountModalOpen}
        onClose={closeAccountModal}
        centered
        size="sm"
        title="Account"
      >
        {accountData?.address && (
          <Group spacing="sm" direction="row" position="apart">
            <Text size="xl">{shortenHex(accountData.address, 5)}</Text>
            <Button
              color="gray"
              size="xs"
              onClick={() => {
                disconnect()
                closeAccountModal()
              }}
            >
              Disconnect
            </Button>
          </Group>
        )}
      </Modal>
    </Web3ConnectionContext.Provider>
  )
}

const useWeb3Connection = () => useContext(Web3ConnectionContext)

export { Web3ConnectionProvider, useWeb3Connection }
