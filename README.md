# 📦 Custom NodeJS Package Manager

A basic NodeJS package manager to add and install dependencies with deterministic installs and caching.

## ✨ Features

- **📥 Add Packages**: Add packages and update `/output/package.json`.
- **🔧 Install Dependencies**: Install all dependencies specified in `/output/package.json`.
- **🔒 Lock File**: Ensures deterministic installs by recording exact versions.
- **🎨 Loading Animations**: Visual feedback with loading animations using `ora`.

## ⚙️ Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/edwinhern/nodejs-package-manager.git
    cd nodejs-package-manager
    ```

2. Install dependencies:

    ```bash
    npm ci
    ```

## 🚀 Usage

### ➕ Add a Package

To add a package:

```bash
npm run add <package_name>@<version> <another_package>@<version>
```

Example to add `is-thirteen` version `1.0.0` and `lodash` version `4.17.21`:

```bash
npm run add is-thirteen@1.0.0 lodash@4.17.21
```

### 📦 Install Dependencies

To install all dependencies specified in `output/package.json`:

```bash
npm run install
```

### 🛠️ Resources

#### Requirements and Problem Statement

- <https://gist.github.com/sestinj/86421e27ac7113d993a576464305ca39/>

#### Code Formatting and Linting

- <https://github.com/continuedev/continue/blob/main/biome.json>
- <https://biomejs.dev/internals/language-support/>
- <https://biomejs.dev/reference/vscode/>

#### Understanding Package Lock Determinism

- <https://classic.yarnpkg.com/blog/2017/05/31/determinism/>

#### Example Packages

- <https://www.voidcanvas.com/npm-packages-you-wont-believe-exist/>