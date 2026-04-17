import React, { JSX } from 'react';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { ComponentProps } from 'lib/component-props';
import { getTestProps } from 'lib/testing/utils';

export const Default = (props: ComponentProps): JSX.Element => {
  const { rendering } = props;

  const phKey = `custom-search-main`;

  return (
    <div
      className="w-full flex flex-col"
      {...getTestProps(`component-search-main-${rendering?.uid}`)}
    >
      <PlaceholderWrapper name={phKey} rendering={rendering} />
    </div>
  );
};
