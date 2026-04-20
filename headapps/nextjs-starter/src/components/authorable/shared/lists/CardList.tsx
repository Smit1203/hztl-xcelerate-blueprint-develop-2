'use client';

// Global
import React, { createContext, useContext, JSX } from 'react';
import { tv } from 'tailwind-variants';

// Local
import { withStandardComponentWrapper } from 'helpers/HOC';
import { ComponentProps } from 'lib/component-props';
import { parseStyleParams } from 'lib/utils/style-param-utils';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { getTestProps } from 'lib/testing/utils';

type ColCount = '1' | '2' | '3' | '4' | undefined;

// Create context for column count
const CardListContext = createContext<ColCount>('1');

// Hook to use the context
export const useCardListContext = () => useContext(CardListContext);

export type CardListProps = ComponentProps;

const CardList = (props: CardListProps): JSX.Element => {
  const { DynamicPlaceholderId, RenderingIdentifier } = props?.params || {};

  const phKey = `cardlist-${DynamicPlaceholderId}`;
  const styles = parseStyleParams(props.params, ['cards']);
  const colCount = styles?.cards?.cardsPerRow as ColCount;

  /*
   * Rendering
   */

  const { base, card } = TAILWIND_VARIANTS({ colCount });

  return (
    <CardListContext.Provider value={colCount}>
      <section
        data-component="authorable/shared/lists/cardlist"
        id={RenderingIdentifier}
        {...getTestProps(`component-cardlist-${props?.rendering?.uid}`)}
      >
        <PlaceholderWrapper
          name={phKey}
          rendering={props.rendering}
          // Wrap the component in a <ul>.
          // If there are no components it won't render anything on the live page
          // It also ensures that when editing in Page Builder, it will show the help text outside of the <ul>
          render={(components) => (
            <ul className={base()} aria-label="List of cards">
              {components.map((comp, index) => (
                <li
                  className={card()}
                  key={index}
                  role="listitem"
                  {...getTestProps(`card-${index}`)}
                >
                  {comp}
                </li>
              ))}
            </ul>
          )}
        />
      </section>
    </CardListContext.Provider>
  );
};

export const Default = withStandardComponentWrapper(CardList, false);

const TAILWIND_VARIANTS = tv({
  defaultVariants: {
    colCount: '1',
  },
  slots: {
    base: ['gap-6', 'grid', 'grid-cols-none'],
    card: ['flex', 'flex-col'],
  },
  variants: {
    colCount: {
      '1': { base: ['lg:grid-cols-1'] },
      '2': { base: ['lg:grid-cols-2'] },
      '3': { base: ['lg:grid-cols-3'] },
      '4': { base: ['lg:grid-cols-4'] },
    },
  },
});
