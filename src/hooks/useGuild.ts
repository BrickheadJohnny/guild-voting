import { useRouter } from "next/router"
import useSWR from "swr"
import { Guild } from "types"

const fetcher = (endpoint: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`)
    .then((res) => res.json())
    .catch(() => ({}))

const useGuild = () => {
  const router = useRouter()
  const urlName = router.query?.guild?.toString()

  return useSWR<Guild | Record<string, any>>(`/guild/${urlName}`, fetcher, {
    refreshInterval: 0,
    fallbackData: {},
  })
}

export default useGuild
