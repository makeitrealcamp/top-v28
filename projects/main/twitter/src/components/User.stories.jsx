import User from './User';

export default {
  title: 'Components/User',
  component: User,
  tags: ['autodocs'],
  argTypes: {
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

export const withData = {
  args: {
    name: 'Gustavo Morales',
    username: 'gmoralesc',
    photo: 'https://placehold.co/40x40',
  },
};

export const withLongName = {
  args: {
    name: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio magnam ducimus odio inventore voluptates, asperiores ab consequatur praesentium! Corrupti, consequuntur fuga. Sequi sit sunt ducimus iste iure veritatis eum tempore.',
    username: 'gmoralesc',
    photo: 'https://placehold.co/40x40',
  },
};
