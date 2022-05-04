import useSWR from "swr"
import { Channel } from "types"

const fetcher = (endpoint: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)
    .then((res) => res.json())
    .catch((_) => [])

const useDiscordChannels = (serverId: string) =>
  useSWR<Channel[]>(serverId ? `/discord/channels/${serverId}` : null, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    fallbackData: [],
  })

export default useDiscordChannels
