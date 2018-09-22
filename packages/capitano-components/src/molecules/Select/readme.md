A Select box with autocomplete on typing

```jsx
const styled = require("react-emotion").default;
const { Icons } = require("../../atoms");

const items = [
  { value: "apple" },
  { value: "pear" },
  { value: "orange" },
  { value: "grape" },
  { value: "banana" },
];

const onChange = selection => alert(`You selected ${selection.value}`);
const itemToString = item => (item ? item.value : "");

const Item = styled("div")({
  display: "grid",
  gridTemplateColumns: "20px 1fr",
  gridColumnGap: "8px",
});

const renderItem = item => (
  <Item>
    <Icons.Bell size={14} />
    <div>{itemToString(item)}</div>
  </Item>
);

<Select
  filterOnType
  textInput
  fixed
  outlined
  label="Select a fruit"
  placeholder="start typing..."
  {...{ items, onChange, itemToString, renderItem }}
/>;
```
