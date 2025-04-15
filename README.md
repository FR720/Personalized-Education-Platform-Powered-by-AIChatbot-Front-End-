# 🎓 Personalized Education Platform Powered by AI Chatbot (Front-End)

This is the front-end of a personalized learning platform enhanced with AI chatbot integration. It provides an intuitive interface for users to browse courses, interact with the chatbot, and track their learning journey.

## 🔗 Live Demo

Check out the deployed version:  
👉 [https://personalized-education-platform-powered-by-ai-git-1ee77f-fady1.vercel.app/](https://personalized-education-platform-powered-by-ai-git-1ee77f-fady1.vercel.app/)

## 📦 Repository

View the full source code on GitHub:  
👉 [https://github.com/FR720/Personalized-Education-Platform-Powered-by-AIChatbot-Front-End-.git](https://github.com/FR720/Personalized-Education-Platform-Powered-by-AIChatbot-Front-End-.git)

---

## 🚀 Steps to Run the React Project

Follow these steps to get the front-end running locally:

### 1. Clone the repository

```bash
git clone https://github.com/FR720/Personalized-Education-Platform-Powered-by-AIChatbot-Front-End-.git
cd Personalized-Education-Platform-Powered-by-AIChatbot-Front-End-
```

### 2. Install dependencies

Make sure you have **Node.js** installed (preferably LTS version). Then install the dependencies:

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
```

The app will be running at:

```
http://localhost:3000
```

### 4. Environment Variables (if needed)

If your project depends on environment variables (e.g., API URLs), create a `.env.local` file in the root directory and add the necessary keys like:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> Replace the URL above with your backend URL if applicable.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Language**: TypeScript / JavaScript
- **State Management**: useState, useEffect, Context API
- **Deployment**: Vercel

---

## ✨ Features

- Modern responsive UI for online learning
- Shopping cart and course checkout flow
- Course recommendation slider
- AI chatbot integration (coming soon)
- Coupon input & order summary system
- Dynamic rendering with `use client` components

---

## 📂 Folder Structure

```
📦src/app
 ┣ 📂_components
 ┃ ┣ 📂ui         # Reusable UI components (Button, Input, etc.)
 ┃ ┗ 📂cart       # CartItem, OrderSummary, Slider
```
