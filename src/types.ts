type GuildSimple = {
  id: number
  name: string
  imageUrl: string
  urlName: string
  roles: string[]
  memberCount: number
}

type Theme = {
  mode: "DARK" | "LIGHT"
  color?: any
  backgroundImage?: string
  backgroundCss?: any
}

type Chain =
  | "ETHEREUM"
  | "BSC"
  | "POLYGON"
  | "XDAI"
  | "AVALANCHE"
  | "FANTOM"
  | "ARBITRUM"
  | "CELO"
  | "HARMONY"
  | "JUICEBOX"
  | "GOERLI"
  | "OPTIMISM"
  | "MOONRIVER"
  | "GNOSIS"

type Logic = "AND" | "OR" | "NAND" | "NOR"

type Requirement = {
  id: number
  type: string
  address: string
  chain: Chain
  roleId: number
  name: string
  symbol: string
  data: {
    id?: string
    amount?: number
    strategy?: { name: string; params: any }
    addresses?: string[]
    attribute?: {
      trait_type: string
      value?: string
      interval?: {
        min: number
        max: number
      }
    }
  }
}

type Role = {
  id: number
  name: string
  description: string
  imageUrl: string
  logic: Logic
  requirements: Requirement[]
  platforms: {
    roleId: number
    platformId: number
    inviteChannel: string
    discordRoleId: string
  }[]
  members: string[]
  memberCount: number
}

type Guild = {
  id: number
  ownerId: number
  name: string
  urlName: string
  description: string
  imageUrl: string
  showMembers: boolean
  theme: Theme
  platforms: {
    id: number
    platformId: string
    type: string
    platformName: string
  }[]
  roles: Role[]
  admins: {
    id: number
    address: string
  }[]
}

type DiscordServerData = {
  serverIcon: string
  serverName: string
  serverId: string
  roles: any[]
  isAdmin: boolean
  membersWithRole: number
  channels: { id: string; name: string }[]
}

type CreateVotingForm = {
  platform: "TELEGRAM" | "DISCORD" | "WEB"
  platformId: string
  channelId?: string
  requirementId: number
  question: string
  pollDuration: [Date, Date]
  options: { label: string; emoji: string }[]
}

type CreateVotingPayload = {
  platform: "TELEGRAM" | "DISCORD" | "WEB"
  platformId: string
  channelId?: string
  requirementId: number
  question: string
  startDate: string
  expDate: string
  options: string[]
  reactions?: string[]
}

type Channel = { name: string; id: string }

type Emoji = { name: string; image?: string; character: string; group: string }

export type {
  GuildSimple,
  Guild,
  DiscordServerData,
  CreateVotingForm,
  CreateVotingPayload,
  Channel,
  Emoji,
}
