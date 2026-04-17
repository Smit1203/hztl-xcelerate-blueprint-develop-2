/*
  BOOTSTRAPPING
  The bootstrap process runs before build, and generates JS that needs to be
  included into the build - specifically, plugins, the global config module,
  and the component name to component mapping.
*/

/*
  CSS VARIABLES GENERATION
*/
import './figma-tokens/generate-css-variables';

/*
  BRANDED FILES GENERATION
*/
import './generate-branded-files';
