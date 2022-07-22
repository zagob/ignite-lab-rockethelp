import { ReactNode } from "react";
import { VStack, HStack, Text, useTheme, Box } from "native-base";
import { IconProps } from "phosphor-react-native";

type CardDetailsProps = {
  title: string;
  description?: string;
  footer?: string;
  icon: React.ElementType<IconProps>;
  children?: ReactNode;
};

export function CardDetails({
  title,
  description,
  footer,
  icon: Icon,
  children,
}: CardDetailsProps) {
  const { colors } = useTheme();
  return (
    <VStack bg="gray.600" p={5} mt={5} rounded="sm">
      <HStack alignItems="center" mb={4}>
        <Icon color={colors.primary[700]} />
        <Text ml={2} color="gray.300" fontSize="sm" textTransform="uppercase" />
      </HStack>
      {!!description && (
        <Text color="gray.100" fontSize="md">
          {description}
        </Text>
      )}
      {children}
      {!!footer && (
        <Box borderTopColor="gray.400" borderTopWidth={1} mt={3}>
          <Text mt={3} color="gray.300" fontSize="sm">
            {footer}
          </Text>
        </Box>
      )}
    </VStack>
  );
}
