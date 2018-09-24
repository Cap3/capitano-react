**Simple Input**

```js
const { Grid } = require("../../atoms");

<Grid columnCount={4} gap={20}>
  <FormInput />
  <FormInput label="First name" />
  <FormInput
    label="Last name"
    invalid={false}
    validationMessage="name available"
  />
  <FormInput label="Email" invalid validationMessage="invalid email adress" />
  <FormInput label="first name" labelPosition="top" />
  <FormInput
    label="Adress"
    invalid={false}
    validationMessage="adress found"
    labelPosition="top"
  />
  <FormInput
    placeholder="placeholder"
    validationIcon
    validated
    label="First name"
    labelPosition="top"
    invalid={false}
  />
  <FormInput
    placeholder="placeholder"
    label="First name"
    invalid={false}
    validationIcon
    validated
    defaultValue="First name"
  />
  <FormInput
    placeholder="placeholder"
    label="First name"
    invalid
    validationIcon
    validated
    defaultValue="First name"
  />
  <FormInput
    placeholder="placeholder"
    validationIcon
    validated
    invalid
    defaultValue="First name"
  />
</Grid>;
```

**Outlined Input**

```js
const { Grid } = require("../../atoms");

<Grid columnCount={4} gap={20}>
  <FormInput outlined={true} />
  <FormInput label="First name" outlined={true} />
  <FormInput
    label="Last name"
    invalid={false}
    validationMessage="name available"
    outlined={true}
  />
  <FormInput
    label="Email"
    invalid
    validationMessage="invalid email adress"
    outlined={true}
  />
  <FormInput label="First name" labelPosition="top" outlined={true} />
  <FormInput
    label="Adress"
    invalid={false}
    validationMessage="adress found"
    labelPosition="top"
    outlined={true}
  />
  <FormInput
    placeholder="placeholder"
    label="First name"
    labelPosition="top"
    invalid={false}
    outlined={true}
    validationIcon
    validated
  />
  <FormInput
    placeholder="placeholder"
    label="First name"
    invalid={false}
    validationIcon
    validated
    defaultValue="First name"
    outlined={true}
  />
  <FormInput
    placeholder="placeholder"
    label="First name"
    invalid
    defaultValue="First name"
    outlined={true}
    validationIcon
    validated
  />
  <FormInput
    placeholder="placeholder"
    invalid
    defaultValue="First name"
    outlined={true}
    validationIcon
    validated
  />
</Grid>;
```
