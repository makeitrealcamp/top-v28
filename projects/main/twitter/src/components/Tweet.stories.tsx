import Tweet from './Tweet';

export default {
  title: 'Components/Tweet',
  component: Tweet,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Hello World' },
        type: { summary: 'string' },
      },
    },
    createdAt: {
      control: 'date',
      table: {
        defaultValue: { summary: new Date().toISOString() },
        type: { summary: 'string' },
      },
    },
    name: {
      control: 'text',
      table: {
        defaultValue: { summary: 'Gustavo Morales' },
        type: { summary: 'string' },
      },
    },
    username: {
      control: 'text',
      table: {
        defaultValue: { summary: 'gmoralesc' },
        type: { summary: 'string' },
      },
    },
    photo: {
      control: 'text',
      table: {
        defaultValue: { summary: 'https://placehold.co/40x40' },
        type: { summary: 'string' },
      },
    },
  },
};

export const Normal = {};
