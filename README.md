# Visage

**Visage** is a desktop application developed with Tauri, TypeScript, and Tailwind CSS, designed to simulate IP camera connections. This tool allows developers to test and interact with IP video streams in a controlled environment.

## Features

- **IP Camera Simulation**: Create and manage virtual instances of IP cameras using photos, videos, or even other types of cameras for testing and development.
- **Intuitive Interface**: Use a modern and responsive interface built with Tailwind CSS.
- **Optimized Performance**: Leverage Tauri's efficiency for lightweight and fast desktop applications.

## Prerequisites

Before starting, make sure you have the following tools installed on your system:

- **Node.js**: JavaScript runtime environment. [Install Node.js](https://nodejs.org/)
- **Rust**: Required to compile Tauri's backend. [Install Rust](https://www.rust-lang.org/tools/install)
- **Python**: Required to build run backend API. [Install Python](https://www.python.org/downloads/)
- **Tauri CLI**: Tauri's command-line interface. Install globally with:

    ```bash
    cargo install tauri-cli
    ```

## Installation

Follow the steps below to set up the project on your local machine:

1. **Clone the repository**:

     ```bash
     git clone https://github.com/thepokenik/IPCamMonitor.git
     ```

2. **Navigate to the project directory**:

     ```bash
     cd IPCamMonitor
     ```

3. **Install Client dependencies**:

     ```bash
     npm install
     ```

     *Note*: You can choose to use `yarn` or `pnpm` as per your preference.

4. **Install Server dependencies**:

    ```bash
     pip install -r api/requirements.txt
     ```

## Development

To start the development environment with live reloading:

```bash
npm run tauri dev
```

```bash
python api/main.py
```

This will launch the application in development mode, allowing you to see changes in real-time.

## Build

To generate production executables:

```bash
npm run tauri build
```

The generated files will be available in the `src-tauri/target/release/bundle` directory. For more details on distribution across different platforms, refer to the [official Tauri documentation](https://tauri.app/v1/guides/building/).
