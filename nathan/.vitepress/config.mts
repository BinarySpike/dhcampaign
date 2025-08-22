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

  const mechanicsDir = path.join(__dirname, '../mechanics');
  const mechanicsItems = fs.readdirSync(mechanicsDir)
  //.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map(file => {
    const mechanicName = file.split('.')[0];
    return {
      text: `${mechanicName}`,
      link: `/mechanics/${mechanicName}`,
    };
  });



export default defineConfig({
  base: "/c/dhrylands",
  outDir: './.vitepress/dist/c/dhrylands',
  title: "A Drylands of the Colossus Campaign",
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
        text: 'Homebrew Mechanics',
        items: mechanicsItems,
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
