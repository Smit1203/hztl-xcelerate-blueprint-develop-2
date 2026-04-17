// Global
import React, { useMemo, useState, useCallback, JSX } from 'react';
import tailwind from 'tailwind-config';

// Local
import * as twConfig from '../../../../tailwind.config';

interface ColorItem {
  key: string;
  value: string;
  category: 'simple' | 'nested';
}

const Colors = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showLimit, setShowLimit] = useState(50); // Start with 50 items

  // Memoize the expensive config processing
  const processedColors = useMemo(() => {
    const config = tailwind.config(twConfig.theme);
    const colors = { ...config?.extend?.colors, ...config.theme.colors };

    const colorItems: ColorItem[] = [];

    // Process simple colors (string values)
    Object.entries(colors)
      .filter(([, value]) => typeof value === 'string')
      .forEach(([key, value]) => {
        colorItems.push({
          key,
          value: value as string,
          category: 'simple',
        });
      });

    // Process nested colors (object values)
    Object.entries(colors)
      .filter(([, value]) => typeof value === 'object')
      .forEach(([key, value]) => {
        Object.entries(value as object).forEach(([innerKey, innerValue]) => {
          if (typeof innerValue !== 'object') {
            colorItems.push({
              key: `${key}-${innerKey}`,
              value: innerValue,
              category: 'nested',
            });
          } else {
            // Handle deeply nested colors
            Object.entries(innerValue as object).forEach(([innerInnerKey, innerInnerValue]) => {
              colorItems.push({
                key: `${key}-${innerKey}-${innerInnerKey}`,
                value: innerInnerValue,
                category: 'nested',
              });
            });
          }
        });
      });

    return colorItems.sort((a, b) => a.key.localeCompare(b.key));
  }, []);

  // Filter colors based on search term
  const filteredColors = useMemo(() => {
    if (!searchTerm.trim()) {
      return processedColors;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return processedColors.filter(
      (color) =>
        color.key.toLowerCase().includes(lowerSearchTerm) ||
        color.value.toLowerCase().includes(lowerSearchTerm)
    );
  }, [processedColors, searchTerm]);

  // Get visible colors (limited for performance)
  const visibleColors = useMemo(() => {
    return filteredColors.slice(0, showLimit);
  }, [filteredColors, showLimit]);

  // Memoized color renderer
  const renderColor = useCallback(
    (colorItem: ColorItem) => (
      <div className="flex flex-col relative" key={colorItem.key}>
        <div className="capitalize mb-3 text-sm" title={colorItem.key}>
          {colorItem.key}
        </div>
        <div
          className="box-border h-10 min-w-[55px] rounded w-6 border border-gray-200"
          style={{ backgroundColor: colorItem.value }}
          title={`${colorItem.key}: ${colorItem.value}`}
        />
        <div className="flex flex-col font-mono mt-4 px-0.5 text-xs">
          <p title={colorItem.key}>{colorItem.key}</p>
          <p className="dark:text-gray-light lowercase text-gray-dark" title={colorItem.value}>
            {colorItem.value}
          </p>
        </div>
      </div>
    ),
    []
  );

  const handleLoadMore = useCallback(() => {
    setShowLimit((prev) => prev + 50);
  }, []);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowLimit(50); // Reset limit when searching
  }, []);

  return (
    <div className="container px-16 py-8">
      <div className="max-w-[1000px] w-full"></div>
      <h1 className="font-bold mb-6 text-4xl">Colors</h1>
      <p className="mb-6">
        This library is supported by an extensive color system that themes both styles and
        components. This enables more comprehensive customization and extension for any project.
      </p>

      {/* Search and Stats */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <input
            type="text"
            placeholder="Search colors..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[300px]"
          />
          <div className="text-sm text-gray-600">
            Showing {visibleColors.length} of {filteredColors.length} colors
            {searchTerm && ` (filtered from ${processedColors.length} total)`}
          </div>
        </div>
      </div>

      {/* Color Grid */}
      <div className="gap-6 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 justify-center mb-6">
        {visibleColors.map(renderColor)}
      </div>

      {/* Load More Button */}
      {visibleColors.length < filteredColors.length && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Load More ({filteredColors.length - visibleColors.length} remaining)
          </button>
        </div>
      )}

      {filteredColors.length === 0 && searchTerm && (
        <div className="text-center py-8 text-gray-500">No colors found matching {searchTerm}</div>
      )}
    </div>
  );
};

export default Colors;
