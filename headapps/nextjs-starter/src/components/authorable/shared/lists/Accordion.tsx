// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';
// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import { ComponentProps } from 'lib/component-props';
import { CheckboxParamType } from 'lib/component-props/rendering-param-types';
import { AccordionContextProvider, useAccordionContext } from 'helpers/Context/AccordionContext';
import { findComponent } from 'lib/utils/object-utils';
import { AccordionItemProps } from './AccordionItem';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import useDictionary from 'lib/hooks/useDictionary';
import { getTestProps } from 'lib/testing/utils';

export type AccordionProps = ComponentProps & {
  params: {
    singleOpenPanel?: CheckboxParamType;
    scrollToOpenPanel?: CheckboxParamType;
    openByDefault?: CheckboxParamType;
  };
};

// Expand/Collapse All Buttons Component
const AccordionControls = () => {
  const { openPanels, panels, expandAll, collapseAll } = useAccordionContext();
  const { getDictionaryValue } = useDictionary();

  const allPanelIds = panels.map((panel) => panel.uid ?? '').filter(Boolean);
  const allOpen =
    allPanelIds.length > 0 &&
    allPanelIds.every((id: string) => openPanels.some((panel) => panel.uid === id));
  const someOpen = openPanels.length > 0;

  const {
    expandCollapseBtn,
    expandCollapseBtnActive,
    expandCollapseBtnInactive,
    divider,
    controlsContainer,
  } = TAILWIND_VARIANTS();

  return (
    <div className={controlsContainer()}>
      <button
        type="button"
        onClick={expandAll}
        disabled={allOpen}
        className={
          expandCollapseBtn() +
          ' ' +
          (allOpen ? expandCollapseBtnInactive() : expandCollapseBtnActive())
        }
        aria-label="Expand all accordion items"
      >
        {getDictionaryValue('AccordionExpandAll') || 'Expand All'}
      </button>
      <span className={divider()} />
      <button
        type="button"
        onClick={collapseAll}
        disabled={!someOpen}
        className={
          expandCollapseBtn() +
          ' ' +
          (!someOpen ? expandCollapseBtnInactive() : expandCollapseBtnActive())
        }
        aria-label="Collapse all accordion items"
      >
        {getDictionaryValue('AccordionCollapseAll') || 'Collapse All'}
      </button>
    </div>
  );
};

const Accordion = (props: AccordionProps): JSX.Element => {
  const { DynamicPlaceholderId, RenderingIdentifier } = props?.params || {};

  const phKey = `accordion-${DynamicPlaceholderId}`;

  /*
   * Rendering
   */

  const { base, container, controls } = TAILWIND_VARIANTS();

  const accordionItems = findComponent<AccordionItemProps['rendering']>(
    props.rendering,
    'AccordionItem'
  );

  const singlePanelOpen = props.params.singleOpenPanel === '1';

  const scrollToOpenPanel = props.params.scrollToOpenPanel === '1';

  const defaultOpenPanels: AccordionItemProps['rendering'][] = [];

  if (props.params.openByDefault === '1') {
    if (singlePanelOpen) {
      defaultOpenPanels.push(accordionItems[0]);
    } else {
      defaultOpenPanels.push(...accordionItems);
    }
  }

  return (
    <section
      className={base()}
      data-component="authorable/shared/lists/accordion"
      id={RenderingIdentifier}
      {...getTestProps(`component-accordion-${props?.rendering?.uid}`)}
    >
      <AccordionContextProvider
        panels={accordionItems}
        singleOpenPanel={singlePanelOpen}
        scrollToOpenPanel={scrollToOpenPanel}
        defaultOpenPanels={defaultOpenPanels}
      >
        <div className={container()}>
          <div className={controls()}>{!singlePanelOpen && <AccordionControls />}</div>
          <PlaceholderWrapper
            name={phKey}
            rendering={props.rendering}
            {...getTestProps(`accordion-ph`)}
          />
        </div>
      </AccordionContextProvider>
    </section>
  );
};

export const Default = withStandardComponentWrapper(Accordion, false);

const TAILWIND_VARIANTS = tv({
  slots: {
    base: ['border-solid'],
    container: ['flex', 'flex-col', 'gap-spacing-spacing-8'],
    controls: ['relative', 'flex', 'justify-end', 'absolute', 'top-0', 'right-0', 'z-10'],
    expandCollapseBtn: [
      'font-typography-body-font-family',
      'text-typography-body-medium-font-size',
      'leading-typography-line-height-body-medium',
      'px-2',
      'py-0',
      'border-none',
      'outline-none',
      'focus:underline',
      'transition-colors',
      'cursor-pointer',
      'hover:underline',
      'focus:ring',
      'focus:ring-offset-1',
      'focus:ring-color-border-border-focus',
      'rounded-component-accordion-item-border-radius',
    ],
    expandCollapseBtnActive: ['text-component-accordion-toggle-active', 'font-bold'],
    expandCollapseBtnInactive: [
      'text-component-accordion-toggle',
      'font-normal',
      'disabled:cursor-not-allowed',
    ],
    divider: [
      'border-l',
      'border-component-accordion-divider',
      'mx-2',
      'h-5',
      'inline-block',
      'align-middle',
    ],
    controlsContainer: ['flex', 'items-center', 'gap-0'],
  },
});
