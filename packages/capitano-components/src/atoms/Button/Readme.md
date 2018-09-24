```js
const { Grid, EllipsisText } = require("../index");

<Grid columnCount={4} gap={20}>
  <Button>Primary</Button>
  <Button type="secondary">Secondary</Button>
  <Button type="success">Success</Button>
  <Button type="danger">Danger</Button>
  <Button outline>Primary outline</Button>
  <Button outline type="secondary">
    Secondary outline
  </Button>
  <Button outline type="success">
    Success outline
  </Button>
  <Button outline type="danger">
    Danger outline
  </Button>
  <Button disabled>Primary disabled</Button>
  <Button disabled type="secondary">
    Secondary disabled
  </Button>
  <Button disabled outline type="success">
    Success/outline disabled
  </Button>
  <Button disabled outline type="danger">
    Danger/outline disabled
  </Button>
  <Button fixed>
    <EllipsisText>Primary fixed</EllipsisText>
  </Button>
  <Button fixed type="secondary">
    <EllipsisText>Secondary fixed</EllipsisText>
  </Button>
  <Button fixed type="success">
    <EllipsisText>Success fixed</EllipsisText>
  </Button>
  <Button fixed type="danger">
    <EllipsisText>Danger fixed</EllipsisText>
  </Button>
</Grid>;
```
