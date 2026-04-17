// Global
import tailwind from 'tailwind-config';
import { JSX } from 'react';
// Local
import * as twConfig from '../../../../tailwind.config';

export type TypographyProps = {
  theme: string;
};

const Typography = (): JSX.Element => {
  const config = tailwind.config(twConfig.theme);

  const fontFamilies = {
    ...config.theme.fontFamily,
    ...(config.extend ? config.extend.fontFamily : {}),
  };
  const fontSizes = { ...config.theme.fontSize, ...(config.extend ? config.extend.fontSize : {}) };

  /* possible font family values are font-mono font-sans font-serif font-roboto font-openSans font-rockwell font-avenirNextCondensed font-merriweather font-heading font-body */
  /* possible font values are font-xs font-sm font-base font-lg font-xl font-2xl font-3xl font-4xl font-5xl font-6xl font-bodySans-xLarge font-bodySans-xLarge-underline font-bodySans-large  font-bodySans-large-semibold font-bodySans-large-underline font-bodySans-large-underline-semibold font-bodySans-medium font-bodySans-medium-semibold font-bodySans-medium-underline font-bodySans-medium-underline-semibold font-bodySans-small font-bodySans-small-semibold font-bodySans-small-underline font-bodySans-small-underline-semibold font-bodySans-xSmall font-bodySans-xSmall-semibold font-bodySans-xSmall-underline font-bodySans-xSmall-underline-semibold font-bodySerif-xLarge font-bodySerif-xLarge-underline font-bodySerif-large font-bodySerif-large-underline font-bodySerif-medium font-bodySerif-medium-underline font-bodySerif-small font-bodySerif-small-underline font-bodySerif-xSmall font-bodySerif-xSmall-underline font-body-large font-body-large-semibold font-body-large-underline font-body-medium font-body-medium-semibold font-body-medium-semibold-underline font-body-small font-body-small-semibold font-body-small-semibold-underline font-body-xLarge font-body-small font-body-xSmall font-body-xSmall-semibold font-body-xSmall-semibold-underline font-header-large-large font-header-large-medium font-header-large-small  font-header-large-xLarge font-header-large-xSmall font-header-large-xSmall-underline font-header-large-xxLarge font-header-large-xxSmall font-header-medium-large font-header-medium-medium font-header-medium-small font-header-medium-xLarge font-header-medium-xSmall font-header-medium-xxLarge font-header-medium-xxSmall font-header-small-large font-header-small-medium font-header-small-small font-header-small-xLarge font-header-small-xSmall font-header-small-xxLarge font-header-small-xxSmall */
  /* possible font size values are text-xs text-sm text-base text-lg text-xl text-2xl text-3xl text-4xl text-5xl text-6xl text-bodySans-xLarge text-bodySans-xLarge-underline text-bodySans-large  text-bodySans-large-semibold text-bodySans-large-underline text-bodySans-large-underline-semibold text-bodySans-medium text-bodySans-medium-semibold text-bodySans-medium-underline text-bodySans-medium-underline-semibold text-bodySans-small text-bodySans-small-semibold text-bodySans-small-underline text-bodySans-small-underline-semibold text-bodySans-xSmall text-bodySans-xSmall-semibold text-bodySans-xSmall-underline text-bodySans-xSmall-underline-semibold text-bodySerif-xLarge text-bodySerif-xLarge-underline text-bodySerif-large text-bodySerif-large-underline text-bodySerif-medium text-bodySerif-medium-underline text-bodySerif-small text-bodySerif-small-underline text-bodySerif-xSmall text-bodySerif-xSmall-underline  text-body-large text-body-large-semibold text-body-large-underline text-body-medium text-body-medium-semibold text-body-medium-semibold-underline text-body-small text-body-small-semibold text-body-small-semibold-underline text-body-xLarge text-body-small text-body-xSmall text-body-xSmall-semibold text-body-xSmall-semibold-underline text-header-large-large text-header-large-medium text-header-large-small  text-header-large-xLarge text-header-large-xSmall text-header-large-xSmall-underline text-header-large-xxLarge text-header-large-xxSmall text-header-medium-large text-header-medium-medium text-header-medium-small text-header-medium-xLarge text-header-medium-xSmall text-header-medium-xxLarge text-header-medium-xxSmall text-header-small-large text-header-small-medium text-header-small-small text-header-small-xLarge text-header-small-xSmall text-header-small-xxLarge text-header-small-xxSmall */
  /* possible leading values are text-xs text-sm leading-base leading-lg leading-xl leading-2xl leading-3xl leading-4xl leading-5xl leading-6xl leading-bodySans-xLarge leading-bodySans-xLarge-underline leading-bodySans-large  leading-bodySans-large-semibold leading-bodySans-large-underline leading-bodySans-large-underline-semibold leading-bodySans-medium leading-bodySans-medium-semibold leading-bodySans-medium-underline leading-bodySans-medium-underline-semibold leading-bodySans-small leading-bodySans-small-semibold leading-bodySans-small-underline leading-bodySans-small-underline-semibold leading-bodySans-xSmall leading-bodySans-xSmall-semibold leading-bodySans-xSmall-underline leading-bodySans-xSmall-underline-semibold leading-bodySerif-xLarge leading-bodySerif-xLarge-underline leading-bodySerif-large leading-bodySerif-large-underline leading-bodySerif-medium leading-bodySerif-medium-underline leading-bodySerif-small leading-bodySerif-small-underline leading-bodySerif-xSmall leading-bodySerif-xSmall-underline  leading-body-large leading-body-large-semibold leading-body-large-underline leading-body-medium leading-body-medium-semibold leading-body-medium-semibold-underline leading-body-small leading-body-small-semibold leading-body-small-semibold-underline leading-body-xLarge leading-body-small leading-body-xSmall leading-body-xSmall-semibold leading-body-xSmall-semibold-underline leading-header-large-large leading-header-large-medium leading-header-large-small  leading-header-large-xLarge leading-header-large-xSmall leading-header-large-xSmall-underline leading-header-large-xxLarge leading-header-large-xxSmall leading-header-medium-large leading-header-medium-medium leading-header-medium-small leading-header-medium-xLarge leading-header-medium-xSmall leading-header-medium-xxLarge leading-header-medium-xxSmall leading-header-small-large leading-header-small-medium leading-header-small-small leading-header-small-xLarge leading-header-small-xSmall leading-header-small-xxLarge leading-header-small-xxSmall */

  return (
    <div className="container px-16 py-8">
      <h1 className="font-bold mb-6 text-4xl">Font Families</h1>
      <p className="mb-6">
        The typeface of any text element can be controlled using the following font classes:
      </p>
      <div className="flex flex-col flex-wrap mb-6 md:flex-row">
        {Object.entries(fontFamilies).map(([key, value]: [string, string[]]) => (
          <div className="grid grid-cols-3 gap-6 mb-12 w-full" key={key}>
            <div className="mb-6 w-40">{`font-${key}`}</div>
            <div className="col-span-2">
              <div className={`font-${key} text-2xl`}>
                The quick brown fox jumps over the lazy dog.
              </div>
              <div className="font-mono mt-4 text-xs">{value}</div>
            </div>
          </div>
        ))}
      </div>
      <h1 className="font-bold mb-6 text-4xl">Text Sizes</h1>
      <p className="mb-6">
        The size of any text element can be controlled using the following size classes:
      </p>
      <div className="flex flex-col flex-wrap mb-16 md:flex-row">
        {Object.entries(fontSizes).map(([key, value]: [string, string[]]) => (
          <div className="grid grid-cols-3 gap-6 mb-12 w-full" key={key}>
            <div className="mb-6 w-40">{`text-${key}`}</div>
            <div className="col-span-2" key={key}>
              <div className={`font-sans text-${key}`}>
                The quick brown fox jumps over the lazy dog.
              </div>
              <div className="font-mono mt-4 text-xs">
                {typeof value === 'string' ? value : value[0]}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Typography;
