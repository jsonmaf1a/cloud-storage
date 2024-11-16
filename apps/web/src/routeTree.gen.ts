/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ProtectedLayoutImport } from './routes/_protected/_layout'

// Create Virtual Routes

const AuthLoginLazyImport = createFileRoute('/auth/login')()
const ProtectedLayoutIndexLazyImport = createFileRoute('/_protected/_layout/')()
const ProtectedLayoutTrashLazyImport = createFileRoute(
  '/_protected/_layout/trash',
)()
const ProtectedLayoutSettingsLazyImport = createFileRoute(
  '/_protected/_layout/settings',
)()
const ProtectedLayoutFilesLazyImport = createFileRoute(
  '/_protected/_layout/files',
)()
const ProtectedLayoutFavoritesLazyImport = createFileRoute(
  '/_protected/_layout/favorites',
)()

// Create/Update Routes

const AuthLoginLazyRoute = AuthLoginLazyImport.update({
  id: '/auth/login',
  path: '/auth/login',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/auth/login.lazy').then((d) => d.Route))

const ProtectedLayoutRoute = ProtectedLayoutImport.update({
  id: '/_protected/_layout',
  getParentRoute: () => rootRoute,
} as any)

const ProtectedLayoutIndexLazyRoute = ProtectedLayoutIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => ProtectedLayoutRoute,
} as any).lazy(() =>
  import('./routes/_protected/_layout/index.lazy').then((d) => d.Route),
)

const ProtectedLayoutTrashLazyRoute = ProtectedLayoutTrashLazyImport.update({
  id: '/trash',
  path: '/trash',
  getParentRoute: () => ProtectedLayoutRoute,
} as any).lazy(() =>
  import('./routes/_protected/_layout/trash.lazy').then((d) => d.Route),
)

const ProtectedLayoutSettingsLazyRoute =
  ProtectedLayoutSettingsLazyImport.update({
    id: '/settings',
    path: '/settings',
    getParentRoute: () => ProtectedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_protected/_layout/settings.lazy').then((d) => d.Route),
  )

const ProtectedLayoutFilesLazyRoute = ProtectedLayoutFilesLazyImport.update({
  id: '/files',
  path: '/files',
  getParentRoute: () => ProtectedLayoutRoute,
} as any).lazy(() =>
  import('./routes/_protected/_layout/files.lazy').then((d) => d.Route),
)

const ProtectedLayoutFavoritesLazyRoute =
  ProtectedLayoutFavoritesLazyImport.update({
    id: '/favorites',
    path: '/favorites',
    getParentRoute: () => ProtectedLayoutRoute,
  } as any).lazy(() =>
    import('./routes/_protected/_layout/favorites.lazy').then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_protected/_layout': {
      id: '/_protected/_layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof ProtectedLayoutImport
      parentRoute: typeof rootRoute
    }
    '/auth/login': {
      id: '/auth/login'
      path: '/auth/login'
      fullPath: '/auth/login'
      preLoaderRoute: typeof AuthLoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/_protected/_layout/favorites': {
      id: '/_protected/_layout/favorites'
      path: '/favorites'
      fullPath: '/favorites'
      preLoaderRoute: typeof ProtectedLayoutFavoritesLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/_layout/files': {
      id: '/_protected/_layout/files'
      path: '/files'
      fullPath: '/files'
      preLoaderRoute: typeof ProtectedLayoutFilesLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/_layout/settings': {
      id: '/_protected/_layout/settings'
      path: '/settings'
      fullPath: '/settings'
      preLoaderRoute: typeof ProtectedLayoutSettingsLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/_layout/trash': {
      id: '/_protected/_layout/trash'
      path: '/trash'
      fullPath: '/trash'
      preLoaderRoute: typeof ProtectedLayoutTrashLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
    '/_protected/_layout/': {
      id: '/_protected/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof ProtectedLayoutIndexLazyImport
      parentRoute: typeof ProtectedLayoutImport
    }
  }
}

// Create and export the route tree

interface ProtectedLayoutRouteChildren {
  ProtectedLayoutFavoritesLazyRoute: typeof ProtectedLayoutFavoritesLazyRoute
  ProtectedLayoutFilesLazyRoute: typeof ProtectedLayoutFilesLazyRoute
  ProtectedLayoutSettingsLazyRoute: typeof ProtectedLayoutSettingsLazyRoute
  ProtectedLayoutTrashLazyRoute: typeof ProtectedLayoutTrashLazyRoute
  ProtectedLayoutIndexLazyRoute: typeof ProtectedLayoutIndexLazyRoute
}

