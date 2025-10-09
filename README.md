# Project Title: Demo-Shop-Cypress 🧪

This repository hosts a robust **Cypress.io** End-to-End (E2E) test automation framework designed to ensure the quality and stability of our web application.

---

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You'll need the following software installed on your machine:

- **Node.js**: The framework requires a modern version of Node.js.
  - _Check your version:_
    ```bash
    node -v
    ```
- **npm** (Node Package Manager): Comes bundled with Node.js.
  - _Check your version:_
    ```bash
    npm -v
    ```
- **Git**: For cloning the repository.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/GetaUlici/demo-shop-cypress
    cd demo-shop-cypress
    ```

2.  **Install dependencies:**
    Navigate to the project root and run the npm install command. This installs Cypress and all other necessary packages defined in `package.json`.

    ```bash
    npm install
    ```

---

## ▶️ Running Tests

### Cypress Test Runner (Interactive Mode)

Use this command to open the Cypress Test Runner, which allows you to interactively select and watch tests as they run in a browser.

```bash
npx cypress open
```

### Headless Mode (CLI)

Run all tests directly from your command line without opening the Cypress UI. This is ideal for CI/CD pipelines.

```bash
npx cypress run
```

### Specifying Tests or Browsers

You can target specific test files (`specs`) or run tests on a different browser.

- **Run a specific file:**
  ```bash
  npx cypress run --spec "cypress/e2e/path/to/your/test_file.cy.js"
  ```
- **Run on Chrome:**
  ```bash
  npx cypress run --browser chrome
  ```

---

## 📁 Project Structure

This is the general directory structure of the project:

```
.
├── cypress/
│   ├── e2e/           # All test spec files (*.cy.js, *.cy.ts)
│   ├── fixtures/      # External data (e.g., JSON files) used in tests
│   ├── support/       # Custom commands, global overrides, and reusable code
│   └── screenshots/   # Cypress automatically saves screenshots on failure
├── node_modules/      # Installed packages
├── package.json       # Project dependencies and scripts
└── cypress.config.js  # Cypress configuration file (e.g., baseUrl, video settings)
```

---

## ⚙️ Configuration

The main configuration is located in `cypress.config.js`.

- **Base URL:**
  To run tests against a specific environment, you can modify the `baseUrl` in your config or pass it as a command-line argument:

  ```bash
  npx cypress run --config baseUrl: "https://fasttrackit-test.netlify.app/#/"
  ```
