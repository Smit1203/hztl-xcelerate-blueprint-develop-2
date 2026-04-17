import { Presence } from '@sitecore-search/ui';
import { SvgIcon, SvgIconSize } from 'helpers/SvgIcon';
import { getTestProps } from 'lib/testing/utils';
import { tv } from 'tailwind-variants';

export type SearchLoadingProps = {
  isLoading: boolean;
  size?: SvgIconSize;
};

export const SearchLoading = (props: SearchLoadingProps) => {
  const { loaderSVGIconStyle, loaderStyle } = TAILWIND_VARIANTS();

  return (
    <Presence present={props?.isLoading}>
      <div className={loaderStyle()} {...getTestProps(`component-search-loading`)}>
        <div role="status">
          <SvgIcon className={loaderSVGIconStyle()} icon="loading" size={props?.size || 'md'} />
        </div>
      </div>
    </Presence>
  );
};

const TAILWIND_VARIANTS = tv({
  slots: {
    loaderStyle: ['text-center'],
    loaderSVGIconStyle: ['inline animate-spin', 'w-10', 'text-color-text-text'],
  },
});
