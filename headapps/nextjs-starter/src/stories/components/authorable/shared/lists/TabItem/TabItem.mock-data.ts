// Local
import { TabItemProps } from 'components/authorable/shared/lists/TabItem';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData: TabItemProps = createComponentMockData<TabItemProps>(
  'TabItem',
  {
    content: {
      value:
        '<p><img src="https://dummyimage.com/600x400/cfcdc8/2f2d2e&text=300+x+200" alt="dummyimage" height="200" width="300" /></p>' +
        '<h3>Comprehensive Financial Solutions</h3>' +
        '<p>At Horizontal Financial Services, we provide tailored solutions to meet your unique financial needs. Whether you are planning investments, managing wealth, or securing your retirement, we are here to help.</p>' +
        '<ul>' +
        '<li>Personalized investment strategies</li>' +
        '<li>Expert wealth management</li>' +
        '<li>Secure retirement planning</li>' +
        '</ul>',
    },
    title: { value: 'Tab 1' },
  },
  {
    DynamicPlaceholderId: '11',
    FieldNames: 'Default',
    ignoreAutoClose: '0',
    openOnLoad: '0',
  },
  {},
  '779c4409-0438-4b7a-8a7b-c3f043a27d6b'
);

export const tabItem2: TabItemProps = createComponentMockData<TabItemProps>(
  'TabItem',
  {
    content: {
      value:
        '<p><img src="https://dummyimage.com/600x400/cfcdc8/2f2d2e&text=300+x+200" alt="dummyimage" height="200" width="300" /></p>' +
        '<h3>Expert Financial Guidance</h3>' +
        '<p>Our team of seasoned financial experts is dedicated to helping you navigate the complexities of your financial journey with clarity and confidence.</p>' +
        '<ul>' +
        '<li>Professional consultation sessions</li>' +
        '<li>Goal-oriented financial advice</li>' +
        '<li>Transparent communication</li>' +
        '</ul>',
    },
    title: { value: 'Tab 2' },
  },
  {
    DynamicPlaceholderId: '12',
    FieldNames: 'Default',
    ignoreAutoClose: '0',
    openOnLoad: '0',
  },
  {},
  '779c4409-0438-4b7a-8a7b-c3f043a27d6c'
);

export const tabItem3: TabItemProps = createComponentMockData<TabItemProps>(
  'TabItem',
  {
    content: {
      value:
        '<p><img src="https://dummyimage.com/600x400/cfcdc8/2f2d2e&text=300+x+200" alt="dummyimage" height="200" width="300" /></p>' +
        '<h3>Why Choose Horizontal Financial Services?</h3>' +
        '<p>We prioritize your success and offer tailored strategies that align with your financial aspirations. Here’s what makes us stand out:</p>' +
        '<ul>' +
        '<li>Decades of industry experience</li>' +
        '<li>Proven track record of success</li>' +
        '<li>Commitment to customer satisfaction</li>' +
        '</ul>',
    },
    title: { value: 'Tab 3' },
  },
  {
    DynamicPlaceholderId: '13',
    FieldNames: 'Default',
    ignoreAutoClose: '0',
    openOnLoad: '0',
  },
  {},
  '779c4409-0438-4b7a-8a7b-c3f043a27d6d'
);

export const tabItem4: TabItemProps = createComponentMockData<TabItemProps>(
  'TabItem',
  {
    content: {
      value:
        '<p><img src="https://dummyimage.com/600x400/cfcdc8/2f2d2e&text=300+x+200" alt="dummyimage" height="200" width="300" /></p><h3>Feature that is amazing</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ul><li>Benefit of Feature</li><li>Benefit of Feature</li><li>Benefit of Feature</li></ul>',
    },
    title: { value: 'Tab 4' },
  },
  {
    DynamicPlaceholderId: '14',
    FieldNames: 'Default',
    ignoreAutoClose: '1',
    openOnLoad: '0',
  },
  {},
  '779c4409-0438-4b7a-8a7b-c3f043a27d6e'
);

export const tabItem5: TabItemProps = createComponentMockData<TabItemProps>(
  'TabItem',
  {
    content: {
      value:
        '<p><img src="https://dummyimage.com/600x400/cfcdc8/2f2d2e&text=300+x+200" alt="dummyimage" height="200" width="300" /></p><h3>Feature that is amazing</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ul><li>Benefit of Feature</li><li>Benefit of Feature</li><li>Benefit of Feature</li></ul>',
    },
    title: { value: 'Tab 5' },
  },
  {
    DynamicPlaceholderId: '14',
    FieldNames: 'Default',
    ignoreAutoClose: '0',
    openOnLoad: '1',
  },
  {},
  '779c4409-0438-4b7a-8a7b-c3f043a27d6f'
);

export default defaultData;
