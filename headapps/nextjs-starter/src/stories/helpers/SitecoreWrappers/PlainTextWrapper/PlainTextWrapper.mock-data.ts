// Global
import { Text } from '@sitecore-content-sdk/nextjs';

type TextProps = React.ComponentProps<typeof Text>;

const defaultData: TextProps = {
  field: {
    value: 'Hello World.  This should render <strong>raw html</strong>',
  },
};

export default defaultData;
