import React from 'react';
import BackToTop from 'components/authorable/shared/site-structure/BackToTop/BackToTop';

const meta = {
  title: 'Components/Authorable/Shared/Site Structure/BackToTop',
  component: BackToTop,
  parameters: {
    docs: {
      description: {
        component: `
## Overview
A floating action button that scrolls the page back to the top. Appears after scrolling down.

## Usage
- When user scrolls down, the back to top button will appear.
- When user clicks on the back to top button, the page will scroll to the top.
          `,
      },
    },
  },
};

export default meta;

export const Default = () => (
  <div className="min-h-[150vh] w-full overflow-y-scroll relative">
    <div className="p-8 text-center text-lg text-gray-700">
      Scroll down to see the Back to Top button
    </div>
    <BackToTop />
  </div>
);

Default.storyName = 'Default';
