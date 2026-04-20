import { JSX } from 'react';

/**
 * Rendered in case if we have 404 error.
 * Page-level metadata (including <title>) is set via the App Router
 * `metadata` export on the calling page, not here.
 */
const NotFound = (): JSX.Element => (
  <>
    <title>404: NotFound</title>
    <div style={{ padding: 10 }}>
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <a href="/">Go to the Home page</a>
    </div>
  </>
);

export default NotFound;
