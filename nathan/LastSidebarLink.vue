<script setup>
import { useData } from 'vitepress'
import { computed } from 'vue'

const { theme, page } = useData()

const lastSidebarLink = computed(() => {
  const sidebarConfig = theme.value.sidebar
  if (!sidebarConfig) return null

  // Resolve current path (e.g., '/guide/')
  const currentPath = page.value.relativePath.replace(/[^/]+$/, '')

  // Get sidebar items for the current path
  const sidebarItems = Array.isArray(sidebarConfig)
    ? sidebarConfig // flat array
    : sidebarConfig[currentPath] || [] // multi-path object

  const flatLinks = []

  const extractLinks = (items) => {
    for (const item of items) {
      if (!item) continue
      if (item.items) {
        extractLinks(item.items)
      } else if (item.link && item.text) {
        flatLinks.push(item)
      }
    }
  }

  extractLinks(sidebarItems)

  return flatLinks.length > 0 ? flatLinks[flatLinks.length - 1] : null
})
</script>

<template>
  <span v-if="lastSidebarLink">
    <a :href="lastSidebarLink.link">{{ lastSidebarLink.text }}</a>
  </span>
</template>
