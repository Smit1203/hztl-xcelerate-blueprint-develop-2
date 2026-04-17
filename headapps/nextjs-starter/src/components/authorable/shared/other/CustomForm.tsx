// Global
import { Text } from '@sitecore-content-sdk/nextjs';
import React, { JSX } from 'react';

// Local
import { Other } from '.generated/Other/CustomForm.model';
import { withStandardComponentWrapper } from 'helpers/HOC';
import RichTextWrapper from 'helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper';
import LinkWrapper from 'helpers/SitecoreWrappers/LinkWrapper/LinkWrapper';
import { getTestProps } from 'lib/testing/utils';

export type CustomFormProps = Other.CustomForm.CustomForm_Component;

const CustomFormDefaultComponent = (props: CustomFormProps): JSX.Element => (
  <div className={`component card ${props?.params?.styles}`}>
    <div className="component-content">
      <span className="is-empty-hint">CustomForm</span>
    </div>
  </div>
);

const CustomForm = (props: CustomFormProps): JSX.Element => {
  const id = props?.params?.RenderingIdentifier;
  if (props?.fields) {
    return (
      <section
        className={`card ${props?.params?.styles}`}
        id={id ? id : undefined}
        {...getTestProps(`component-contact-form-${props?.rendering?.uid}`)}
      >
        <div
          className="flex justify-center items-center"
          data-component="authorable/shared/other/customform"
        >
          <div className="mx-auto my-0">
            <div className="border border-gray">
              <Text field={props?.fields?.title} tag="h3" {...getTestProps(`title`)} />
              <RichTextWrapper
                className="text-gray text-base font-normal not-italic leading-6 mb-2 opacity-90"
                field={props?.fields?.description}
                tag="div"
                {...getTestProps(`description`)}
              />
              <div className="flex gap-xxs flex-wrap justify-center md:justify-normal">
                <LinkWrapper
                  ctaComponentClass="default"
                  className="flex items-center justify-center px-4 py-3 rounded bg-gray text-center text-white text-sm font-bold not-italic leading-normal"
                  field={props?.fields?.primaryCTA}
                  suppressNewTabIcon={true}
                  {...getTestProps(`primary-cta`)}
                />
                <LinkWrapper
                  ctaComponentClass="default"
                  className="flex items-center justify-center p-3 rounded border border-gray text-center text-gray text-base font-bold not-italic leading-normal"
                  field={props?.fields?.secondaryCTA}
                  suppressNewTabIcon={true}
                  {...getTestProps(`secondary-cta`)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <CustomFormDefaultComponent {...props} />;
};

export const Default = withStandardComponentWrapper(CustomForm);
