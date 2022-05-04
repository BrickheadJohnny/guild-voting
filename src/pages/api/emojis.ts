import type { NextApiRequest, NextApiResponse } from "next"

type Data = { name: string; character: string; group: string }[]

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const data = await fetch(
    `https://emoji-api.com/emojis?access_key=${process.env.EMOJI_API_KEY}`
  )
    .then((emojiRes) => emojiRes.json())
    .then((rawEmojiData) =>
      rawEmojiData
        .filter(
          (emoji) =>
            emoji.group === "smileys-emotion" || emoji.group === "people-body"
        )
        .slice(0, 64)
        .map((emoji) => ({
          name: emoji.slug,
          character: emoji.character,
          group: "Basic emojis",
        }))
    )
    .catch(() => [])

  res.status(200).json(data)
}

export default handler
