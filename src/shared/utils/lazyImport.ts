import { lazy } from 'react';

export function lazyImport<T extends React.ComponentType<any>>(importFn: () => Promise<{ default: T }>) {
  return lazy(importFn);
}
