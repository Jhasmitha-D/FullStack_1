# Web Creator - Internship Finder Tool

A modern internship finder tool built with React, TypeScript, and Tailwind CSS. Features a clean UI with comprehensive filtering options and a responsive design.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Jhasmitha-D/FullStack_1.git
   cd FullStack_1
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build in `dist/`
- `npm run preview` - Preview production build locally
- `npm run clean` - Remove build artifacts
- `npm run lint` - Run ESLint
- `npm run format` - Fix ESLint issues automatically
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
FullStack_1/
├── dist/               # Production build output
├── scripts/
│   └── build.mjs      # Custom esbuild configuration
├── src/
│   ├── components/
│   │   └── ui/        # Reusable UI components
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions
│   ├── pages/         # Page components
│   ├── App.tsx        # Root React component
│   ├── main.tsx       # Entry point
│   └── shadcn.css     # Global styles
└── public/            # Static assets
```

### Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI + shadcn/ui
- **Build Tool:** esbuild
- **Form Handling:** react-hook-form + zod
- **State Management:** zustand
- **Development Tools:**
  - ESLint
  - TypeScript
  - Prettier
  - VS Code configurations

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style
- Write meaningful commit messages
- Update documentation for significant changes
- Add comments for complex logic

## 📝 VS Code Setup

This project includes recommended VS Code settings and extensions for optimal development:

1. Install the recommended extensions (you'll be prompted automatically)
2. Use the provided workspace settings for consistent formatting
3. Format on save is enabled by default
4. ESLint and Tailwind CSS IntelliSense are configured

## 🔨 Production Build

To create and test a production build:

```bash
# Create production build
npm run build

# Preview the build
npm run preview
```

## 📦 Dependencies

- **UI Framework:** React + Radix UI
- **Styling:** Tailwind CSS + tailwind-merge
- **Forms:** react-hook-form + zod validation
- **Routing:** react-router
- **Date Handling:** date-fns
- **Charts:** recharts
- **Icons:** lucide-react

## License

MIT © [Jhasmitha-D]
