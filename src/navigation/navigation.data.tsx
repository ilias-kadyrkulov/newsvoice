import { TRoute } from './types'
import { Layout, HomePage, ArticlePage } from '../pages/index'

export const routes: TRoute[] = [
  {
    id: 1,
    path: '/',
    element: <Layout />,
    children: [
      {
        id: 2,
        path: '/',
        element: <HomePage />,
      },
      {
        id: 3,
        path: 'article/:id',
        element: <ArticlePage />,
      },
    ],
  },
]
