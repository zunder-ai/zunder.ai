import { defineEventHandler } from 'h3'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const docs = await serverQueryContent(event).where({ _path: /^\/docs/ }).find()
  return docs
    .filter(doc => !doc._path.endsWith('_dir'))
    .map(doc => ({
      loc: doc._path,
      lastmod: doc.updatedAt
    }))
})