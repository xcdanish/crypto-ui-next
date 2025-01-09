import PropTypes from 'prop-types';
import * as React from 'react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider as DefaultCacheProvider } from '@emotion/react';
import { createStyleRegistry, StyleRegistry } from 'styled-jsx';

// This implementation is taken from https://github.com/garronej/tss-react/blob/main/src/next/appDir.tsx
export function NextAppDirEmotionCacheProvider(props) {
  const { options, CacheProvider = DefaultCacheProvider, children } = props;
  const [jsxStyleRegistry] = React.useState(() => createStyleRegistry());

  const [{ cache, flush }] = React.useState(() => {
    // eslint-disable-next-line
    const cache = createCache(options);
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    // eslint-disable-next-line
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = jsxStyleRegistry.styles();
    jsxStyleRegistry.flush();
    // eslint-disable-next-line no-restricted-syntax
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: styles
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <StyleRegistry registry={jsxStyleRegistry}>{children}</StyleRegistry>
    </CacheProvider>
  );
}

NextAppDirEmotionCacheProvider.propTypes = {
  options: PropTypes.object,
  CacheProvider: PropTypes.object,
  children: PropTypes.node
};
