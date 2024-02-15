import { lazy } from 'react'

export { default as Layout } from '../layout/Layout'
export { HomePage } from '../pages/HomePage/HomePage'

export const ArticlePage = lazy(() => import('../pages/ArticlePage/ArticlePage'))
