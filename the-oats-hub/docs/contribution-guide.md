# Contribution & GitHub Standards Guide

We follow standard Git Flow and strict PR conventions.

## 1. Branch Strategy

- `main`: Production-ready code. Commits here trigger production deployments.
- `develop`: Integration branch for features. Commits here trigger staging deployments.
- `feature/<ticket-id>-<short-description>`: New features. (e.g., `feature/OAT-123-add-cart`)
- `bugfix/<ticket-id>-<short-description>`: Bug fixes.
- `hotfix/<ticket-id>-<short-description>`: Critical fixes branched from `main`.

## 2. Commit Conventions

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that do not affect the meaning of the code (white-space, formatting)
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools

*Example*: `feat(cart): add optimistic updates to cart quantities`

## 3. Pull Request (PR) Conventions

1. **Title**: Must follow conventional commits (e.g., `feat: integrate Razorpay`).
2. **Size**: Keep PRs small and focused.
3. **Template**: (Use the standard GitHub PR template below).
4. **Review**: At least 1 approval required before merging.

### PR Template

```markdown
## Description
Provide a brief description of the changes. Closes #<Issue Number>.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing Performed
Describe how you tested these changes (e.g., local manual testing, ran unit tests).
```

## 4. Labels

Use GitHub labels to categorize issues and PRs:
- `backend`, `frontend`
- `enhancement`, `bug`, `documentation`
- `p1-critical`, `p2-high`, `p3-medium`, `p4-low`

## 5. Release Strategy

Releases are tagged using Semantic Versioning (`vMAJOR.MINOR.PATCH`).
When releasing, a GitHub Release is drafted from `main` summarizing the `feat` and `fix` commits.
