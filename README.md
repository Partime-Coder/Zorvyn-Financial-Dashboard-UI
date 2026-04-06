# Financial Dashboard UI Assignment

A responsive and interactive **Financial Dashboard UI** built as part of a frontend evaluation assignment.

**Live Demo:**  
(https://zorvyn-financial-dashboard-ui.vercel.app/)

---

## Project Overview

This assignment required building a **finance dashboard interface** where users can track and understand their financial activity.

Rather than treating it as just a simple UI task, I approached it from a **product-thinking perspective**.

My assumption was that this dashboard is part of a **SaaS-based fintech product** that provides users with a centralized platform to monitor their financial health, track transactions, and gain insights into their spending behavior.

The assignment mentioned making reasonable assumptions based on the scenario, so I designed this project as a **frontend demonstration of a scalable fintech SaaS platform**.

The goal was to simulate how such a product would behave in a real-world environment while keeping the project frontend-focused.

---

## Product Assumption & Vision

I assumed this project represents a **financial SaaS product** where users can:

- Track their balance
- Monitor income and expenses
- View transaction history
- Analyze spending patterns
- Gain useful financial insights
- Manage transactions based on user roles

The idea behind this approach was to build something that feels close to an actual production dashboard rather than just a static assignment UI.

This project demonstrates how such a fintech dashboard could be structured and scaled in a real application.

---

## Tech Stack

This project is built using:

- **React**
- **Redux Toolkit**
- **JavaScript**
- **HTML**
- **CSS**
- **React Router**
- **Tailwind CSS**
- **Vite**
- **Recharts**

---

## What I Built

This project is a **frontend demonstration of a fintech SaaS dashboard product**.

The application includes:

### Dashboard Overview
Users can view a complete financial summary through:

- Total Balance
- Total Income
- Total Expenses
- Trend visualizations
- Spending breakdown charts
- Financial insights

This helps users quickly understand their financial position.

---

### Transactions Management

A dedicated transactions section is implemented where users can:

- View all transactions
- Track income and expenses
- Search and filter transactions
- Understand transaction categories
- Sort financial records

This section is designed to simulate how transaction data would be handled in a real financial product.

---

### Role-Based UI

A simple role-based UI system is implemented on the frontend.

Users can switch roles for demonstration purposes.

### Viewer Role
- Can view dashboard and transaction data

### Admin Role
- Can add transactions
- Can manage transaction records
- Extended access to UI actions

This was added to demonstrate **frontend role-based access behavior**.

---

### Data Handling

The data in this project is currently **preset and persisted using localStorage**.

The behavior is intentionally designed to simulate how data from a real backend API would be handled.

This includes:

- reading data
- updating data
- persisting changes
- reflecting state updates across the UI

The structure closely follows how real API-driven frontend applications manage data flow.

---

## State Management

**Redux Toolkit** is used for state management.

The state is properly separated for scalability.

Current managed states include:

- **User state**
- **Transactions state**
- **Theme state**

This keeps the application predictable, maintainable, and easy to scale.

Redux is primarily used to manage:

- user information
- financial transactions
- UI role state
- theme preferences
- loading / update flow

---

## Purpose of This Project

This project is built to demonstrate:

- frontend architecture
- product thinking
- component design
- state management
- scalable code structure
- responsive UI design
- role-based frontend logic

The focus was not only on fulfilling assignment requirements but also on showing how I approach building **real-world scalable frontend products**.

---

## Key Strengths / Plus Points

### Production-Level Code Structure
The codebase is written with a **production-oriented mindset**.

It includes:

- reusable components
- utility functions
- modular file structure
- clean separation of concerns
- scalable state management

---

### Responsive Design
The entire dashboard is fully responsive and works across:

- desktop
- tablet
- mobile devices

The layout adapts cleanly to different screen sizes.

---

### Reusable Architecture
Components are designed to be reusable and modular.

Examples include:

- cards
- charts
- transaction UI blocks
- layout components
- utility services

This makes future expansion easier.

---

### Highly Scalable
This project is intentionally structured for scalability.

It can easily grow into a larger fintech product with minimal restructuring.

---

## Future Scope

This project has strong future scalability potential.

Possible future enhancements include:

- proper backend integration
- user authentication
- user registration / login system
- real transaction APIs
- automatic bank / UPI transaction syncing
- advanced analytics dashboard
- budgeting features
- financial goal tracking
- multiple user tiers

For example:

- **Personal finance**
- **Family finance dashboard**
- **Business finance dashboard**

Additional SaaS plans / tiers can also be introduced based on user needs.

---

## Final Note

This project is designed as a **realistic frontend simulation of a fintech SaaS dashboard product**.

The primary objective was to demonstrate not just UI implementation, but also product assumptions, frontend scalability, and maintainable architecture.