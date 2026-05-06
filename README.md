# Expense Tracker App 💸

>A clean and practical expense tracking application built with Vue 3 and Vite.

Track income and expenses, keep an always-updated balance, and manage your transaction history with instant feedback in the UI.

## Overview 🧾

This project is focused on a simple and fast personal finance workflow:

- Add transactions as positive (income) or negative (expense) values ➕➖
- See your current balance update in real time ⚡
- View total income and total expenses in separate summary cards 📊
- Remove transactions from history at any time 🗑️
- Keep data persisted in local storage between browser sessions 💾
- Get success and validation feedback through toast notifications 🔔

## Features ✨

- Built with Vue 3 Composition API and Single File Components
- Local state management using reactive refs and computed totals
- Persistent storage with `localStorage`
- Toast messages with `vue-toastification`
- Responsive, minimal UI with clear visual cues:
  - Green for income
  - Red for expenses
  - Purple as the primary accent color

## Tech Stack 🛠️

- Vue 3
- Vite
- JavaScript (ES Modules)
- Vue Toastification
- CSS

## Project Structure 🗂️

```text
.
|-- public/
|   |-- favicon.ico
|   `-- favicon.svg
|-- src/
|   |-- assets/
|   |   `-- main.css
|   |-- components/
|   |   |-- AddTransaction.vue
|   |   |-- Balance.vue
|   |   |-- Header.vue
|   |   |-- IncomeExpenses.vue
|   |   `-- TransactionList.vue
|   |-- App.vue
|   `-- main.js
|-- index.html
|-- package.json
`-- vite.config.js
```

## How It Works ⚙️

1. The app loads existing transactions from `localStorage` on mount.
2. Each new transaction receives a generated id and is appended to the list.
3. Computed values derive:
   - Total balance
   - Total income
   - Total expenses
4. Any add or delete operation updates both UI state and `localStorage`.
5. Toast notifications communicate success and validation errors.

## Getting Started 🚀

### Prerequisites 📋

- Node.js `^20.19.0` or `>=22.12.0`
- npm

### Installation 📦

```sh
npm install
```

### Run in Development 🧪

```sh
npm run dev
```

### Build for Production 🏗️

```sh
npm run build
```

### Preview Production Build 👀

```sh
npm run preview
```

## Available Scripts 📜

- `npm run dev` starts the Vite development server
- `npm run build` creates an optimized production build
- `npm run preview` serves the production build locally for validation

## Possible Future Improvements 🌱

- Edit existing transactions
- Add transaction categories (food, transport, salary, etc.)
- Add date and filtering controls
- Add charts for spending and income trends
- Add currency/locale formatting options

## License 📄

This project is open source under the terms of the [MIT License](LICENSE).

## 💬 Connect with Me
Follow my journey and other projects on:
- **LinkedIn:** [lucsantosdev](https://www.linkedin.com/in/lucsantosdev)
- **GitHub:** [lucsantosdev](https://github.com/lucsantosdev)
- **Email:** [lucsantosdev@gmail.com](mailto:lucsantosdev@gmail.com)
- **Support Me:** [Ko-Fi](https://ko-fi.com/lucsantosdev)

---

🧠 Je 9:23-24