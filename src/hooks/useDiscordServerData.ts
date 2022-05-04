import useSWR from "swr"
import { DiscordServerData } from "types"

const fetcher = (endpoint: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, { method: "POST" })
    .then((res) => res.json())
    .catch((_) => ({}))

const useDiscordServerData = (serverId: string) =>
  useSWR<DiscordServerData | Record<string, any>>(
    serverId ? `/discord/server/${serverId}` : null,
    fetcher,
    {
      refreshInterval: 0,
      revalidateOnFocus: false,
      fallbackData: {},
    }
  )

export default useDiscordServerData
