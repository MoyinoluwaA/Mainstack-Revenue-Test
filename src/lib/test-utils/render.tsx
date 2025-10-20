import { render as testingLibraryRender } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { MantineTheme } from '../../styles/themes/index';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <MantineProvider theme={MantineTheme} env="test">{children}</MantineProvider>
    ),
  });
}
