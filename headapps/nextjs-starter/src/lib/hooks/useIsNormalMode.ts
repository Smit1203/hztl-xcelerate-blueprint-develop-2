// Global
import { usePageMode } from './sitecore/context';

/**
 * "Normal" mode means we are not in "edit" or "preview" mode.
 * @returns Whether we are rendering in "normal" mode.
 */
const useIsNormalMode = (): boolean => {
  const pageMode = usePageMode();
  return pageMode?.isNormal;
};

export default useIsNormalMode;
