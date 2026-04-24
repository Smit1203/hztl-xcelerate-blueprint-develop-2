import { JSX } from 'react';
import { AppPlaceholder } from '@sitecore-content-sdk/nextjs';

import componentMap from '.sitecore/component-map';
import { ComponentProps } from 'lib/component-props';
import { findComponent } from 'lib/utils/object-utils';

import { MainLayoutFrame } from './MainLayoutFrame';

const MainLayout = (props: ComponentProps): JSX.Element => {
  const { RenderingIdentifier } = props?.params || {};

  const isSearchLayout =
    findComponent(props.rendering, 'ArticleMain')?.length > 0 ||
    findComponent(props.rendering, 'SearchResult')?.length > 0;

  return (
    <MainLayoutFrame isSearchLayout={isSearchLayout} id={RenderingIdentifier}>
      <AppPlaceholder
        name="custom-headless-breadcrumb"
        rendering={props.rendering}
        page={props.page}
        componentMap={componentMap}
      />
      <AppPlaceholder
        name="custom-headless-hero"
        rendering={props.rendering}
        page={props.page}
        componentMap={componentMap}
      />
      <AppPlaceholder
        name="custom-headless-main-content"
        rendering={props.rendering}
        page={props.page}
        componentMap={componentMap}
      />
    </MainLayoutFrame>
  );
};

export const Default = MainLayout;
export default MainLayout;
