const express = require('express');
const path = require('path');

module.exports = function (router) {
  router.use(express.json());
  router.use('/api/script/mock/data/embed-source.js', (_req, res) => {
    const mockPath = path.resolve(
      __dirname,
      '../src/stories/components/authorable/shared/content/CodeEmbed/CodeEmbed.mock-data.ts'
    );

    // Clear require cache to reload fresh data
    delete require.cache[mockPath];

    // Re-require fresh data
    const codeEmbedData = require(mockPath);

    res.setHeader('Content-Type', 'application/json');
    res.end(codeEmbedData?.default?.fields?.script?.value);
  });
};
