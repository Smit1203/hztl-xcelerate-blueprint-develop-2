// Global

// Local
import { AccordionProps } from 'components/authorable/shared/lists/Accordion';
import {
  default as AccordionItem1,
  accordionItem2 as AccordionItem2,
  accordionItem3 as AccordionItem3,
} from 'stories/components/authorable/shared/lists/AccordionItem/AccordionItem.mock-data';
import { AccordionItemProps } from 'components/authorable/shared/lists/AccordionItem';

const defaultData: AccordionProps = {
  params: {
    DynamicPlaceholderId: '1',
    RenderingIdentifier: 'accordion-1',
    singleOpenPanel: '0',
    scrollToOpenPanel: '1',
    openByDefault: '0',
  },
  rendering: {
    componentName: 'Accordion',
    dataSource: 'Storybook',
    uid: 'accordion-1',
    placeholders: {
      'accordion-1': [
        toRendering(AccordionItem1),
        toRendering(AccordionItem2),
        toRendering(AccordionItem3),
      ],
    },
  },
};

export const singlePanelOpenData: AccordionProps = {
  params: {
    DynamicPlaceholderId: '1',
    RenderingIdentifier: 'accordion-2',
    singleOpenPanel: '1',
    scrollToOpenPanel: '1',
    openByDefault: '0',
  },
  rendering: {
    componentName: 'Accordion',
    dataSource: 'Storybook',
    uid: 'accordion-2',
    placeholders: {
      'accordion-1': [
        toRendering(AccordionItem1),
        toRendering(AccordionItem2),
        toRendering(AccordionItem3),
      ],
    },
  },
};

export const scrollToOpenPanelData: AccordionProps = {
  params: {
    DynamicPlaceholderId: '1',
    RenderingIdentifier: 'accordion-3',
    singleOpenPanel: '0',
    scrollToOpenPanel: '1',
    openByDefault: '0',
  },
  rendering: {
    componentName: 'Accordion',
    dataSource: 'Storybook',
    uid: 'accordion-3',
    placeholders: {
      'accordion-1': [
        toRendering(AccordionItem1),
        toRendering(AccordionItem2),
        toRendering(AccordionItem3),
      ],
    },
  },
};

export const openByDefaultData: AccordionProps = {
  params: {
    DynamicPlaceholderId: '1',
    RenderingIdentifier: 'accordion-4',
    singleOpenPanel: '0',
    scrollToOpenPanel: '1',
    openByDefault: '1',
  },
  rendering: {
    componentName: 'Accordion',
    dataSource: 'Storybook',
    uid: 'accordion-4',
    placeholders: {
      'accordion-1': [
        toRendering(AccordionItem1),
        toRendering(AccordionItem2),
        toRendering(AccordionItem3),
      ],
    },
  },
};

export default defaultData;

function toRendering(item: AccordionItemProps) {
  return {
    ...item.rendering,
    fields: item.fields,
    params: item.params,
  };
}
