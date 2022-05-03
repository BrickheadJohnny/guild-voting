import useSWR from "swr"
import { useAccount } from "wagmi"
import { Guild } from "../types"

const fetcher = (endpoint: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)
    .then((res) => res.json())
    .catch(() => [])

const useMyGuilds = () => {
  const { data } = useAccount()
  return useSWR<Guild[]>(
    data?.address ? `/guild/address/${data.address}?include=admin` : null,
    fetcher,
    {
      refreshInterval: 0,
    }
  )
}

export default useMyGuilds
