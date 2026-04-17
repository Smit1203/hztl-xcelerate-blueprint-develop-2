export type GtmEvent = {
  event?: string;
  'gtm.element.dataset.gtmComponentName'?: string;
  'gtm.element.dataset.gtmDatasourceId'?: string;
  'gtm.element.dataset.gtmDatasourceName'?: string;
  'gtm.element.dataset.gtmLinkName'?: string;
  'gtm.element.dataset.gtmLinkUrl'?: string;
  [name: string]: string | undefined;
};
