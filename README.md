# :cloud_with_lightning: Cloud Storage

_A personal project designed to explore modern technologies and architectural best practices._

## :package: Getting Started

1. **Install Dependencies**:

   Make sure you have **Git** and **NodeJS** installed.

2. **Clone Repo**:

   ```bash
   git clone git@github.com:jsonmaf1a/cloud-storage.git
   ```

3. **Set up Environment Variables**:

   Rename `.example.env` to `.env` in `./apps/api` and update the values.

4. **Install Node Modules**:

   ```bash
   pnpm install
   ```

5. **Run:**
   ```bash
   pnpm run dev
   ```

## :building_construction: Architecture & Design

### :wrench: Backend

The backend implements a `hexagonal architecture`, emphasizing:

- Strict separation between core business logic and external dependencies
- Flexible system architecture that supports future growth

### :earth_africa: Frontend

The web application follows a `feature-sliced design` methodology, which enables:

- Modular component development
- Improved code maintainability

### :lock: Type Safety

Using [ts-rest](https://ts-rest.com/), the API and client applications ensure comprehensive type safety. This approach provides:

- Compile-time type checking to prevent runtime errors
- Robust data transfer protocols between frontend and backend

## :gear: Tech Stack

[![NestJS](https://skillicons.dev/icons?i=nest "NestJS")](https://nestjs.com/ "NestJS")
[![PostgreSQL](https://skillicons.dev/icons?i=postgres "PostgreSQL")](https://www.postgresql.org/ "PostgreSQL")
[![React](https://skillicons.dev/icons?i=react "React")](https://react.dev/ "React")
[![Tailwind CSS](https://skillicons.dev/icons?i=tailwind "Tailwind CSS")](https://tailwindcss.com/ "Tailwind CSS")
[![Tauri](https://skillicons.dev/icons?i=tauri "Tauri")](https://tauri.app/ "Tauri")
[![Typescript](https://skillicons.dev/icons?i=ts "Typescript")](https://www.typescriptlang.org/ "Typescript")
[![Rust](https://skillicons.dev/icons?i=rust "Rust")](https://www.rust-lang.org/ "Rust")
