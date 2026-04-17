// Local
import { AccordionItemProps } from 'components/authorable/shared/lists/AccordionItem';
import { createComponentMockData } from 'lib/testing/rendering-mock';

const defaultData: AccordionItemProps = createComponentMockData<AccordionItemProps>(
  'AccordionItem',
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
    heading: { value: 'Financial Solutions' },
  },
  {
    DynamicPlaceholderId: '11',
    FieldNames: 'Default',
  }
);

// Add proper uid to the rendering object
defaultData.rendering.uid = 'accordion-item-1';

export const accordionItem2: AccordionItemProps = createComponentMockData<AccordionItemProps>(
  'AccordionItem',
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
    heading: { value: 'Expert Guidance' },
  },
  {
    DynamicPlaceholderId: '12',
    FieldNames: 'Default',
  }
);

// Add proper uid to the rendering object
accordionItem2.rendering.uid = 'accordion-item-2';

export const accordionItem3: AccordionItemProps = createComponentMockData<AccordionItemProps>(
  'AccordionItem',
  {
    content: {
      value:
        '<p><img src="https://dummyimage.com/600x400/cfcdc8/2f2d2e&text=300+x+200" alt="dummyimage" height="200" width="300" /></p>' +
        '<h3>Why Choose Horizontal Financial Services?</h3>' +
        "<p>We prioritize your success and offer tailored strategies that align with your financial aspirations. Here's what makes us stand out:</p>" +
        '<ul>' +
        '<li>Decades of industry experience</li>' +
        '<li>Proven track record of success</li>' +
        '<li>Commitment to customer satisfaction</li>' +
        '</ul>',
    },
    heading: { value: 'Why Choose Us?' },
  },
  {
    DynamicPlaceholderId: '13',
    FieldNames: 'Default',
  }
);

// Add proper uid to the rendering object
accordionItem3.rendering.uid = 'accordion-item-3';

export const accordionItem4: AccordionItemProps = createComponentMockData<AccordionItemProps>(
  'AccordionItem',
  {
    content: {
      value:
        '<p><img src="https://dummyimage.com/600x400/cfcdc8/2f2d2e&text=300+x+200" alt="dummyimage" height="200" width="300" /></p><h3>Feature that is amazing</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ul><li>Benefit of Feature</li><li>Benefit of Feature</li><li>Benefit of Feature</li></ul>',
    },
    heading: { value: 'Accordion 4' },
  },
  {
    DynamicPlaceholderId: '14',
    FieldNames: 'Default',
  }
);

// Add proper uid to the rendering object
accordionItem4.rendering.uid = 'accordion-item-4';

export const accordionItem5: AccordionItemProps = createComponentMockData<AccordionItemProps>(
  'AccordionItem',
  {
    content: {
      value:
        '<p><img src="https://dummyimage.com/600x400/cfcdc8/2f2d2e&text=300+x+200" alt="dummyimage" height="200" width="300" /></p><h3>Feature that is amazing</h3><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><ul><li>Benefit of Feature</li><li>Benefit of Feature</li><li>Benefit of Feature</li></ul>',
    },
    heading: { value: 'Accordion 5' },
  },
  {
    DynamicPlaceholderId: '15',
    FieldNames: 'Default',
  }
);

// Add proper uid to the rendering object
accordionItem5.rendering.uid = 'accordion-item-5';

export default defaultData;
