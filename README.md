# Taskion

Taskion is a lightweight and intuitive task management interface built with modern web technologies. It integrates seamlessly with Notion, providing users with a smooth and efficient task management experience.

## Motivation

The motivation behind Taskion is to create a simple, user-friendly interface for managing tasks and notes. By leveraging powerful frontend and backend technologies, Taskion aims to deliver a responsive and visually appealing application across desktop and web platforms. The goal is to provide users with a cohesive and enjoyable task management experience that syncs seamlessly with Notion.

## Tech Stack

### Frontend

#### Desktop
- **Electron**: Cross-platform desktop application framework
- **Electron-Vite**: Fast development and build processes for Electron
- **Electron-Builder**: Packaging and distribution for Electron apps
- **React**: UI library for building interactive interfaces
- **TailwindCSS**: Utility-first CSS framework
- **NextUI**: Modern React component library
- **React Query**: Data fetching and state management
- **React Router**: Routing for the desktop app

#### Landing
- **Next.js**: React framework for server-side rendering and static site generation
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **Headless UI**: Unstyled, accessible UI components

### Backend
- **Go**: Programming language for backend development
- **Fiber**: Fast, flexible web framework for Go
- **Notion API**: Integration for task and note management

## Requirements

- Node.js (v18 or later)
- pnpm
- Go (v1.20 or later)
- Air (Go live reload tool)

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   pnpm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` in both `apps/desktop` and `apps/api` directories
   - Fill in the required values in the `.env` files
4. Start the development servers:
   ```
   pnpm dev
   ```

This command will start all necessary services:
- Desktop app (Electron)
- Landing page
- Backend API

## Features

- [x] Cross-platform support (Windows, macOS, Linux)
- [x] Responsive design with TailwindCSS
- [x] Modern UI components with NextUI
- [x] Seamless integration with Notion
- [x] Task creation, editing, and deletion
- [x] Real-time task updates
- [x] Menubar window for quick access
- [x] OAuth2 integration with Notion
- [x] Notion Pages and Blocks CRUD operations
- [x] GitHub star count display on landing page
- [ ] Drag and drop task reordering
- [ ] Dark mode support

## Roadmap

- [x] Set up Electron environment
- [x] Configure Electron-Vite for fast development
- [x] Implement Electron-Builder for packaging
- [x] Develop UI with React and NextUI components
- [x] Style the application using TailwindCSS
- [x] Integrate with Notion API
- [x] Add menubar window
- [x] Implement Notion OAuth2 authentication
- [x] Create landing page with Next.js
- [ ] Implement real-time updates and improve responsiveness
- [ ] Add offline support and sync functionality
- [ ] Implement dark mode, drag and drop reordering, and more interactive features to the landing page

## Contributing

We welcome contributions to Taskion! If you'd like to contribute, please:

1. Fork the repository
2. Create a new branch for your feature
3. Commit your changes
4. Push to your branch
5. Create a pull request

Please ensure your code adheres to our coding standards and includes appropriate tests.

## License

[MIT License](LICENSE)

---

For more detailed information about each component, please refer to the respective README files in the `apps/desktop`, `apps/landing`, and `apps/api` directories.