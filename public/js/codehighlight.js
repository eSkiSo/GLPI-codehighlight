
(function () {
    'use strict';

    var VERSION = '11.11.1';
    var CDN = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/' + VERSION;

    function isInsideEditor(el) {
        return !!el.closest(
            '.tox, .tox-edit-area, .tox-edit-area__iframe,' +
            ' .CodeMirror, .cm-editor, .ck-editor,' +
            ' [contenteditable="true"], textarea'
        );
    }

    function highlightCode(root) {
        if (!window.hljs || !root) return;

        var selector = 'pre code, code[class*="language-"], code[class*="lang-"]';
        var elements = [];

        if (root.nodeType === 1 && root.matches(selector)) {
            elements.push(root);
        }

        if (root.querySelectorAll) {
            elements.push.apply(elements, root.querySelectorAll(selector));
        }

        elements.forEach(function (el) {
            if (isInsideEditor(el)) return;
            if (el.dataset.highlighted === 'yes') return;
            if (el.dataset.codehighlightDone === 'true') return;

            // Don't process editor-owned or HTML-containing code nodes.
            // Highlight.js expects code text, not live HTML elements.
            if (el.children.length > 0) return;

            el.dataset.codehighlightDone = 'true';

            try {
                window.hljs.highlightElement(el);
            } catch (err) {
                delete el.dataset.codehighlightDone;
                console.warn('Code Highlight: unable to highlight code block.', err);
            }
        });
    }

    function start() {
        if (document.querySelector('link[data-codehighlight-theme]') === null) {
            var css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = CDN + '/styles/tokyo-night-dark.css';
            css.dataset.codehighlightTheme = 'true';
            document.head.appendChild(css);
        }

        function load() {
            if (window.hljs) {
                highlightCode(document.body);
                return;
            }

            if (document.querySelector('script[data-codehighlight-library]')) return;

            var script = document.createElement('script');
            script.src = CDN + '/highlight.min.js';
            script.async = true;
            script.dataset.codehighlightLibrary = 'true';
            script.onload = function () {
                highlightCode(document.body);
            };
            document.head.appendChild(script);
        }

        load();

        // Only inspect newly added content; don't rescan the whole page
        // for every mutation made by the editor.
        var observer = new MutationObserver(function (mutations) {
            if (!window.hljs) return;

            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === 1 && !isInsideEditor(node)) {
                        highlightCode(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
})();
