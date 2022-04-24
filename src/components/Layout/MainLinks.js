import React from 'react';
import {
  GitPullRequest, AlertCircle,
} from 'tabler-icons-react';
import {
  ThemeIcon, UnstyledButton, Group, Text,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

const data = [
  {
    icon: <GitPullRequest size={16} />, color: 'blue', label: 'Registry', path: '/',
  },
  {
    icon: <AlertCircle size={16} />, color: 'teal', label: 'Schedules', path: '/schedule',
  },
];

export default function MainLinks() {
  // eslint-disable-next-line react/jsx-props-no-spreading
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}

function MainLink({
  // eslint-disable-next-line react/prop-types
  icon, color, label, path,
}) {
  const navigate = useNavigate();

  return (
    <UnstyledButton
      onClick={() => navigate(path)}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  );
}
