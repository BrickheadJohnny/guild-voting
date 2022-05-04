import useSWR from "swr"
import { Emoji } from "types"

const fetcher = (endpoint) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)
    .then((res) => res.json())
    .then((emotes) =>
      emotes.map((emote) => ({
        name: emote.name,
        image: emote.image,
        character: `<${emote.animated ? "a" : ""}:${emote.name}:${emote.id}>`,
        group: "Server emotes",
      }))
    )
    .catch((_) => [])

const useServerEmojis = (serverId: string) =>
  useSWR<Emoji[]>(serverId ? `/discord/emotes/${serverId}` : null, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

export default useServerEmojis
