type Guild = {
  id: number
  name: string
  imageUrl: string
  urlName: string
  roles: string[]
  memberCount: number
}

type CreateVotingForm = {
  platform: "TELEGRAM" | "DISCORD" | "WEB"
  platformId: string
  channelId?: string
  requirementId: number
  question: string
  startDate: number
  expDate: number
  options: string[]
  reactions?: string[]
}

export type { Guild, CreateVotingForm }
