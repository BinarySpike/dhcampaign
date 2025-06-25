module.exports = function customTagPlugin(md) {
  const tagMap = [
    ['c', 'Character'],
    ['m', 'Location'],
  ];

  const tagLookup = Object.fromEntries(tagMap); // { c: 'Character', ... }

  const pattern = /\[([a-z]):([^\]]+)\]/g;

  function replaceCustomTags(state) {
    state.tokens.forEach((blockToken) => {
      if (blockToken.type !== 'inline') return;

      blockToken.children.forEach((token, idx) => {
        if (token.type !== 'text') return;

        const text = token.content;

        const replaced = text.replace(pattern, (match, key, name) => {
          const tagName = tagLookup[key];
          if (!tagName) return match; // ← Don't replace if tag not found
          return `<${tagName} name="${name}" />`;
        });

        if (replaced !== text) {
          const newToken = new state.Token('html_inline', '', 0);
          newToken.content = replaced;
          blockToken.children[idx] = newToken;
        }
      });
    });
  }

  md.core.ruler.push('custom_tag_replacer', replaceCustomTags);
};