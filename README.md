# SFN Utils - Utilities for AWS Step Functions

## Description

SFN Utils is a meticulously curated collection of utilities and tools designed to optimize and simplify development with AWS Step Functions. This repository is structured as a monorepo, allowing a modular and maintainable organization of different utility packages related to Step Functions.

## Project Structure

The project is organized as a monorepo using Yarn Workspaces and Lerna, enabling efficient management of multiple related packages. All packages are located in the `packages/` directory.

## Prerequisites

- Node.js (LTS version recommended)
- Yarn (package manager)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/aquine-kujaruk/sfn-toolbox.git
```

2. Install dependencies:

```bash
yarn install
```

3. Build the packages:

```bash
yarn build
```

## Usage

Refer to the specific `README.md` file for each package in its respective directory within `packages/`.

## Development

1. Create a new branch for your feature:

```bash
git checkout -b feature/new-feature
```

2. Make your changes following the code conventions

3. Run the tests:

```bash
yarn test
```

4. Format the code:

```bash
yarn format
```

## Contributions

Contributions are welcome. Please follow these steps:

1. Fork the repository
2. Create a branch for your feature (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run the tests and ensure they pass
5. Commit your changes following commit conventions
6. Create a Pull Request

### Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) conventions. Some examples:

- `feat: new feature`
- `fix: bug fix`
- `docs: documentation update`
- `chore: maintenance tasks`

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Authors

- **aquine-kujaruk** - _Initial work_ - [GitHub](https://github.com/aquine-kujaruk)

## Acknowledgments

- To all contributors participating in this project
- To the AWS Step Functions community
