import { Text } from '@mantine/core';

export default function UserDashboard({ userData }) {
    const { username, firstName, lastName, email } = userData
    return (
        <>
            <Text size="xl" weight={700}>{firstName || "Placeholder" } {lastName || "Placeholder"}</Text>
            <Text size="xs" pb="md">{username}</Text>
            <Text size="md">📧 {email}</Text>

        </>
    )
}