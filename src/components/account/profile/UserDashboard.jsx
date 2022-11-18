import { Text, Avatar, Title } from "@mantine/core";
import { baseServerUrl } from "../../../config/paths";

export default function UserDashboard({ userData }) {
  const { email, firstName, lastName, avatarUrl, isAdmin } = userData;
  //console.log(userData);
  return (
    <>
      <Avatar
        src={`${baseServerUrl}/${avatarUrl}`}
        alt="my avatar image"
        size={150}
        radius="xl"
        mb="sm"
      />
      <Title order={2}>
        {firstName || "Placeholder"} {lastName || "Placeholder"}{" "}
        {isAdmin && (
          <Text
            inherit
            span
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          >
            Admin
          </Text>
        )}
      </Title>
      <Text size="md">📧 {email}</Text>
    </>
  );
}
