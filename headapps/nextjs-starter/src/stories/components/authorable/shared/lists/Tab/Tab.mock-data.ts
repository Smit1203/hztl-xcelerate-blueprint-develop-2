// Global

// Local
import { TabProps } from 'components/authorable/shared/lists/Tab';
import {
  default as TabItem1,
  tabItem2 as TabItem2,
  tabItem3 as TabItem3,
  tabItem4 as TabItem4,
  tabItem5 as TabItem5,
} from 'stories/components/authorable/shared/lists/TabItem/TabItem.mock-data';
import { TabItemProps } from 'components/authorable/shared/lists/TabItem';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData: TabProps = createComponentMockData<TabProps>(
  'Tab',
  {},
  {
    DynamicPlaceholderId: '1',
  },
  {
    'tab-1': [
      toRendering(TabItem1),
      toRendering(TabItem2),
      toRendering(TabItem3),
      toRendering(TabItem4),
      toRendering(TabItem5),
    ],
  },
  '2722281e-adc4-4a7d-842b-f5b5f227b452'
);

export default defaultData;

function toRendering(item: TabItemProps) {
  return {
    ...item.rendering,
    fields: item.fields,
    params: item.params,
  };
}
