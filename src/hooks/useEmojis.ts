import useSWR from "swr"
import { Emoji } from "types"

const fetcher = (endpoint: string) =>
  fetch(endpoint)
    .then((res) => res.json())
    .catch(() => [])

const useEmojis = () =>
  useSWR<Emoji[]>("/api/emojis", fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

export default useEmojis
