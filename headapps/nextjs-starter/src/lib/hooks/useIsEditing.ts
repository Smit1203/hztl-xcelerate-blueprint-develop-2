// Global
import { usePageMode } from './sitecore/context';

const useIsEditing = () => {
  const pageMode = usePageMode();

  return pageMode?.isEditing;
};

export default useIsEditing;
