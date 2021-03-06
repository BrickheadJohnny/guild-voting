import { Group, Image, Text } from "@mantine/core"
import { forwardRef } from "react"

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string
  image: string
  value: string
}

const SelectItemEmoji = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, image, value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        {image?.startsWith("http") ? (
          <Image src={image} alt={label} width={16} height={16} />
        ) : (
          <Text size="sm">{value}</Text>
        )}
        <div>
          <Text
            size="sm"
            sx={{
              maxWidth: "120px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {label}
          </Text>
        </div>
      </Group>
    </div>
  )
)

export default SelectItemEmoji
