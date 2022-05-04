import { Stack, Text } from "@mantine/core"
import { forwardRef } from "react"

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string
  description: string
}

const SelectItemWithDescription = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Stack spacing={1}>
        <Text size="sm">{label}</Text>
        <Text size="xs" color="dimmed">
          {description}
        </Text>
      </Stack>
    </div>
  )
)

export default SelectItemWithDescription
