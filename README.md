<h1 align="center">📧 Mainstack Revenue Screen</h1>

## Project Goal

Recreate a figma design using React, implementing filtering, api integration, and performance optimizations.

---

## Features

- **User data**: Displays user data fetched from provided API ([fe-task-api.mainstack.io/user](https://fe-task-api.mainstack.io/user)).
- **Get Wallet data**: Displays wallet data fetched from provided API ([fe-task-api.mainstack.io/wallet](https://fe-task-api.mainstack.io/wallet)).
- **Get Transactions**: Displays transactions fetched from provided API ([fe-task-api.mainstack.io/transactions](https://fe-task-api.mainstack.io/transactions)).
- **Filtering**: Filter transactions through date range, transaction type and status.
- **Performance**: Lazy loading, memoization, and TanStack Query for caching and background refetching.
- **Consistent Styling**: Built with [Tailwind CSS](https://tailwindcss.com/) and [Mantine UI](https://mantine.dev/).

---

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for fast development
- [TanStack Query](https://tanstack.com/query/latest) for data fetching/caching
- [Axios](https://axios-http.com/) for HTTP requests
- [Tailwind CSS](https://tailwindcss.com/) & [Mantine UI](https://mantine.dev/) for styling

---

## Getting Started (Locally)

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_API_URL=https://fe-task-api.mainstack.io
```

### 3. Run the app

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173).

---


## API & Data Fetching

- Data is fetched from the provided mock API using Axios and TanStack Query.
- **Error Handling**: All API errors are caught globally in an Axios interceptor and displayed to the user using Mantine's notification system for a better user experience.

---

## Performance Optimizations & Tradeoffs

- **Lazy Loading**: Components and images are lazy-loaded where appropriate.
- **TanStack Query**: Handles caching, background refetching, and stale data management for a responsive UI.

---

## Deployment

Deployed on Vercel and the demo link is available [here]()

---

## License

MIT
