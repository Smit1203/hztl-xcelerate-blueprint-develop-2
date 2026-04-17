// Global
import { addons } from '@storybook/manager-api';

// Local
import brandTheme from './BrandTheme';

addons.setConfig({
  theme: brandTheme,
});
