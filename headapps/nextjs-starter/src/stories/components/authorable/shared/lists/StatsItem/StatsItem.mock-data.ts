import { createComponentMockData } from 'lib/testing/rendering-mock';

export const StatsItemA = createComponentMockData(
  'StatsItem',
  {
    eyebrow: { value: 'Success Rate' },
    number: { value: '92.45' },
    quantifier: { value: '%' },
    label: {
      value:
        'Due to the stringent credit requirements, many undergraduate students rely on co-signers to qualify for private loans.',
    },
  },
  {
    GridParameters: 'basis-full',
    DynamicPlaceholderId: '14',
    FieldNames: 'Default',
  }
);

export const StatsItemB = createComponentMockData(
  'StatsItem',
  {
    number: { value: '25' },
    quantifier: { value: '+' },
    label: {
      value:
        'Lot of the student applicants were first-time college students, and 41% were over the age of 25',
    },
  },
  {
    GridParameters: 'basis-full',
    DynamicPlaceholderId: '15',
    FieldNames: 'Default',
  }
);

export const StatsItemC = createComponentMockData(
  'StatsItem',
  {
    number: { value: '3' },
    quantifier: { value: 'yrs' },
    label: {
      value: 'Average time to graduation for students in this program.',
    },
  },
  {
    GridParameters: 'basis-full',
    DynamicPlaceholderId: '16',
    FieldNames: 'Default',
  }
);
