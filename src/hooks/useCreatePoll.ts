import { showNotification, updateNotification } from "@mantine/notifications"
import { useState } from "react"
import { CreateVotingForm, CreateVotingPayload } from "types"

const preparePayload = (data: CreateVotingForm): CreateVotingPayload => {
  const [startDate, expDate] = data.pollDuration
  const options: string[] = []
  const reactions: string[] = []

  data.options.forEach((option) => {
    options.push(option.label)
    reactions.push(option.emoji)
  })

  return {
    platform: data.platform,
    platformId: data.platformId,
    channelId: data.channelId,
    requirementId: data.requirementId,
    question: data.question,
    startDate: parseInt((startDate.getTime() / 1000).toString()).toString(),
    expDate: parseInt((expDate.getTime() / 1000).toString()).toString(),
    options,
    reactions,
  }
}

const useCreatePoll = (onSuccess?: () => void) => {
  // const { data: account } = useAccount()
  // const { signMessageAsync } = useSignMessage()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: CreateVotingForm) => {
    setIsLoading(true)

    showNotification({
      id: "creating-poll",
      loading: true,
      title: "Creating poll",
      message: "...for your amazing guild members",
      autoClose: false,
      disallowClose: true,
    })

    const body = preparePayload(data)

    // Preparing the validation object
    // const random = randomBytes(32).toString("base64")
    // const hash = utils.keccak256(utils.toUtf8Bytes(stringify(body)))
    // const timestamp = new Date().getTime().toString() // TODO: make an API endpoint for this...
    // const nonce = utils.keccak256(utils.toUtf8Bytes(`${account?.address}${random}`))

    // const addressSignedMessage = await signMessageAsync({
    //   message: `Please sign this message to verify your request!\nNonce: ${nonce}\nRandom: ${random}\n${
    //     hash ? `Hash: ${hash}\n` : ""
    //   }Timestamp: ${timestamp}`,
    // })

    // const validation = {
    //   address: account?.address,
    //   addressSignedMessage,
    //   nonce,
    //   random,
    //   hash,
    //   timestamp,
    // }

    // Finally, sending the request
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/poll`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        onSuccess?.()
        return res.json()
      })
      .catch((error) => {
        updateNotification({
          id: "creating-poll",
          color: "red",
          title: "Uh-oh!",
          message: "An error occurred",
          autoClose: 4000,
        })
        return { error }
      })
      .finally(() => setIsLoading(false))
  }

  return { onSubmit, isLoading }
}

export default useCreatePoll
