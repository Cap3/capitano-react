Fallback loader based on cyclone emoji:

```jsx
const styled = require("react-emotion").default;

const EmojiIcon = styled("span")({
  fontSize: 40,
});

<Spinner>
  <EmojiIcon role="img" aria-label="loading indicator, spinning cyclone">
    🌀
  </EmojiIcon>
</Spinner>;
```
