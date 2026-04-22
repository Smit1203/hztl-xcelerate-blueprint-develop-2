'use client';

// Global
import { useSitecore } from '@sitecore-content-sdk/nextjs';

const useIsEditing = () => {
  const { page } = useSitecore();
  return page?.mode?.isEditing;
};

export default useIsEditing;
