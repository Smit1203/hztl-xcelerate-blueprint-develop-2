// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';
// Local
import { ComponentProps } from 'lib/component-props';
import { withStandardComponentWrapper } from 'helpers/HOC';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import useIsEditing from 'lib/hooks/useIsEditing';
import { EditingHelpText } from 'helpers/Editing/EditingHelpText';
import useDictionary from 'lib/hooks/useDictionary';
import { getTestProps } from 'lib/testing/utils';

export type StatsProps = ComponentProps;

type ColCount = '1' | '2' | '3' | '4';

export const getColCount = (count: number): ColCount => {
  if (count === 1) return '1';
  if (count === 2) return '2';
  if (count === 3) return '3';
  return '4';
};

const Stats = (props: StatsProps): JSX.Element => {
  const { params } = props;
  const { DynamicPlaceholderId, RenderingIdentifier } = params || {};
  const phKey = `stats-${DynamicPlaceholderId}`;
  const { wrapper } = TAILWIND_VARIANTS();
  const isEditing = useIsEditing();
  const { getDictionaryValue } = useDictionary();

  // Show placeholder in editing mode if no title is provided
  if (isEditing) {
    return (
      <>
        <EditingHelpText priority="warning">
          {getDictionaryValue('StatsAddMoreItemsHelpText') ||
            'Add more StatsItems above or below to display additional stats in this row.'}
        </EditingHelpText>
        <div
          className={wrapper()}
          data-component="authorable/shared/lists/stats"
          id={RenderingIdentifier}
        >
          <PlaceholderWrapper
            name={phKey}
            rendering={props.rendering}
            render={(components) => {
              const colCount = getColCount(components.length);
              const { statsGrid } = TAILWIND_VARIANTS({ colCount });
              return (
                <ul className={statsGrid()}>
                  {components.map((comp, index) => (
                    <li key={index}>{comp}</li>
                  ))}
                </ul>
              );
            }}
          />
        </div>
      </>
    );
  }

  return (
    <div
      className={wrapper()}
      data-component="authorable/shared/lists/stats"
      id={RenderingIdentifier}
      {...getTestProps(`component-stats-${props?.rendering?.uid}`)}
    >
      <PlaceholderWrapper
        name={phKey}
        rendering={props.rendering}
        render={(components) => {
          const colCount = getColCount(components.length);
          const { statsGrid } = TAILWIND_VARIANTS({ colCount });
          return (
            <ul className={statsGrid()}>
              {components.map((comp, index) => (
                <li key={index}>{comp}</li>
              ))}
            </ul>
          );
        }}
        {...getTestProps(`stats-ph`)}
      />
    </div>
  );
};

const TAILWIND_VARIANTS = tv({
  slots: {
    wrapper: ['w-full'],
    title: [
      'text-typography-header-xlarge-font-size',
      'text-typography-font-family-header',
      'font-bold',
      'text-color-text-text',
      'mb-spacing-spacing-16',
      'md:mb-spacing-spacing-8',
      'text-center',
    ],
    statsGrid: ['grid', 'gap-layout-base-gutter'],
  },
  variants: {
    colCount: {
      '1': { statsGrid: ['grid-cols-1'] },
      '2': { statsGrid: ['grid-cols-1', 'md:grid-cols-2'] },
      '3': { statsGrid: ['grid-cols-1', 'md:grid-cols-3'] },
      '4': { statsGrid: ['grid-cols-1', 'md:grid-cols-4'] },
    },
  },
  defaultVariants: {
    colCount: '1',
  },
});

export const Default = withStandardComponentWrapper(Stats, false);
