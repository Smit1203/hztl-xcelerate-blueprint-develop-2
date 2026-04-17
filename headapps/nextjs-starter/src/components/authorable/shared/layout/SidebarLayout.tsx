import React, { JSX } from 'react';
import { PlaceholderWrapper } from 'helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper';
import { ComponentProps } from 'lib/component-props';
import { getTestProps } from 'lib/testing/utils';

export const Default = (props: ComponentProps): JSX.Element => {
  const { rendering } = props;

  const phKeyLeft = `custom-sidebar-left`;
  const phKeyRight = `custom-sidebar-right`;

  return (
    <div
      className="w-full flex flex-col md:flex-row gap-6"
      {...getTestProps(`component-sidebar-layout-${rendering?.uid}`)}
    >
      {/* Left column: Navigation or Widgets */}
      <div className="w-full md:w-1/4 flex-shrink-0" data-placeholder="editorial-left">
        <PlaceholderWrapper name={phKeyLeft} rendering={rendering} {...getTestProps(`ph-left`)} />
      </div>

      {/* Right column: Content */}
      <div className="w-full md:w-3/4 flex-grow" data-placeholder="editorial-right">
        <PlaceholderWrapper name={phKeyRight} rendering={rendering} {...getTestProps(`ph-right`)} />
      </div>
    </div>
  );
};
