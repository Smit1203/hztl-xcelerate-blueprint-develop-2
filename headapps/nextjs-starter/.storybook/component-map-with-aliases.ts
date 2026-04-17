/**
 * Storybook-specific component-map with aliases
 *
 * This extends the auto-generated component-map with component name aliases
 * that don't match file names but are used in Sitecore.
 */

import componentMap from '../.sitecore/component-map';

// Create a new map with aliases
const componentMapWithAliases = new Map(componentMap);

// Add component aliases (Sitecore name -> Generated component)
// RichText -> RTE (Sitecore uses "RichText" but file is "RTE.tsx")
const rteComponent = componentMap.get('RTE');
if (rteComponent) {
  componentMapWithAliases.set('RichText', rteComponent);
}

export default componentMapWithAliases;
