# My Trip — Frontend

A modern travel web application built with **Next.js, React, and TypeScript**.

The My Trip frontend provides a responsive and interactive interface for discovering, managing, and organizing travel-related content while communicating with a dedicated backend API.

---

## 🚀 About

**My Trip** is a full-stack travel application with a separated frontend and backend architecture.

This repository contains the **frontend application**, responsible for the user interface, client-side interactions, authentication state, API communication, and responsive experience.

The backend is maintained as a separate application and provides the API, authentication, database operations, and server-side functionality.

---

## 🛠️ Tech Stack

### Core

* **Next.js**
* **React**
* **TypeScript**
* **JavaScript**

### Styling & UI

* **Tailwind CSS**
* Responsive Design
* Modern UI Components
* Interactive Animations

### Data & API

* REST API
* API Integration
* Authentication Flow
* Access / Refresh Token Handling

### Development Tools

* **Git**
* **GitHub**
* **npm**

---

## ✨ Features

* 🔐 User authentication
* 🔄 Access & refresh token flow
* 👤 User account management
* 🌍 Travel-focused content
* 📱 Fully responsive interface
* ⚡ Fast navigation with Next.js
* 🧩 Reusable React components
* 🎨 Modern and interactive UI
* 🔌 Integration with a dedicated backend API
* 🗂️ Dynamic data rendering
* 📡 Server/client API communication

---

## 🏗️ Architecture

My Trip follows a **separated frontend/backend architecture**.

```text
                    My Trip
                       │
          ┌────────────┴────────────┐
          │                         │
     Frontend                    Backend
          │                         │
      Next.js                 Node.js + Express
      React                   TypeScript
      TypeScript              MongoDB Atlas
          │                    Mongoose
          │                    JWT
          │                         │
          └──────── REST API ───────┘
```

The frontend communicates with the backend through API requests and handles the presentation layer and user interactions.

---

## 🔐 Authentication

The application implements an authentication flow based on **JWT access and refresh tokens**.

The frontend is responsible for handling the authentication lifecycle and communicating with the backend authentication endpoints.

```text
User
 │
 ├── Login / Register
 │
 ▼
Backend API
 │
 ├── Access Token
 └── Refresh Token
 │
 ▼
Authenticated Frontend
 │
 ├── Protected Requests
 └── Token Refresh
```

---

## 📁 Project Structure

```text
src/
│
├── app/
│   ├── ...
│
├── components/
│   ├── ...
│
├── hooks/
│   ├── ...
│
├── lib/
│   ├── ...
│
├── services/
│   ├── ...
│
├── types/
│   ├── ...
│
└── ...
```

The application is structured around reusable components, application routes, API/service logic, hooks, and TypeScript types.

---

## 🔌 Backend

The frontend communicates with a separate My Trip backend.

The backend is built with:

* **Node.js**
* **Express.js**
* **TypeScript**
* **MongoDB Atlas**
* **Mongoose**
* **JWT**
* **Arvan Object Storage**

The backend is deployed on **Railway**.

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd my-trip-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_backend_api_url
```

Add any additional environment variables required by the project.

### 4. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📦 Available Scripts

```bash
npm run dev
```

Runs the development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run start
```

Starts the production server.

```bash
npm run lint
```

Runs the project's linting checks.

---

## 🎯 Project Goals

The frontend was developed with a focus on:

* Building a modern travel experience
* Maintaining a clean component architecture
* Creating reusable UI components
* Implementing responsive layouts
* Managing authentication securely
* Integrating with a dedicated REST API
* Using TypeScript for type safety
* Building a production-ready Next.js application

---

## 🌐 Related Project

**My Trip Backend**

The backend is maintained separately and provides the API and server-side functionality required by the frontend.

---

## 👨‍💻 Author

**Mahdyar Shirzad**

Full-Stack Developer focused on building modern web applications with **Next.js, React, TypeScript, Node.js, and MongoDB**.

---

⭐ If you find the project interesting, feel free to explore the repository.
