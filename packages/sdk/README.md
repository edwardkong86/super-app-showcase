# NeXTGen SDK

SDK for the [NeXTGen](https://github.com/maybanker/nextgen).

Its purpose is three-fold:

- serve as source of truth for dependencies & dev-dependencies necessary for compatibility with the super-app
- provide utilities to use these dependencies easily in other workspaces & external repositories (`news-mini-app`)
- remove the necessity of keeping `shared` dependencies in-sync manually by automating the process

We use `rnx-kit/align-deps` to align the dependencies. Learn more about it [here](https://microsoft.github.io/rnx-kit/docs/guides/dependency-management).
