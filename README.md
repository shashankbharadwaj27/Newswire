# Newswire — News Aggregator App

A responsive, production-ready news aggregator built with **React**, **React Router**, and **Tailwind CSS**, powered by the [NewsAPI](https://newsapi.org) REST API.

---

## Features

- **Live news feed** from NewsAPI with real article data
- **Category filtering** — Business, Technology, Health, Science, Sports, Climate, World
- **Debounced search** — searches as you type, without hammering the API
- **Pagination** — navigate through large result sets
- **Grid & List views** — toggle between card grid and compact list layout
- **Featured banner** — top article displayed as a full-width hero card
- **Dynamic sidebar** — trending keywords, live category counts, and top sources all derived from the current feed
- **Skeleton loaders** — smooth loading states throughout
- **Error handling** — API failures show a friendly error with retry option
- **Fully responsive** — mobile-first layout with hamburger menu

---

## Project Structure

```
news-aggregator/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx          # Reusable button (primary/secondary/ghost)
│   │   │   ├── Loader.jsx          # Skeleton loading placeholders
│   │   │   ├── ErrorMessage.jsx    # Error state with retry
│   │   │   └── Pagination.jsx      # Prev/Next page controls
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Sticky header, search, category tabs
│   │   │   ├── Sidebar.jsx         # Dynamic trending, categories, sources
│   │   │   └── Footer.jsx          # Site footer
│   │   └── news/
│   │       ├── NewsCard.jsx        # Grid card + list card variants
│   │       ├── NewsGrid.jsx        # Full feed renderer (grid/list)
│   │       ├── NewsDetail.jsx      # Article modal/drawer
│   │       └── NewsBanner.jsx      # Featured hero article
│   ├── hooks/
│   │   ├── useFetch.js             # Generic async data fetching hook
│   │   ├── useNews.js              # News-specific hook with pagination
│   │   └── useSearch.js            # Debounced search input hook
│   ├── pages/
│   │   ├── Home.jsx                # Main feed page
│   │   ├── Category.jsx            # Category-specific page (/category/:name)
│   │   └── Search.jsx              # Search results page (/search?q=...)
│   ├── services/
│   │   ├── api.js                  # Axios instance with interceptors
│   │   └── newsService.js          # API functions + article normalizer
│   ├── utils/
│   │   ├── constants.js            # API config, categories, colors
│   │   ├── formatDate.js           # Date/time formatting helpers
│   │   └── truncateText.js         # Text cleaning helpers
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css                   # Tailwind directives + global styles
├── .env                            # VITE_API_KEY=...
├── tailwind.config.js
├── vite.config.js
└── package.json
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/shashankbharadwaj27/Newswire.git
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add your API key

Get a free API key from [newsapi.org](https://newsapi.org/register), then create a `.env` file in the project root:

```env
VITE_API_KEY=your_newsapi_key_here
VITE_API_BASE_URL=https://newsapi.org/v2
```

### 4. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

---

### Data Flow

```
.env
  └── services/api.js          (Axios instance, key auto-injected)
        └── services/newsService.js  (fetch + normalize articles)
              └── hooks/useNews.js        (state: articles, loading, error, page)
                    └── pages/Home.jsx         (orchestrates everything)
                          ├── components/news/NewsGrid.jsx
                          │     ├── NewsBanner.jsx   (featured hero)
                          │     ├── NewsCard.jsx     (grid/list cards)
                          │     └── NewsDetail.jsx   (article modal)
                          └── components/layout/Sidebar.jsx
```

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev) | UI library |
| [React Router v6](https://reactrouter.com) | Client-side routing |
| [Axios](https://axios-http.com) | HTTP client |
| [Tailwind CSS v3](https://tailwindcss.com) | Utility-first styling |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [NewsAPI](https://newsapi.org) | News data source |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

---
