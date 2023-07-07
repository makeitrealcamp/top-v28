/** @type { import('@storybook/react').Preview } */

import 'bootstrap-icons/font/bootstrap-icons.css';
import '../src/theme/custom.scss';
import '../src/theme/index.css';

import theme from '../src/theme';
import { ThemeProvider } from '@emotion/react';

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
