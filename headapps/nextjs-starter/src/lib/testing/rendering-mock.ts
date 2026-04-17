import { ComponentParams, PlaceholdersData } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';

export function createComponentMockData<TProps extends ComponentProps>(
  componentName: string,
  fields: TProps['rendering']['fields'],
  params?: ComponentParams,
  placeholders?: PlaceholdersData,
  uid?: string
): TProps {
  const data = {
    fields: fields,
    params: params,
    rendering: {
      fields: fields,
      params: params,
      componentName: componentName,
      dataSource: 'Storybook',
      placeholders: placeholders,
      uid: uid,
    },
  };
  return data as unknown as TProps;
}
