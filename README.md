# playwright-browserstack

### This is a boilerplate project for playwright in integration with browserstack and typescript.

1. You have to set below environment variables before starting

```
BROWSERSTACK_USERNAME=""
BROWSERSTACK_ACCESS_KEY=""
```

1. Clone the repo
2. Run `yarn install`
3. Run `yarn local` to run all projects and specs locally
4. Run `yarn bstack` to run all projects and specs in browserstack
5. Run `yarn bstack:local` to run all projects and specs in browserstack and browesrstack local.

- you can pass 
  - `--project chrome` to run the tests only in chrome
  - `--project safari` to run the tests only in safari
  - `--project firefox` to run the tests only in firefox
  - `--project edge` to run the tests only in edge
  - `--project iphone` to run the tests only in safari with iPhone 14 pro viewport
  - `--project android` to run the tests only in chrome in pixel 7 viewport

This project is a boilerplate for running playwright tests in browserstack.

1. You can run the tests in browserstack and also locally with same playwright config
2. You can run the tests with browserstack local binary
3. You can run the tests in serial mode
4. You can run the api tests as usual
5. Different examples of using fixtures and page objects in spec file