const ProtectedLayoutRouteChildren: ProtectedLayoutRouteChildren = {
  ProtectedLayoutFavoritesLazyRoute: ProtectedLayoutFavoritesLazyRoute,
  ProtectedLayoutFilesLazyRoute: ProtectedLayoutFilesLazyRoute,
  ProtectedLayoutSettingsLazyRoute: ProtectedLayoutSettingsLazyRoute,
  ProtectedLayoutTrashLazyRoute: ProtectedLayoutTrashLazyRoute,
  ProtectedLayoutIndexLazyRoute: ProtectedLayoutIndexLazyRoute,
}

const ProtectedLayoutRouteWithChildren = ProtectedLayoutRoute._addFileChildren(
  ProtectedLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof ProtectedLayoutRouteWithChildren
  '/auth/login': typeof AuthLoginLazyRoute
  '/favorites': typeof ProtectedLayoutFavoritesLazyRoute
  '/files': typeof ProtectedLayoutFilesLazyRoute
  '/settings': typeof ProtectedLayoutSettingsLazyRoute
  '/trash': typeof ProtectedLayoutTrashLazyRoute
  '/': typeof ProtectedLayoutIndexLazyRoute
}

export interface FileRoutesByTo {
  '/auth/login': typeof AuthLoginLazyRoute
  '/favorites': typeof ProtectedLayoutFavoritesLazyRoute
  '/files': typeof ProtectedLayoutFilesLazyRoute
  '/settings': typeof ProtectedLayoutSettingsLazyRoute
  '/trash': typeof ProtectedLayoutTrashLazyRoute
  '/': typeof ProtectedLayoutIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_protected/_layout': typeof ProtectedLayoutRouteWithChildren
  '/auth/login': typeof AuthLoginLazyRoute
  '/_protected/_layout/favorites': typeof ProtectedLayoutFavoritesLazyRoute
  '/_protected/_layout/files': typeof ProtectedLayoutFilesLazyRoute
  '/_protected/_layout/settings': typeof ProtectedLayoutSettingsLazyRoute
  '/_protected/_layout/trash': typeof ProtectedLayoutTrashLazyRoute
  '/_protected/_layout/': typeof ProtectedLayoutIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/auth/login'
    | '/favorites'
    | '/files'
    | '/settings'
    | '/trash'
    | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '/auth/login' | '/favorites' | '/files' | '/settings' | '/trash' | '/'
  id:
    | '__root__'
    | '/_protected/_layout'
    | '/auth/login'
    | '/_protected/_layout/favorites'
    | '/_protected/_layout/files'
    | '/_protected/_layout/settings'
    | '/_protected/_layout/trash'
    | '/_protected/_layout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  ProtectedLayoutRoute: typeof ProtectedLayoutRouteWithChildren
  AuthLoginLazyRoute: typeof AuthLoginLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  ProtectedLayoutRoute: ProtectedLayoutRouteWithChildren,
  AuthLoginLazyRoute: AuthLoginLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_protected/_layout",
        "/auth/login"
      ]
    },
    "/_protected/_layout": {
      "filePath": "_protected/_layout.tsx",
      "children": [
        "/_protected/_layout/favorites",
        "/_protected/_layout/files",
        "/_protected/_layout/settings",
        "/_protected/_layout/trash",
        "/_protected/_layout/"
      ]
    },
    "/auth/login": {
      "filePath": "auth/login.lazy.tsx"
    },
    "/_protected/_layout/favorites": {
      "filePath": "_protected/_layout/favorites.lazy.tsx",
      "parent": "/_protected/_layout"
    },
    "/_protected/_layout/files": {
      "filePath": "_protected/_layout/files.lazy.tsx",
      "parent": "/_protected/_layout"
    },
    "/_protected/_layout/settings": {
      "filePath": "_protected/_layout/settings.lazy.tsx",
      "parent": "/_protected/_layout"
    },
    "/_protected/_layout/trash": {
      "filePath": "_protected/_layout/trash.lazy.tsx",
      "parent": "/_protected/_layout"
    },
    "/_protected/_layout/": {
      "filePath": "_protected/_layout/index.lazy.tsx",
      "parent": "/_protected/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
