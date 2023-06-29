import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';

import theme from '../theme';

export function renderWithTheme(children) {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
}
