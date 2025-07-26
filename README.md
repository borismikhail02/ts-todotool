# Project Specification Document

## Project Name: **ToDoTool - Simple CLI Todo Manager**

---

## Objective

Create a command-line tool called ToDoTool that allows users to manage a list of todo items using commands. The app should be written entirely in **TypeScript**, and should enforce clear types, use modular code, and follow best TypeScript practices.

---

## Features

### Core Features

0. **Help**
   - **Command:** `todotool help`
   - Displays a full list of available commands

1. **Add a Task**
   - **Command:** `todotool add "Task description"`
   - Adds a new task containing:
     - Unique ID
     - Status: default to `Pending`
     - Timestamp (created date)

2. **List All Tasks**
   - **Command:** `todotool list`
   - Outputs a list of all tasks displaying:
     - ID
     - Description
     - Status (`Pending` or `In Progress` or `Done`)
     - Creation date (format: `YYYY-MM-DD HH:mm`)

3. **List Tasks by Status**
   - **Command:** `todotool list <status>`
   - Outputs a list of all tasks matching given status displaying:
     - ID
     - Description
     - Status (`Pending` or `In Progress` or `Done`)
     - Creation date (format: `YYYY-MM-DD HH:mm`)

4. **Change Task Status**
   - **Command:** `todotool change-status <task_id> <status>`
   - Changes the given task’s status to the updated status

5. **Delete a Task**
   - **Command:** `todotool delete <task_id>`
   - Permanently removes the given task
  
6. **Delete a Task**
   - **Command:** `todotool delete all`
   - Permanently removes all task

---

## Requirements

### TypeScript Requirements

- Use `interface` or `type` to define the task structure
- Use `enum` for task status (`Pending`, `In Progress`, `Done`)
- Use proper type annotations for all function parameters and return types
- Use a `class` for the task manager (e.g., `TaskManager`) that handles CRUD operations

### Architecture

- Separate concerns into different files:
  - `TaskManager.ts` – handles logic
  - `models/Task.ts` – contains interfaces and enums
  - `index.ts` – handles command-line parsing and routing
- Use `ts-node` for development (no need to compile manually for every run)

### Data Persistence

- Store tasks in a `tasks.json` file so they persist between runs
- Handle reading and writing JSON with file system module


---

## Tech Stack

- Node.js
- TypeScript

---

## How to Run

### 1. **Install Dependencies**

If you haven’t already, install the required packages:

```sh
npm install
```

> Make sure `ts-node` is included in your `devDependencies`. If not, install it manually:

```sh
npm install --save-dev ts-node typescript
```

---

### 2. **Run the CLI App**

Use `ts-node` to run the main entry point (usually `index.ts`):

```sh
npx ts-node src/index.ts <command> [options]
```

---

## Example Commands and Output

```sh
$ todotool add "Buy milk"
  Task added successfully: [1] Buy milk

$ todotool list
  Tasks:
  [1] [Pending] Buy milk — 2025-07-25 16:21
  [2] [Done] Write email — 2025-07-27 13:11

$ todotool list "done"
  Tasks:
  [2] [Done] Write email — 2025-07-27 13:11

$ todotool change-status 1 "done"
  Task 1 status changed to Done.

$ todotool delete 1
  Task 1 permanently deleted.

$ todotool delete all
  All tasks permanently deleted.
```

---

## Author

### Boris-Mikhail Georgiev

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/borismikhail02)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/boris-mikhail-georgiev/)