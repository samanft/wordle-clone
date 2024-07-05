# Wordle Clone

A Vue.js-based clone of the popular word-guessing game, Wordle. This project aims to replicate the fun and challenge of the original game with a customizable difficulty setting, allowing players to adjust the game to their liking.

## Features

- **Dynamic Word Length**: Customize the length of the word to guess, making the game easier or harder.
- **Adjustable Attempts**: Set the maximum number of attempts to guess the word.
- **Difficulty Levels**: Choose a difficulty level to change the game's challenge. Options include Easy, Medium (green hints turn into yellow), and Hard (green hints only).
- **Responsive Design**: Play the game on any device, thanks to a mobile-friendly design.
- **Real-time Feedback**: As you guess, each letter provides immediate feedback indicating if it's in the correct position, present in the word but in the wrong position, or not in the word at all.

## Components

- **Game**: The main component that orchestrates the game logic, including fetching words, handling guesses, and determining game outcomes.
- **Row**: Represents a single attempt in the game, allowing the player to input their guess and displaying feedback for each letter. It handles input focus, backspace for correction, and enter to submit guesses.
- **Options**: Allows players to customize their game settings, including difficulty level, maximum attempts, and word length.

## Setup

Play the game online at [Kwon's Wordle](https://kwons-wordle.netlify.app/).

## Technologies Used

- **Vue.js**: A progressive JavaScript framework used for building the user interface.
- **CSS**: For styling the components and ensuring a responsive design.

## Project Structure

- `Game.vue`: The main component that contains the game logic and orchestrates the game flow.
- `Row.vue`: A component used for each guess attempt, responsible for displaying the input fields and feedback for each guess. It includes logic for handling user input, providing real-time feedback, and managing focus.
- `Options.vue`: A component that allows players to customize their game settings, such as difficulty level, maximum attempts, and word length.

## Contributing

Contributions are welcome! If you have ideas for new features or improvements, feel free to fork the repository and submit a pull request.

## License

This project is open-source and available under the MIT License.