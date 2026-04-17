import * as FEAAS from '@sitecore-feaas/clientside/react';
// SitecoreForm component displays forms created in XM Forms as individual components to be embedded into Pages.
// Sitecore Forms for Sitecore XP are still available separately via @sitecore-jss-forms package
// Note: This registers the web component for Page Builder. The Content SDK Form component in component-map.ts
// handles the actual rendering. The hydration warning is expected and harmless for this client-only web component.
import '@sitecore/components/form';
/**
 * You can import your own client components here
 * @example
 * import './MyClientComponent';
 * @example
 * import 'src/otherFolder/MyOtherComponent';
 */

// An important boilerplate component that prevents BYOC components from being optimized away and allows then. Should be kept in this file.
const ClientsideComponent = (props: FEAAS.ExternalComponentProps) => FEAAS.ExternalComponent(props);
/**
 * Clientside BYOC component will be rendered in the browser, so that external components:
 * - Can have access to DOM apis, including network requests
 * - Use clientside react hooks like useEffect.
 * - Be implemented as web components.
 */

export default ClientsideComponent;
