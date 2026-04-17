// Global

// Local

/**
 * Returns a test prop object with data-testid for unit tests.
 * Will return an empty object if the environment is not test
 * @param testId - The test id to be used in the test
 * @returns A test prop object
 */
export const getTestProps = (testId: string) => {
  return process.env.NODE_ENV === 'test' || process.env.NEXT_PUBLIC_TEST_ENV === 'true'
    ? { 'data-testid': testId }
    : {};
};
