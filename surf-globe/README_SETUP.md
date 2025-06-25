# SurfGlobe Three.js - Local Setup Guide

This guide provides step-by-step instructions to set up and run the SurfGlobe project on your local machine.

## Prerequisites

*   **Node.js:** Version 18.x or higher. While Node.js 20.x or 22.x is recommended for the latest Vite versions, this project has been configured with Vite v5.x to ensure compatibility with Node.js v18. You can download Node.js from [https://nodejs.org/](https://nodejs.org/).
*   **npm:** Node Package Manager, which comes bundled with Node.js.

## Setup Instructions

1.  **Clone the Repository (if you haven't already):**
    If you've received the project files directly, you can skip this step. Otherwise, clone the repository using Git:
    ```bash
    git clone <repository_url>
    cd surf-globe
    ```
    If you have the `surf-globe` directory already, navigate into it:
    ```bash
    cd path/to/your/surf-globe
    ```

2.  **Install Dependencies:**
    Open your terminal or command prompt, navigate to the `surf-globe` project directory (if you're not already there), and run the following command to install the necessary project dependencies:
    ```bash
    npm install
    ```
    This command will download all the libraries and packages defined in the `package.json` file, including React, Three.js, and Vite. If you previously had a `node_modules` folder and a `package-lock.json` file from an attempt with an incompatible Vite version, it's a good idea to delete them before running `npm install`:
    ```bash
    # Optional: Only if you had previous installation issues
    rm -rf node_modules
    rm -f package-lock.json
    # Then run install
    npm install
    ```

3.  **Run the Development Server:**
    Once the dependencies are installed, you can start the local development server:
    ```bash
    npm run dev
    ```
    This command uses Vite to build the project and serve it locally.

4.  **View the Application:**
    After the command `npm run dev` executes successfully, it will typically output a message in your terminal indicating where the application is being served. It usually looks something like this:
    ```
      VITE v5.x.x  ready in XXX ms

      ➜  Local:   http://localhost:5173/
      ➜  Network: use --host to expose
      ➜  press h + enter to show help
    ```
    Open your web browser (like Chrome, Firefox, or Edge) and navigate to the **Local URL** provided (e.g., `http://localhost:5173/`).

    You should now see the 3D SurfGlobe application running in your browser! You can interact with it by rotating and zooming the globe.

## Troubleshooting

*   **`crypto.hash is not a function` error:** This was likely due to an incompatible Vite version with your Node.js v18. The project has been updated to use Vite v5.x, which should resolve this. Ensure you have deleted old `node_modules` and `package-lock.json` before running `npm install` again.
*   **Port already in use:** If port `5173` (or whatever port Vite chooses) is already in use, Vite will usually try the next available port. If you need to specify a different port, you can try:
    ```bash
    npm run dev -- --port <your_desired_port_number>
    ```
*   **Other issues:** Make sure you have a stable internet connection when running `npm install` as it downloads packages from the internet. If you encounter other errors, check the terminal output for specific messages, which can often help diagnose the problem.

Enjoy exploring the SurfGlobe!
