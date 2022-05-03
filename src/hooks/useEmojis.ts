import useSWR from "swr"

const fetcher = (endpoint: string) =>
  fetch(endpoint)
    .then((res) => res.json())
    .catch(() => [])

const useEmojis = () =>
  useSWR("/api/emojis", fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  })

export default useEmojis
