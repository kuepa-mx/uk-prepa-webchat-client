import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";

import { containerStyles, titleStyles } from "./styles/Header.styles";

export const Header = ({ customTitle }: { customTitle?: string }) => {
  return (
    <Box className="dark:bg-clightgray" as="header" {...containerStyles}>
      <Text as="h2" {...titleStyles}>
        {customTitle || "Chat en vivo"}
      </Text>
    </Box>
  );
};
