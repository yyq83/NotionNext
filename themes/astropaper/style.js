export const Style = () => (
  <style jsx global>{`
    #theme-astropaper {
      --paper-bg: #fdfdfd;
      --paper-fg: #282728;
      --paper-accent: #006cac;
      --paper-muted: #606977;
      --paper-border: #ece9e9;
      --paper-surface: #f1f1f1;
      min-height: 100vh;
      background: var(--paper-bg);
      color: var(--paper-fg);
      font-family:
        ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono',
        'PingFang SC', monospace;
      line-height: 1.6;
      overflow-wrap: anywhere;
    }

    html.dark #theme-astropaper {
      --paper-bg: #212737;
      --paper-fg: #eaedf3;
      --paper-accent: #ff8d45;
      --paper-muted: #afb9ca;
      --paper-border: #a44d1b;
      --paper-surface: #343f60;
      color-scheme: dark;
    }

    #theme-astropaper .paper-shell {
      display: flex;
      flex-direction: column;
      width: min(100%, 48rem);
      min-height: 100vh;
      margin-inline: auto;
      padding-inline: 1rem;
    }

    #theme-astropaper .paper-header,
    #theme-astropaper .paper-footer-bottom {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem 1.5rem;
    }

    #theme-astropaper .paper-header {
      padding-block: 1.5rem;
      border-bottom: 1px solid var(--paper-border);
    }

    #theme-astropaper .paper-brand {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    #theme-astropaper .paper-brand,
    #theme-astropaper .paper-hero h1 {
      display: flex;
      align-items: center;
      gap: 0.4em;
    }

    #theme-astropaper .paper-site-icon {
      flex: none;
      object-fit: contain;
    }

    #theme-astropaper .paper-nav,
    #theme-astropaper .paper-icons,
    #theme-astropaper .paper-inline,
    #theme-astropaper .paper-footer-links {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.45rem;
    }

    #theme-astropaper .paper-nav {
      gap: 0.6rem 1.35rem;
      font-weight: 600;
    }

    #theme-astropaper .paper-nav [aria-current='page'] {
      color: var(--paper-accent);
      text-decoration: underline wavy;
      text-underline-offset: 0.45rem;
    }

    #theme-astropaper .paper-icon {
      display: inline-grid;
      place-items: center;
      min-width: 2rem;
      min-height: 2rem;
    }

    #theme-astropaper :is(a, button):hover,
    #theme-astropaper .paper-accent {
      color: var(--paper-accent);
    }

    #theme-astropaper :is(a, button, input, summary):focus-visible {
      outline: 2px dashed var(--paper-accent);
      outline-offset: 3px;
    }

    #theme-astropaper .paper-muted,
    #theme-astropaper .paper-back,
    #theme-astropaper .paper-date {
      color: var(--paper-muted);
    }

    #theme-astropaper .paper-main {
      flex: 1;
      min-width: 0;
    }

    #theme-astropaper .paper-hero {
      padding-block: 3.6rem 1.7rem;
      border-bottom: 1px solid var(--paper-border);
    }

    #theme-astropaper .paper-hero-with-image {
      display: grid;
      grid-template-columns: minmax(0, 1fr) clamp(8rem, 22vw, 11rem);
      align-items: center;
      gap: clamp(1.25rem, 4vw, 2rem);
    }

    #theme-astropaper .paper-hero-image {
      width: 100%;
      height: auto;
      aspect-ratio: 1;
      object-fit: contain;
      border-radius: 0.5rem;
    }

    #theme-astropaper .paper-hero-title {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 0.6rem;
      margin-bottom: 1.6rem;
    }

    #theme-astropaper .paper-hero h1 {
      min-width: 0;
      font-size: clamp(2rem, 6vw, 3rem);
      line-height: 1.2;
      letter-spacing: -0.045em;
      font-weight: 750;
    }

    #theme-astropaper .paper-hero .paper-site-icon {
      width: clamp(1.75rem, 5vw, 2.5rem);
      height: auto;
    }

    #theme-astropaper .paper-hero .paper-icons {
      margin-top: 0.9rem;
    }

    #theme-astropaper .paper-section {
      padding-block: 2.65rem 1.75rem;
    }

    #theme-astropaper .paper-section + .paper-section {
      border-top: 1px solid var(--paper-border);
    }

    #theme-astropaper .paper-section h2 {
      font-weight: 700;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    #theme-astropaper .paper-post {
      margin-block: 1.15rem;
    }

    #theme-astropaper .paper-post:last-child {
      margin-bottom: 0;
    }

    #theme-astropaper .paper-post :is(h2, h3) {
      font-weight: 600;
      font-size: 1.125rem;
      line-height: 1.5;
    }

    #theme-astropaper
      :is(.paper-post, .paper-taxonomy, .paper-footer-links)
      a:hover {
      text-decoration: underline dashed;
      text-underline-offset: 0.24em;
    }

    #theme-astropaper .paper-date {
      display: flex;
      align-items: center;
      gap: 0.45rem;
      font-size: 0.875rem;
      font-style: italic;
      margin-block: 0.2rem;
    }

    #theme-astropaper .paper-all-posts,
    #theme-astropaper .paper-to-top {
      display: flex;
      justify-content: center;
      margin-block: 1.5rem 2.5rem;
    }

    #theme-astropaper .paper-footer {
      border-top: 1px solid var(--paper-border);
      font-size: 0.875rem;
      padding-block: 1rem;
    }

    #theme-astropaper .paper-footer-links {
      gap: 0.5rem 1rem;
      margin-bottom: 0.3rem;
    }

    #theme-astropaper :is(.paper-page, .paper-article) {
      padding-block: 2rem 3.5rem;
    }

    #theme-astropaper .paper-title {
      font-size: clamp(1.65rem, 4.5vw, 2.1rem);
      font-weight: 750;
      line-height: 1.35;
      margin-bottom: 0.8rem;
    }

    #theme-astropaper .paper-article .paper-title {
      color: var(--paper-accent);
    }

    #theme-astropaper .paper-back {
      margin-bottom: 1.1rem;
      width: fit-content;
    }

    #theme-astropaper .paper-taxonomy {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem 1.35rem;
    }

    #theme-astropaper .paper-taxonomy-section {
      padding-block: 1.25rem;
    }

    #theme-astropaper .paper-taxonomy:empty {
      display: none;
    }

    #theme-astropaper .paper-pagination,
    #theme-astropaper .paper-adjacent {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      gap: 1rem;
      margin-top: 2rem;
      padding-block: 1rem;
      border-top: 1px solid var(--paper-border);
      font-size: 0.875rem;
    }

    #theme-astropaper .paper-adjacent {
      grid-template-columns: 1fr 1fr;
      border-bottom: 1px solid var(--paper-border);
    }

    #theme-astropaper :is(.paper-pagination, .paper-adjacent) > :last-child {
      justify-self: end;
      text-align: end;
    }

    #theme-astropaper .paper-adjacent span {
      display: block;
    }

    #theme-astropaper .paper-form {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      padding: 0.35rem 0.7rem;
      border: 1px solid var(--paper-muted);
      border-radius: 0.2rem;
      margin-block: 1rem;
    }

    #theme-astropaper .paper-form input {
      min-width: 0;
      flex: 1;
      padding: 0.35rem;
      background: transparent;
      color: inherit;
    }

    #theme-astropaper .paper-lock {
      margin-top: 2rem;
    }

    #theme-astropaper .paper-search-status {
      color: var(--paper-muted);
      margin-top: 1.5rem;
    }

    #theme-astropaper .paper-toc {
      margin-block: 1.5rem;
    }

    #theme-astropaper .paper-toc summary {
      cursor: pointer;
      width: fit-content;
      font-weight: 600;
    }

    #theme-astropaper .paper-toc .paper-toc-list {
      margin: 0.5rem 0 0 1.25rem;
      list-style: disc;
    }

    #theme-astropaper .paper-toc-side {
      display: none;
    }

    @media (min-width: 80rem) {
      #theme-astropaper .paper-article-body {
        position: relative;
      }

      #theme-astropaper .paper-toc {
        display: none;
      }

      #theme-astropaper .paper-toc-side {
        display: block;
        position: absolute;
        inset-block: 0;
        inset-inline-start: calc(100% + 2rem);
        width: min(15rem, calc((100vw - 100%) / 2 - 3rem));
      }

      #theme-astropaper .paper-toc-side nav {
        position: sticky;
        top: 2rem;
        max-height: calc(100dvh - 4rem);
        overflow-y: auto;
        border-inline-start: 1px solid var(--paper-border);
        padding: 0.25rem 0.5rem 0.25rem 1rem;
        font-size: 0.875rem;
        line-height: 1.5;
        color: var(--paper-muted);
      }

      #theme-astropaper .paper-toc-title {
        margin-bottom: 0.5rem;
        color: var(--paper-fg);
        font-weight: 700;
      }

      #theme-astropaper .paper-toc-side .paper-toc-list li + li {
        margin-top: 0.25rem;
      }

      #theme-astropaper .paper-toc-side a {
        display: block;
      }
    }

    #theme-astropaper .paper-empty {
      text-align: center;
    }

    #theme-astropaper .paper-empty p {
      margin-bottom: 1rem;
    }

    #theme-astropaper .paper-article #notion-article {
      margin-top: 1.25rem;
    }

    #theme-astropaper .paper-article .notion {
      --bg-color: var(--paper-bg);
      --bg-color-1: var(--paper-surface);
      --notion-max-width: 100%;
      line-height: 1.75;
    }

    #theme-astropaper .paper-article .notion-simple-table {
      display: block;
      width: max-content;
      max-width: 100%;
      overflow-x: auto;
    }

    #theme-astropaper .paper-article .notion-hr {
      border-color: var(--paper-border);
    }

    #theme-astropaper .paper-article .notion-link {
      color: var(--paper-accent);
    }

    #theme-astropaper .paper-article-end {
      margin-top: 2rem;
    }

    @media (max-width: 40rem) {
      #theme-astropaper .paper-hero-with-image {
        grid-template-columns: minmax(0, 1fr);
      }

      #theme-astropaper .paper-hero-image {
        justify-self: center;
        width: min(100%, 8.5rem);
      }
    }

    @media (max-width: 36rem) {
      #theme-astropaper .paper-header {
        align-items: flex-start;
        flex-direction: column;
        padding-block: 1rem;
      }

      #theme-astropaper .paper-hero {
        padding-top: 2.4rem;
      }
    }
  `}</style>
)
