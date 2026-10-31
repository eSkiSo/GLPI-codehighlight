# Code Highlight for GLPI 12

A minimal GLPI plugin that syntax-highlights code blocks using Highlight.js.

## Install

1. Copy the `codehighlight` directory into your GLPI `plugins/` directory.
2. In GLPI, open **Setup → Plugins**.
3. Install and then enable **Code Highlight**.
4. Refresh a ticket page containing code blocks.

## Behavior

- Highlights `<pre><code>...</code></pre>` blocks.
- Also highlights inline `<code>` elements when they specify a `language-*` or `lang-*` class.
- Uses Highlight.js automatic language detection unless a language class is provided.
- Watches for dynamically inserted content, such as ticket updates.
- Uses the `tokio-night-dark` Highlight.js theme.

Plain inline `<code>` elements are intentionally left alone so variable names and short commands in prose are not incorrectly treated as complete code samples.

## Network / CSP note

This quick version loads Highlight.js 11.11.1 and its theme from cdnjs. The GLPI server/browser must be allowed to access `cdnjs.cloudflare.com`. If your Content Security Policy blocks the CDN, download `highlight.min.js` and `styles/github-dark.min.css` from the Highlight.js 11.11.1 distribution and update `js/codehighlight.js` to load local copies instead.

No database tables or install/uninstall migrations are needed.
