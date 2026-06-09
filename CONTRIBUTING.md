# MantleGuard Development Strategy

## Branching Model

To maintain a high-fidelity and stable codebase, follow this branch strategy:

- **`main`**: Production-ready code. Never push directly to this branch.
- **`develop`**: Integration branch for features.
- **`feat/*`**: Feature-specific branches (e.g., `feat/wallet`, `feat/gas-ui`).

## Workflow

1. Create a `feat/` branch from `develop`.
2. Implement your changes.
3. Open a Pull Request into `develop`.
4. Once tested and reviewed, `develop` will be merged into `main` for release.

## Commit Guidelines

We use conventional commits. Ensure your commit messages follow the `type: description` format.
