// Global
import React, { JSX } from 'react';
import { tv } from 'tailwind-variants';
import CountUp from 'react-countup';

// Local
import { Lists } from '.generated/Lists/Stats.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import PlainTextWrapper from 'helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper';
import { getTestProps } from 'lib/testing/utils';

export type StatsItemProps = Lists.Stats.StatsItem_Component;

const StatsItem = (props: StatsItemProps): JSX.Element => {
  const { fields } = props;
  const { uid } = props?.rendering || {};
  const { container, numberWrapper, number, quantifier, label, eyebrow } = TAILWIND_VARIANTS();

  const statsId = `stats-${uid}`;
  const numberValue = fields?.number?.value ? fields.number.value : 0;
  const hasDecimals = numberValue % 1 !== 0;

  return (
    <div
      className={container()}
      data-component="authorable/shared/lists/statsitem"
      key={statsId}
      {...getTestProps(`stats-item-${statsId}`)}
    >
      <div className={eyebrow()}>
        <PlainTextWrapper field={fields?.eyebrow} {...getTestProps(`eyebrow`)} />
      </div>
      <div className={numberWrapper()}>
        <span className={number()} {...getTestProps(`number`)}>
          <CountUp
            end={numberValue}
            duration={2.5}
            enableScrollSpy
            scrollSpyOnce
            decimals={hasDecimals ? 2 : 0}
          />
        </span>
        <span className={quantifier()} {...getTestProps(`quantifier`)}>
          {fields?.quantifier?.value || '%'}
        </span>
      </div>
      <div className={label()}>
        <PlainTextWrapper field={fields?.label} {...getTestProps(`label`)} />
      </div>
    </div>
  );
};

const TAILWIND_VARIANTS = tv({
  slots: {
    container: [
      'flex',
      'flex-col',
      'p-spacing-spacing-16',
      'rounded-general-border-radius-stat',
      'border-border-width-width-025',
      'border-component-stat-border',
      'bg-component-stat-surface',
      'h-full',
    ],
    eyebrow: [
      'w-full',
      'text-component-stat-label',
      'text-typography-body-medium-font-size',
      'font-typography-body-font-family',
      'leading-normal',
      'font-normal',
    ],
    numberWrapper: ['w-full', 'text-component-stat-number'],
    number: [
      'font-typography-header-font-family',
      'text-typography-header-xxlarge-font-size',
      'text-typography-font-family-header',
      'leading-tight',
      'font-bold',
      'text-component-stat-number',
    ],
    quantifier: [
      'text-typography-header-xxlarge-font-size',
      'text-typography-font-family-header',
      'leading-tight',
      'font-bold',
      'text-component-stat-number',
    ],
    label: [
      'w-full',
      'text-component-stat-label',
      'text-typography-body-large-font-size',
      'font-typography-body-font-family',
      'leading-normal',
      'font-normal',
    ],
  },
});

const StatsItemWrapped = withStandardComponentWrapper(StatsItem);
export { StatsItemWrapped as StatsItem };
export default StatsItemWrapped;
