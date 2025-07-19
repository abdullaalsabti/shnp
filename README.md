# Shanap Restaurant Management Panel

A modern React-based restaurant management application built with TypeScript, featuring multi-language support and comprehensive restaurant onboarding.

## 🚀 Features

### Core Functionality

- **Restaurant Registration**: Complete onboarding flow for new restaurants
- **Authentication System**: Secure login/logout with JWT token management
- **Multi-language Support**: English and Arabic localization with RTL support
- **Document Management**: Upload and manage required restaurant documents
- **Responsive Design**: Mobile-first approach with Tailwind CSS

### Technical Features

- **State Management**: Redux Toolkit for global state
- **Form Validation**: Formik + Yup for robust form handling
- **Routing**: React Router v7 with protected routes
- **Loading States**: Global loading indicators with user feedback
- **Toast Notifications**: React Hot Toast for user notifications
- **Icons**: FontAwesome integration for consistent iconography

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM v7
- **Forms**: Formik + Yup validation
- **Internationalization**: i18next with browser language detection
- **Build Tool**: Vite
- **Icons**: FontAwesome
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Buttons/        # Button components
│   ├── Forms/          # Form-related components
│   ├── Inputs/         # Input field components
│   └── Modals/         # Modal components
├── pages/              # Page components
│   ├── LoginPage.tsx
│   ├── HomePage.tsx
│   ├── CreateRestaurantAccount.tsx
│   └── RootLayout.tsx
├── store/              # Redux store configuration
│   ├── store.ts
│   ├── authSlice.ts
│   └── loadingSlice.ts
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── api/                # API integration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd shanap-restaurant-panel
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Internationalization

The app supports multiple languages:

- **English** (default)
- **Arabic** with RTL support

Language files are located in `public/locales/[lang]/translation.json`

## 🔐 Authentication

The app uses JWT-based authentication with:

- Access tokens stored in localStorage
- Refresh token mechanism
- Protected routes with authentication guards
- Automatic logout functionality

## 📱 Pages & Routes

- `/login` - User authentication
- `/home` - Dashboard (protected)
- `/createRestaurantAccount` - Restaurant registration flow
- `/logout` - Logout action

## 🎨 Styling

- **Tailwind CSS v4** for utility-first styling
- **Custom CSS** for specific components
- **Responsive design** with mobile-first approach
- **RTL support** for Arabic language

## 🔧 State Management

Redux Toolkit slices:

- **authSlice**: Authentication state and tokens
- **loadingSlice**: Global loading states

## 📋 Form Handling

Restaurant registration includes:

- Basic restaurant information (English/Arabic names)
- Contact details and representative info
- Branch location and address details
- Social media accounts
- Document uploads (commercial license, tax certificate)
- Working hours configuration

## 🚀 Deployment

Build the project:

```bash
npm run build
```

The `dist` folder contains the production-ready files.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run linting and tests
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

Built with ❤️ for restaurant management
