// Side-effect import. Must be imported BEFORE any module that calls
// tailwind-variants `tv(...)`. Without this, tailwind-merge (used by
// tailwind-variants under the hood) treats Figma-token classes like
// `text-typography-body-medium-font-size` as conflicting with
// `text-component-foo-color` and drops the font-size class. Disabling
// the merger keeps every utility class on the element so the tokens
// from src/assets/themes/* actually take effect.
import { defaultConfig } from 'tailwind-variants';

defaultConfig.twMerge = false;
