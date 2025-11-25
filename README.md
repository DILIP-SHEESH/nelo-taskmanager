# Task Manager Application

A full-featured task management application built with Next.js, React, and Tailwind CSS. This application allows users to manage their tasks with features like CRUD operations, filtering, search with debouncing, session management, and automated email notifications.

## Features

- **User Authentication**: Simple login system with session management
- **CRUD Operations**: Create, read, update, and delete tasks
- **Task Management**: Add tasks with title, description, priority, and due date
- **Filtering**: Filter tasks by status (All, Completed, Pending) and priority
- **Search**: Real-time search with debouncing for better performance
- **Status Toggle**: Mark tasks as complete or pending
- **Email Automation**: Mock email notifications for pending tasks every 20 minutes
- **Responsive UI**: Clean and modern interface built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js
- **Frontend**: React.js with Hooks
- **Styling**: Tailwind CSS
- **Storage**: Session Storage for authentication and local state management

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <your-github-repo-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Login credentials (you can use any email/password for demo):
   - Email: any valid email format
   - Password: any password

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm start
# or
yarn start
```
