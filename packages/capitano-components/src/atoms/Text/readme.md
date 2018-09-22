```jsx
const { Text, MonoText, EllipsisText } = require('./Text');
<>
  <div>
    <Text>normal base Text</Text>
  </div>
  <div>
    <MonoText>normal monospace Text</MonoText>
  </div>
  <div style={{ width: 160 }}>
    <EllipsisText>base text with ellipsis on text overflow</EllipsisText>
  </div>
</>;
```
