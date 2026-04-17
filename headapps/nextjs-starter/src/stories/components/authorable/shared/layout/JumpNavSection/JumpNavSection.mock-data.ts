/* eslint-disable  @typescript-eslint/no-explicit-any */
// Local
import { JumpNavSectionProps } from 'components/authorable/shared/layout/JumpNavSection';
import { createComponentMockData } from 'lib/testing/rendering-mock';
import {
  default as RTEText,
  tableData as RTE,
} from 'stories/components/authorable/shared/content/RTE/RTE.mock-data';

const defaultData: JumpNavSectionProps = createComponentMockData<JumpNavSectionProps>(
  'JumpNavSection',
  {
    heading: {
      value: 'This is Jump nav 01',
    },
    jumpNavHeading: {
      value: 'Jump nav 1',
    },
  },
  {
    DynamicPlaceholderId: '2',
  },
  {
    'custom-section-content': [toRendering(RTEText)],
  },
  '779c4409-0438-4b7a-8a7b-c3f043a27d6b'
);

export const jumpNavItem2: JumpNavSectionProps = createComponentMockData<JumpNavSectionProps>(
  'JumpNavSection',
  {
    heading: {
      value: 'This is Jump nav 02',
    },
    jumpNavHeading: {
      value: 'Jump nav 2',
    },
  },
  {
    DynamicPlaceholderId: '3',
  },
  {
    'custom-section-content': [toRendering(RTE)],
  },
  'ba4857bd-c9b5-4b6e-8b1a-353e42b728bc'
);

export default defaultData;

function toRendering(item: any) {
  return {
    ...item.rendering,
    fields: item.fields,
    params: item.params,
  };
}
