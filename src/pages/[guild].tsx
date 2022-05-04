import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Loader,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core"
import { DateRangePicker } from "@mantine/dates"
import { formList, useForm } from "@mantine/form"
import { updateNotification } from "@mantine/notifications"
import SelectItemWithDescription from "components/Select/SelectItemWithDescription"
import useCreatePoll from "hooks/useCreatePoll"
import useDiscordServerData from "hooks/useDiscordServerData"
import useEmojis from "hooks/useEmojis"
import useGuild from "hooks/useGuild"
import { useEffect, useMemo } from "react"
import { Check, Plus, Rocket, Trash } from "tabler-icons-react"
import { CreateVotingForm } from "types"
import { useAccount } from "wagmi"

const platformTypeNames = {
  DISCORD: "Discord",
  TELEGRAM: "Telegram",
  WEB: "Web",
}

const currentDate = new Date()

const Guild = (): JSX.Element => {
  const { data: account, isLoading: isAccountLoading } = useAccount()
  const {
    data: { admins, name, platforms, roles },
    isValidating,
    error,
  } = useGuild()
  const {
    data: { channels },
    isValidating: isDiscordServerDataLoading,
  } = useDiscordServerData(
    platforms?.[0]?.type === "DISCORD" ? platforms[0].platformId : null
  )

  const form = useForm<CreateVotingForm>({
    initialValues: {
      platform: "WEB",
      platformId: "",
      channelId: "",
      requirementId: 0,
      question: "",
      pollDuration: [
        currentDate,
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() + 7
        ),
      ],
      options: formList<{ label: string; emoji: string }>([
        { label: "", emoji: "" },
      ]),
    },
    validate: {
      platform: (value) => (!value ? "This field is required" : null),
      platformId: (value) => (!value ? "This field is required" : null),
      channelId: (value) =>
        platforms?.[0]?.type === "DISCORD" && !value
          ? "This field is required"
          : null,
      requirementId: (value) => (!value ? "This field is required" : null),
      question: (value) => (!value ? "This field is required" : null),
      pollDuration: ([value1, value2]) =>
        !value1 || !value2 ? "This field is required" : null,
    },
  })

  const submitButtonDisabled = (): boolean =>
    (form?.values?.platform === "DISCORD" && !form?.values?.channelId) ||
    !form?.values?.requirementId ||
    !form?.values?.pollDuration?.every((value) => !!value) ||
    form?.values?.options?.length < 2 ||
    !form?.values?.options?.every((option) => !!option.label && !!option.emoji)

  const pickableRequirements = useMemo(
    () =>
      roles
        ?.map((role) => role.requirements)
        ?.reduce((reqs1, reqs2) => [...reqs1, ...reqs2], [])
        ?.filter((role) => !!role)
        ?.filter((req) => req.type === "ERC20") ?? [],
    [roles]
  )

  useEffect(() => {
    if (!platforms?.length) return
    form.setFieldValue("platform", platforms?.[0]?.type)
    form.setFieldValue("platformId", platforms?.[0]?.platformId)
  }, [platforms])

  const { data: emojis, isValidating: emojisValidating } = useEmojis()

  const { onSubmit, isLoading } = useCreatePoll(() =>
    updateNotification({
      id: "creating-poll",
      color: "teal",
      title: "Success!",
      message: "Successful poll creation",
      icon: <Check />,
      autoClose: 4000,
    })
  )

  return (
    <Container size="xs" py={16}>
      {!account?.address && !isAccountLoading ? (
        <Alert title="Please connect your wallet" color="red">
          Please connect your wallet in order to continue.
        </Alert>
      ) : isValidating || isAccountLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Loader />
        </Box>
      ) : error || !name ? (
        <Alert title="Uh-oh!" color="red">
          Could not fetch guild.
        </Alert>
      ) : !admins?.find(
          (admin) => admin.address.toLowerCase() === account?.address?.toLowerCase()
        ) ? (
        <Alert title="Uh-oh!" color="red">
          Seems like this isn't your guild.
        </Alert>
      ) : (
        <>
          <Title order={2} mb={24} align="center">{`${name} - create poll`}</Title>
          <Card
            sx={(theme) => ({
              backgroundColor: theme.colors.dark[7],
            })}
            withBorder
          >
            <form onSubmit={form.onSubmit(onSubmit)}>
              <Grid columns={2} gutter="sm">
                <Grid.Col span={1}>
                  <Select
                    {...form.getInputProps("platform")}
                    required
                    label="Pick a platform"
                    disabled
                    data={
                      platforms?.map((platform) => ({
                        label: platformTypeNames[platform.type],
                        value: platform.type,
                      })) ?? []
                    }
                    styles={(theme) => ({
                      dropdown: {
                        borderWidth: 1,
                        borderColor: theme.colors.dark[7],
                      },
                    })}
                  />
                </Grid.Col>

                <Grid.Col span={1}>
                  <Select
                    {...form.getInputProps("platformId")}
                    required
                    label="Pick a server"
                    disabled
                    data={
                      platforms?.map((platform) => ({
                        label: platform.platformName,
                        value: platform.platformId,
                      })) ?? []
                    }
                    styles={(theme) => ({
                      dropdown: {
                        borderWidth: 1,
                        borderColor: theme.colors.dark[7],
                      },
                    })}
                  />
                </Grid.Col>

                <Grid.Col span={1}>
                  <Select
                    {...form.getInputProps("channelId")}
                    label="Pick a channel"
                    placeholder="Pick one"
                    required={platforms?.[0]?.type === "DISCORD"}
                    disabled={
                      platforms?.[0]?.type !== "DISCORD" ||
                      isDiscordServerDataLoading
                    }
                    data={
                      channels?.map((channel) => ({
                        label: channel.name,
                        value: channel.id,
                      })) ?? []
                    }
                  />
                </Grid.Col>

                <Grid.Col span={1}>
                  <Select
                    {...form.getInputProps("requirementId")}
                    required
                    label="Pick a requirement"
                    disabled={!pickableRequirements?.length || isValidating}
                    placeholder={
                      !pickableRequirements?.length
                        ? "No ERC20 requirements"
                        : "Select one"
                    }
                    data={
                      pickableRequirements?.map((req) => ({
                        label: req.symbol,
                        description: `on ${req.chain}`,
                        value: req.id,
                      })) ?? []
                    }
                    itemComponent={SelectItemWithDescription}
                    styles={(theme) => ({
                      dropdown: {
                        borderWidth: 1,
                        borderColor: theme.colors.dark[7],
                      },
                    })}
                  />
                </Grid.Col>

                <Grid.Col span={2}>
                  <DateRangePicker
                    {...form.getInputProps("pollDuration")}
                    label="Poll duration"
                    placeholder="Pick date"
                    required
                  />
                </Grid.Col>

                <Grid.Col span={2}>
                  <Textarea
                    {...form.getInputProps("question")}
                    label="Question"
                    required
                  />
                </Grid.Col>

                <Grid.Col span={2} py="sm">
                  <Stack spacing="sm">
                    <Text size="sm" weight={500}>
                      Possible answers
                    </Text>
                    {form.values.options.map((_, index) => (
                      <Box
                        key={index}
                        sx={(theme) => ({
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr auto",
                          gap: theme.spacing.sm,
                        })}
                      >
                        <TextInput
                          {...form.getListInputProps(
                            "options",
                            index,
                            "label" as never
                          )}
                          placeholder="Answer label"
                          required
                        />
                        <Select
                          {...form.getListInputProps(
                            "options",
                            index,
                            "emoji" as never
                          )}
                          placeholder="Select emoji"
                          required
                          disabled={emojisValidating}
                          searchable
                          nothingFound="No options"
                          data={
                            emojis?.map((emoji) => ({
                              label: `${emoji.character} ${emoji.name}`,
                              value: emoji.character,
                              group: emoji.group,
                            })) ?? []
                          }
                          styles={(theme) => ({
                            dropdown: {
                              borderWidth: 1,
                              borderColor: theme.colors.dark[7],
                            },
                          })}
                        />
                        <ActionIcon
                          variant="hover"
                          color="red"
                          sx={{ width: 36, height: 36 }}
                          disabled={form.values.options?.length === 1}
                          onClick={() => form.removeListItem("options", index)}
                        >
                          <Trash size={16} />
                        </ActionIcon>
                      </Box>
                    ))}

                    <Button
                      variant="subtle"
                      color="gray"
                      leftIcon={<Plus />}
                      onClick={() =>
                        form.addListItem("options", {
                          label: "",
                          emoji: "",
                        } as never)
                      }
                    >
                      Add more
                    </Button>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={2}>
                  <Button
                    type="submit"
                    leftIcon={<Rocket />}
                    loading={isLoading}
                    disabled={submitButtonDisabled() || isLoading}
                    sx={{ width: "100%" }}
                  >
                    Create poll!
                  </Button>
                </Grid.Col>
              </Grid>
            </form>
          </Card>
        </>
      )}
    </Container>
  )
}

export default Guild
