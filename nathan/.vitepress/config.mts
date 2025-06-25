import { defineConfig } from 'vitepress'
import customTagPlugin from './customTagPlugin'

// https://vitepress.dev/reference/site-config
import fs from 'fs';
import path from 'path';

const sessionDir = path.join(__dirname, '../sessions');

const sessionItems = fs.readdirSync(sessionDir)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map(file => {
    const sessionName = file.split('.')[0];
    return {
      text: `Session ${sessionName}`,
      link: `/sessions/${sessionName}`,
    };
  });



export default defineConfig({
  title: "Drylands of the Colossus",
  description: "A Daggerheart campaign",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Welcome', link: '/welcome' }
    ],

    sidebar: [
      {
        text: '',
        items: [
          { text: 'Welcome', link: '/welcome' }
        ]
      },
      {
        text: 'Sessions',
        items: sessionItems
      }
    ],
    search: {
      provider: 'local'
    }
  },
  markdown: {
    config: (md) => {
      md.use(customTagPlugin)
    }
  }
})
