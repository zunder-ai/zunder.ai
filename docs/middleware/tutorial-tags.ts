import { defineNuxtRouteMiddleware, useAsyncData, queryContent } from '#app'

export default defineNuxtRouteMiddleware(async (to) => {
  console.log('Tutorial tags middleware running')
  console.log('Current route:', to.path)

  const path = to.path
  const parts = path.split('/')

  console.log('Path parts:', parts)

  if (parts.length === 3 && parts[1] === 'tutorials') {
    console.log('Potential tag detected:', parts[2])

    try {
      const { data: tags } = await useAsyncData('tutorial-tags', async () => {
        const posts = await queryContent('tutorials').only(['tags']).find()
        const allTags = posts.flatMap(post => post.tags || [])
        return [...new Set(allTags)]
      })

      console.log('Fetched tags:', tags.value)

      if (tags.value && Array.isArray(tags.value) && tags.value.includes(parts[2])) {
        console.log('Valid tag found. Redirecting to:', '/tutorials', 'with query:', { tag: parts[2] })
        return navigateTo('/tutorials', {
          query: { tag: parts[2] },
          replace: true
        })
      } else {
        console.log('Tag not found in valid tags or tags.value is not an array')
      }
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  } else {
    console.log('Not a potential tag route')
  }

  console.log('Middleware completed without redirection')
})