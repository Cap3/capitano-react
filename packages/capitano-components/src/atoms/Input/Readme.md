**Simple Input**

```js
const { Grid } = require('../index');

<Grid columnCount={4} gap={20}>
  <Input />
  <Input />
  <Input isValid={true} validationMessage="name available" />
  <Input isValid={false} validationMessage="invalid email adress" />
  <Input />
  <Input isValid={true} validationMessage="adress found" />
  <Input placeholder="placeholder" isValid={true} />
  <Input placeholder="placeholder" isValid={true} defaultValue="First name" />
  <Input placeholder="placeholder" isValid={false} defaultValue="First name" />
  <Input placeholder="placeholder" isValid={false} defaultValue="First name" />
</Grid>;
```

**Outlined Input**

```js
const { Grid } = require('../index');

<Grid columnCount={4} gap={20}>
  <Input outlined={true} />
  <Input outlined={true} />
  <Input isValid={true} validationMessage="name available" outlined={true} />
  <Input isValid={false} validationMessage="invalid email adress" outlined={true} />
  <Input outlined={true} />
  <Input isValid={true} validationMessage="adress found" outlined={true} />
  <Input placeholder="placeholder" isValid={true} outlined={true} />
  <Input placeholder="placeholder" isValid={true} defaultValue="First name" outlined={true} />
  <Input placeholder="placeholder" isValid={false} defaultValue="First name" outlined={true} />
  <Input placeholder="placeholder" isValid={false} defaultValue="First name" outlined={true} />
</Grid>;
```
