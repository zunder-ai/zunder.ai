import { defineEventHandler } from 'h3'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const [docs, tutorials] = await Promise.all([
    serverQueryContent(event).where({ _path: /^\/docs/ }).find(),
    serverQueryContent(event).where({ _path: /^\/tutorials/ }).find()
  ])

  const allContent = [...docs, ...tutorials]

  return allContent
    .filter(item => !item._path.endsWith('_dir'))
    .map(item => ({
      loc: item._path,
      lastmod: item.updatedAt
    }))
})