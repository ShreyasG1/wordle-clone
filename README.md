# Wordle Clone

A simple Wordle clone built using **Vite**, **React**, and **TypeScript**.

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Technologies Used](#technologies-used)

## Overview

This project is a clone of the popular word game **Wordle**. The game provides the player with six attempts to guess a five-letter word. After each guess, the color of the tiles will change to show how close the guess was to the word.

## Features

-   **Daily Challenge**: A new word is available every day.
-   **Responsive Design**: Optimized for both desktop and mobile devices.
-   **Keyboard Input**: Use the on-screen keyboard or your physical keyboard.
-   **State Management**: Save and track your progress locally.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/wordle-clone.git
    cd wordle-clone
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm run dev
    ```

4. **Open the app in your browser**:
    - The app will typically run at `http://localhost:5173`.

## Usage

To play the game:

1. Start typing your guess.
2. Press `Enter` to submit your guess.
3. The tiles will change color to indicate how close your guess is:
    - **Green**: Correct letter in the correct position.
    - **Yellow**: Correct letter in the wrong position.
    - **Gray**: Incorrect letter.

You have 6 attempts to guess the word.

## Technologies Used

-   **Vite**: For fast and efficient development and build tooling.
-   **React**: For building the user interface.
-   **TypeScript**: For static type checking and better code quality.
