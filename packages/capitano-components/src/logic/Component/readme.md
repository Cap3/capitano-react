a component with integrated state management

```jsx
const { H2, Text, Button } = require("../../atoms");
<Component initialState={{ count: 0 }}>
  {({ setState, state }) => (
    <div>
      <H2>Every app needs a counter!</H2>
      <Button
        square
        onClick={() => setState(state => ({ count: state.count - 1 }))}
      >
        <Text>-</Text>
      </Button>
      <Text> {state.count} </Text>
      <Button
        square
        onClick={() => setState(state => ({ count: state.count + 1 }))}
      >
        <Text>+</Text>
      </Button>
    </div>
  )}
</Component>;
```
