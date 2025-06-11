# NOT Contest Frontend By Syrnik Interactive

A modern web application built for the [NOT Contest](https://contest.notco.in/dev-frontend), featuring seamless TON wallet integration and a user-friendly interface for developers participating in the contest. The project follows a minimalistic approach, utilizing native React features and keeping external dependencies to a minimum for optimal performance and maintainability.

## Features

- TON wallet integration using TonConnect for contest participation
- Modern React-based user interface with minimal external dependencies
- State management with Redux Toolkit
- Pure React components with custom hooks
- Responsive design with Tailwind CSS
- Type-safe development with TypeScript
- Integration with NOT Contest backend API
- Lightweight and performant architecture

## Technology Stack

### Core Technologies

- **React** (v19.1.0) - Frontend framework
- **TypeScript** (v5.8.3) - Type-safe JavaScript
- **Redux Toolkit** (v2.8.2) - State management
- **React Router** (v7.6.2) - Client-side routing
- **TonConnect** (v3.1.0) - TON blockchain integration
- **Tailwind CSS** (v3.4.17) - Utility-first CSS framework

### Development Tools

- **Vite** (v6.3.5) - Build tool and development server
- **ESLint** (v9.28.0) - Code linting
- **Prettier** - Code formatting
- **Husky** (v9.1.7) - Git hooks
- **Sass** (v1.89.1) - CSS preprocessor
- **PostCSS** (v8.5.4) - CSS processing
- **TypeScript ESLint** - TypeScript-specific linting rules

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Development Guidelines

- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Follow React best practices and hooks guidelines
- Maintain component reusability
- Use proper typing for all components and functions
- Ensure compatibility with NOT Contest requirements
- Follow contest submission guidelines

## Project Structure

```
ton-contest/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components
│   ├── slice/         # RTK slice configuration
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   ├── api/           # NOT Contest API integration
│   └── assets/        # Static assets
├── public/            # Public static files
└── ...config files
```

> 🥚 Psst... there are a few hidden Easter eggs scattered throughout the app. Can you find them all?
