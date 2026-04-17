// Local
import {
  StatsItemA,
  StatsItemB,
  StatsItemC,
} from 'stories/components/authorable/shared/lists/StatsItem/StatsItem.mock-data';
import { createComponentMockData } from 'lib/testing/rendering-mock';
import { StatsItemProps } from 'components/authorable/shared/lists/StatsItem';

// Create mock data for a single Stats component with given items
export const createStatsData = (items: StatsItemProps[]) => {
  return createComponentMockData(
    'Stats',
    {},
    {
      DynamicPlaceholderId: '1',
    },
    {
      'stats-1': items.map((item) => item.rendering),
    }
  );
};

// Create mock data for a Section component containing Stats
export const createSectionData = (statsData: ReturnType<typeof createStatsData>) => {
  return createComponentMockData(
    'Section',
    {
      title: { value: 'Statistics' },
      description: { value: 'Key metrics and achievements' },
    },
    {
      DynamicPlaceholderId: '1',
      alignment: 'Left',
    },
    {
      'section-1': [statsData.rendering],
    }
  );
};

// Default mock data with all three items
const statsData = createStatsData([StatsItemA, StatsItemB, StatsItemC]);
const sectionData = createSectionData(statsData);

const defaultData = {
  ...sectionData,
  items: [StatsItemA, StatsItemB, StatsItemC],
};

export default defaultData;
