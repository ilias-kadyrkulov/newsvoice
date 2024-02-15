export type TArticleFeed = {
  id: number
  title: string
  excerpt: string
  imageUrl: string
}

export type TArticleContent = Omit<TArticleFeed, 'excerpt'> & {
  lead: string
  body: string
  blockquote?: string
}
