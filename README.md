# Capitano Components

# <div style="color: crimson;">ALPHA DISCLAIMER</div>

<div style="color: crimson;">
All packages in this repository are in an early stage of development and till a solid foundation  
is reached the versioning will not follow semver rules
</div>

## Install

```bash
# Yarn
yarn add @cap3/capitano-components

# NPM
npm install @cap3/capitano-components
```

```jsx
import {
  ThemeProvider,
  defaultLightTheme,
  Button,
  H1,
} from "@cap3/capitano-components";

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

## Contributing

Thanks for taking the time to contribute!
Issues and pull requests are welcome.

To make it a little easier the following guide will help.

### Project Folder Structure

This project uses yarn workspaces with lerna, to install dependencies rund `yarn install` in the root folder

to build all projects run `yarn build` in the root folder

#### Package overview:

- [capitano-components](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-components)
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
- [capitano-theme](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-theme)
  - theming basics, tools and theme type definitions
- [capitano-scripts](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-scripts)
  - scripts and configs
- [capitano-components-styleguide](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-components-styleguide)
  - styleguide generator, based on styleguidist
- [capitano-theme-generator](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-theme-generator)
  - generator tool to visually support theme-building
- [capitano-styleguidist-components](https://github.com/Cap3/capitano-react/tree/master/packages/capitano-styleguidist-components)
  - styleguidist override components to provide theme options

### Reporting a bug

1. Specify the version
2. What was done?
3. What is the expectation?
4. What is the wanted behaviour?

## License

MIT © [Cap3](https://github.com/cap3)
