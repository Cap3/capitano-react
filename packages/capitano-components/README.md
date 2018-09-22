# Capitano Components

## Install

```bash
# Yarn
yarn add @cap3/capitano-components

# NPM
npm install @cap3/capitano-components
```

## Usage 
```jsx
import { ThemeProvider, defaultLightTheme, Button, H1 } from '@cap3/capitano-components';

// all capitano-components must reside under the context of a ThemeProvider,
// you can use the defaultLightTheme or any other theme object compatible with
// the CapitanoTheme type
const App = () => (
  <ThemeProvider theme={defaultLightTheme}>
    <H1>Hello World</H1>
    <Button onClick={() => alert("it's alive")}>Click me</Button>
  </ThemeProvider>
);
```

## Playgriund

[capitano-react.netlify.com/](https://capitano-react.netlify.com/)

## Contributing

Thanks for taking the time to contribute!
Issues and pull requests are welcome.

To make it a little easier the following guide will help.

### Project Folder Structure

This project uses yarn workspaces with lerna, to install dependencies rund `yarn install` in the root folder

to build all projects run `yarn build` in the root folder

#### Package overview:

* [capitano-components](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-components)
  - the component collection
  - `/src` source code including snapshot tests
    - `/atoms`
      - basic ui building blocks
    - `/molecules`
      - components built from multiple atoms
    - `/organisms`
      - specialized components offering more complex features
    - `/templates`
      - components in reoccurring patterns combined for easy usage
    - `/pages`
      - complete page layouts often needed
    - `/logic`
      - components without concrete visual implementation offering often needed functionality
    - `/utils`
  - `/test` test setup
* [capitano-theme](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-theme)
  - theming basics, tools and theme type definitions
* [capitano-scripts](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-scripts)
  - scripts and configs
* [capitano-components-styleguide](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-components-styleguide)
  - styleguide generator, based on styleguidist
* [capitano-theme-generator](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-theme-generator)
  - generator tool to visually support theme-building
* [capitano-styleguidist-components](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-styleguidist-components)
  - styleguidist override components to provide theme options

### Reporting a bug

1. Specify the version
2. What was done?
3. What is the expectation?
4. What is the wanted behaviour?
  
### Commit message format

**semantic-release** uses the commit messages to determine the type of changes in the codebase. Following formalized conventions for commit messages, **semantic-release** automatically determines the next [semantic version](https://semver.org) number, generates a changelog and publishes the release.

Tools such as [commitizen](https://github.com/commitizen/cz-cli), [commitlint](https://github.com/marionebl/commitlint) or [semantic-git-commit-cli](https://github.com/JPeer264/node-semantic-git-commit-cli) can be used to help contributors and enforce valid commit messages.

Here is an example of the release type that will be done based on a commit messages:

| Commit message                                                                                                                                                                                   | Release type               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `fix(pencil): stop graphite breaking when too much pressure applied`                                                                                                                             | Patch Release              |
| `feat(pencil): add 'graphiteWidth' option`                                                                                                                                                       | ~~Minor~~ Feature Release  |
| `perf(pencil): remove graphiteWidth option`<br><br>`BREAKING CHANGE: The graphiteWidth option has been removed.`<br>`The default graphite width of 10mm is always used for performance reasons.` | ~~Major~~ Breaking Release |

## License

MIT © [Cap3](https://github.com/cap3)
