# Cloud Storage

## Project Overview

- **API**: A scalable backend built with [NestJS](https://nestjs.com/), providing authentication, database management, and API endpoints.
- **Web Client**: A responsive web application built with [React](https://react.dev/) and [Vite](https://vite.dev/), ensuring fast loading and a smooth user experience.
- **Desktop Client**: A desktop client developed using [Tauri](https://tauri.app/), enabling seamless desktop integration.
- **Shared Libraries**: Common utilities, types, and schemas shared across apps to reduce code duplication and ensure consistency.

## Architecture and Design

### End-to-End Type Safety

This project emphasizes **end-to-end type safety** using [ts-rest](https://ts-rest.com/), a powerful RPC-like client for TypeScript. Key advantages include:

- **Type Consistency**: Ensures that types remain consistent between the API and client applications, reducing the likelihood of runtime errors.
- **Improved Developer Productivity**: Developers can rely on compile-time type checking, which accelerates development and reduces debugging time.
- **Seamless Integration**: With **ts-rest**, communication between the API and client-side applications is more predictable and safer.

### API: Hexagonal Architecture

The API adopts the **Hexagonal Architecture** (also known as ports-and-adapters), which encourages:

- **Separation of Concerns**: Core business logic is decoupled from external dependencies such as databases and third-party services.
- **Testability**: The architecture's isolation of business logic from infrastructure allows for easy unit testing and mocking of external services.
- **Scalability and Maintainability**: The modular design makes it easier to scale the application by adding new features or replacing components without affecting the core logic.

### Web: Feature-Sliced Design

The web application is organized following the **Feature-Sliced Design** methodology, offering several benefits:

- **Scalable Architecture**: The application is divided into independent, reusable features, making it easy to extend with new features or make updates without affecting unrelated parts of the app.
- **Maintainability**: Code is grouped logically, reducing technical debt and improving long-term maintainability.
- **Developer Efficiency**: The design encourages clear boundaries between shared components, features, and application logic, improving collaboration and simplifying the development process.

## License

This project is licensed under the **GPL-3.0-only** License. See the [LICENSE](./LICENSE) file for further details.
