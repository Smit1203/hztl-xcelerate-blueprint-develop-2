// Global

// Local
import { JumpNavContainerProps } from 'components/authorable/shared/layout/JumpNavContainer';
import {
  default as JumpNavItem1,
  jumpNavItem2 as JumpNavItem2,
} from 'stories/components/authorable/shared/layout/JumpNavSection/JumpNavSection.mock-data';
import { JumpNavSectionProps } from 'components/authorable/shared/layout/JumpNavSection';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData: JumpNavContainerProps = createComponentMockData<JumpNavContainerProps>(
  'JumpNavContainer',
  {},
  {
    DynamicPlaceholderId: '1',
  },
  {
    'jump-nav-container-1': [toRendering(JumpNavItem1), toRendering(JumpNavItem2)],
  },
  '2722281e-adc4-4a7d-842b-f5b5f227b452'
);

export default defaultData;

function toRendering(item: JumpNavSectionProps) {
  return {
    ...item.rendering,
    fields: item.fields,
    params: item.params,
  };
}
