import { Token } from './token_types';

export type VariableType =
  | 'color'
  | 'spacing'
  | 'border-radius'
  | 'border-width'
  | 'width'
  | 'height'
  | 'min-width'
  | 'max-width'
  | 'min-height'
  | 'max-height'
  | 'font-size'
  | 'font-family'
  | 'font-weight'
  | 'letter-spacing'
  | 'opacity'
  | 'blur'
  | 'backdrop-blur'
  | 'VARIABLE'
  | 'IGNORED';

export type ExtendedFigmaToken = Token & {
  resolvedType: VariableType;
};

export type FigmaTokenMap = { [key: string]: ExtendedFigmaToken };

// These are string token values that are not valid CSS variables
const IGNORED_VALUES = ['Primary', 'White', 'Tonal', 'Brand', 'A', 'B'];

// This is where we may need to update the token type logic based on
// naming conventions used in the design system.
export function getVariableType(
  token: ExtendedFigmaToken,
  key: string,
  allowDynamicVariables: boolean = true
): VariableType {
  if (allowDynamicVariables) {
    if (typeof token.$value === 'string' && token.$value.startsWith('{')) {
      return 'VARIABLE';
    }
  }

  if (token.$type === 'color') {
    return 'color';
  }
  if (key.match(/color/i)) {
    return 'color';
  }

  if (token.$type === 'boolean') {
    return 'IGNORED';
  }
  if (
    token.$type === 'string' &&
    typeof token.$value === 'string' &&
    IGNORED_VALUES.includes(token.$value)
  ) {
    return 'IGNORED';
  }

  if (key.startsWith('other')) {
    return 'IGNORED';
  }
  if (key.match(/breakpoint/i)) {
    return 'IGNORED';
  }
  // Check for spacing/padding/margin BEFORE opacity to prevent misclassification
  if (key.match(/spacing|padding|margin|space-between|space between|layout|gutter/i)) {
    return 'spacing';
  }

  const extensionScope = token?.$extensions?.['com.figma']?.scopes;
  const isOpacity = extensionScope?.includes('OPACITY');
  if (isOpacity) {
    return 'opacity';
  }
  if (key.match(/radius/i)) {
    return 'border-radius';
  }
  if (key.match(/border-width/i)) {
    return 'border-width';
  }
  if (key.match(/min-?width/i)) {
    return 'min-width';
  }
  if (key.match(/max-?width/i)) {
    return 'max-width';
  }
  if (key.match(/min-?height/i)) {
    return 'min-height';
  }
  if (key.match(/max-?height/i)) {
    return 'max-height';
  }
  if (key.match(/width/i)) {
    return 'width';
  }
  if (key.match(/height/i)) {
    return 'height';
  }
  if (key.match(/font-?family/i)) {
    return 'font-family';
  }
  if (key.match(/font-?weight/i)) {
    return 'font-weight';
  }
  if (key.match(/font-?size/i)) {
    return 'font-size';
  }
  if (key.match(/letter-spacing/i)) {
    return 'letter-spacing';
  }
  if (key.match(/backdrop-blur/i)) {
    return 'backdrop-blur';
  }
  if (key.match(/blur/i)) {
    return 'blur';
  }
  if (key.match(/opacity/i)) {
    return 'opacity';
  }
  if (token.$extensions?.['com.figma']?.hiddenFromPublishing) {
    return 'IGNORED';
  }

  // Handle component-specific tokens that we don't need to process
  if (
    key.match(
      /component-.*-button-type|component-.*-fill|component-.*-item-button-type|component-.*-logo/i
    )
  ) {
    return 'IGNORED';
  }

  throw new Error(`Unknown variable type: ${key}, ${token.$value}`);
}
