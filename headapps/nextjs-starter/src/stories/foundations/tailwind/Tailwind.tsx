// Global
import { useMemo, useState, useCallback } from 'react';
import tailwind from 'tailwind-config';
import { JSX } from 'react';
// Local
import { flattenObj } from 'lib/object-parser';
import * as twConfig from '../../../../tailwind.config';

export type TailwindProps = {
  theme: string;
};

const ITEMS_PER_PAGE = 50;

const Tailwind = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Memoize the config processing to avoid recalculation on every render
  const flattenedConfig = useMemo(() => {
    const config = tailwind.config(twConfig.theme);
    return flattenObj(config.extend);
  }, []);

  // Memoize filtered and paginated data
  const { filteredEntries, totalPages, totalItems } = useMemo(() => {
    // Ensure flattenedConfig is an object before using Object.entries
    const entries =
      flattenedConfig && typeof flattenedConfig === 'object'
        ? Object.entries(flattenedConfig as Record<string, unknown>)
        : [];

    const filtered = searchTerm
      ? entries.filter(
          ([key, value]) =>
            key.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : entries;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginated = filtered.slice(startIndex, endIndex);

    return {
      filteredEntries: paginated,
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE),
      totalItems: filtered.length,
    };
  }, [flattenedConfig, searchTerm, currentPage]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <div className="container px-16 py-8">
      <div className="max-w-[1000px] w-full"></div>
      <h1 className="font-bold mb-6 text-4xl">Tailwind Utilities</h1>
      <p className="mb-6">
        The project utilizes the Tailwind utility-first CSS framework. To meet the needs of the
        project, the base Tailwind configuration has been extended to include additional utility
        classes, which are detailed below.
      </p>

      {/* Search and Info Bar */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full max-w-md px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 placeholder-slate-500"
          />
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          Showing {filteredEntries.length} of {totalItems} tokens
          {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
        </div>
      </div>

      <div className="flex flex-col flex-wrap mb-6 md:flex-row">
        <div className="w-full overflow-hidden rounded-lg border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-700 sticky top-0">
              <tr>
                <th className="w-1/2 border-b border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                  Tailwind Config Token
                </th>
                <th className="w-1/2 border-b border-slate-300 dark:border-slate-600 font-semibold p-4 text-slate-900 dark:text-slate-200 text-left">
                  Token Value
                </th>
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable  @typescript-eslint/no-explicit-any */}
              {filteredEntries.map(([key, value]) => (
                <tr key={key} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="border-b border-slate-200 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                    {key}
                  </td>
                  <td className="border-b border-slate-200 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400 font-mono text-xs">
                    {typeof value === 'string' && value}
                    {Array.isArray(value) && value.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-6">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum =
              currentPage <= 3
                ? i + 1
                : currentPage >= totalPages - 2
                  ? totalPages - 4 + i
                  : currentPage - 2 + i;

            if (pageNum < 1 || pageNum > totalPages) return null;

            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 border rounded ${
                  currentPage === pageNum
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            Next
          </button>
        </div>
      )}

      <h1 className="font-bold mb-6 text-4xl">Usage Guidelines</h1>
      <p className="mb-6">
        Tailwind provides several methods for using arbitrary values to implement a design. Two of
        those methods are compatible with design tokens.
      </p>
      <h2 className="font-bold mb-6 text-2xl">Theme Function</h2>
      <p className="mb-6">
        Use the theme function to reference the design tokens in your tailwind.config.js file:
      </p>
      <div className="prose prose-slate dark:prose-dark mb-6">
        <pre className="language-html mb-6">
          <code className="language-html">
            {`<div class="grid grid-cols-[fit-content(16/9)]">
    <!-- ... -->
</div>`}
          </code>
        </pre>
      </div>
      <p className="mb-6">
        When using a CSS variable as an arbitrary value, wrapping your variable in var(...) isn’t
        needed — just providing the actual variable name is enough:
      </p>
      <div className="prose prose-slate dark:prose-dark mb-6">
        <pre className="language-html mb-6">
          <code className="language-html">
            {`<div class="bg-[--aspectRatio-hero]">
  <!-- ... -->
</div>`}
          </code>
        </pre>
      </div>
      <h2 className="font-bold mb-6 text-2xl">Resolving Ambiguities</h2>
      <p className="mb-6">
        Many utilities in Tailwind share a common namespace but map to different CSS properties. For
        example text-lg and text-black both share the text- namespace, but one is for font-size and
        the other is for color.
      </p>
      <p className="mb-6">
        When using arbitrary values, Tailwind can generally handle this ambiguity automatically
        based on the value you pass in: font-[theme(body.large.fontFamily)]
        text-[length:theme(body.large.fontSize)]
      </p>
      <div className="prose prose-slate dark:prose-dark mb-6">
        <pre className="language-html mb-6">
          <code className="language-html">
            {`<!-- Will generate a font-size utility -->
<div class="text-[22px]">...</div>

<!-- Will generate a color utility -->
<div class="text-[#bada55]">...</div>`}
          </code>
        </pre>
      </div>
      <p className="mb-6">
        Sometimes it really is ambiguous though, for example when using CSS variables:
      </p>
      <div className="prose prose-slate dark:prose-dark mb-6">
        <pre className="language-html mb-6">
          <code className="language-html">{`<div class="text-[var(--my-var)]">...</div>`}</code>
        </pre>
      </div>
      <p className="mb-6">
        In these situations, you can “hint” the underlying type to Tailwind by adding a{' '}
        <a
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Types"
          rel="noreferrer"
          target="_blank"
        >
          CSS data type
        </a>{' '}
        before the value:
      </p>
      <div className="prose prose-slate dark:prose-dark mb-6">
        <pre className="language-html">
          <code className="language-html">{`<!-- Will generate a font-size utility -->
<div class="text-[length:var(--my-var)]">...</div>

<!-- Will generate a color utility -->
<div class="text-[color:var(--my-var)]">...</div>`}</code>
        </pre>
      </div>
    </div>
  );
};

export default Tailwind;
