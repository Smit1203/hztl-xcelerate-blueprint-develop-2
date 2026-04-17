import { renderHook } from '@testing-library/react';
import { useFieldWithFallbacks, FieldLikeObject } from '../useFieldWithFallbacks';
import useIsEditing from '../useIsEditing';

// Mock the useIsEditing hook
jest.mock('../useIsEditing');
const mockUseIsEditing = useIsEditing as jest.MockedFunction<typeof useIsEditing>;

describe('useFieldWithFallbacks', () => {
  // Test data
  const mainField: FieldLikeObject = { value: 'mainValue' };
  const fallbackField1: FieldLikeObject = { value: 'fallbackValue1' };
  const fallbackField2: FieldLikeObject = { value: 'fallbackValue2' };
  const emptyField: FieldLikeObject = { value: undefined, href: undefined };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return mainField when it has a value and not in editing mode', () => {
    // Arrange
    mockUseIsEditing.mockReturnValue(false);

    // Act
    const { result } = renderHook(() =>
      useFieldWithFallbacks(mainField, [fallbackField1, fallbackField2])
    );

    // Assert
    expect(result.current.renderField).toBe(mainField);
    expect(result.current.fallbackFieldForEditing).toBe(fallbackField1);
  });

  it('should return fallbackField when mainField has no value and not in editing mode', () => {
    // Arrange
    mockUseIsEditing.mockReturnValue(false);

    // Act
    const { result } = renderHook(() =>
      useFieldWithFallbacks(emptyField, [fallbackField1, fallbackField2])
    );

    // Assert
    expect(result.current.renderField).toBe(fallbackField1);
    expect(result.current.fallbackFieldForEditing).toBe(fallbackField1);
  });

  it('should return mainField when in editing mode regardless of value', () => {
    // Arrange
    mockUseIsEditing.mockReturnValue(true);

    // Act
    const { result } = renderHook(() =>
      useFieldWithFallbacks(emptyField, [fallbackField1, fallbackField2])
    );

    // Assert
    expect(result.current.renderField).toBe(emptyField);
    expect(result.current.fallbackFieldForEditing).toBe(fallbackField1);
  });

  it('should use custom hasValue function when provided', () => {
    // Arrange
    mockUseIsEditing.mockReturnValue(false);
    const customHasValue = (field: FieldLikeObject | undefined) =>
      field?.value === 'fallbackValue2';

    // Act
    const { result } = renderHook(() =>
      useFieldWithFallbacks(emptyField, [fallbackField1, fallbackField2], customHasValue)
    );

    // Assert
    expect(result.current.renderField).toBe(fallbackField2);
    expect(result.current.fallbackFieldForEditing).toBe(fallbackField2);
  });

  it('should return mainField when no fallbacks have values', () => {
    // Arrange
    mockUseIsEditing.mockReturnValue(false);

    // Act
    const { result } = renderHook(() =>
      useFieldWithFallbacks(emptyField, [emptyField, emptyField])
    );

    // Assert
    expect(result.current.renderField).toBe(emptyField);
    expect(result.current.fallbackFieldForEditing).toBeUndefined();
  });

  it('should handle undefined fallbackFields', () => {
    // Arrange
    mockUseIsEditing.mockReturnValue(false);

    // Act
    const { result } = renderHook(() => useFieldWithFallbacks(mainField, undefined));

    // Assert
    expect(result.current.renderField).toBe(mainField);
    expect(result.current.fallbackFieldForEditing).toBeUndefined();
  });

  it('should handle href values', () => {
    // Arrange
    mockUseIsEditing.mockReturnValue(false);
    const fieldWithHref: FieldLikeObject = { href: 'https://example.com' };

    // Act
    const { result } = renderHook(() => useFieldWithFallbacks(emptyField, [fieldWithHref]));

    // Assert
    expect(result.current.renderField).toBe(fieldWithHref);
    expect(result.current.fallbackFieldForEditing).toBe(fieldWithHref);
  });
});
