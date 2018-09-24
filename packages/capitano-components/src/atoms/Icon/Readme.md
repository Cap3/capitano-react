As default icon set the material design icons from react-icons are used

```js
const { Grid, EllipsisText, Icons } = require("../index");
const styled = require("react-emotion").default;
const {
  EmotionThemeConsumer,
} = require("@cap3/capitano-theme/lib/EmotionThemeConsumer");

const iconKeys = [
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "BellOutline",
  "Bell",
  "Menu",
  "Check",
  "Close",
  "Download",
  "Edit",
  "Folder",
  "Home",
  "Image",
  "Info",
  "InfoOutline",
  "Mail",
  "MailOutline",
  "Lock",
  "LockOpen",
  "LocationMarker",
  "Power",
  "Copy",
  "Phone",
  "Loop",
  "Refresh",
  "Search",
  "Settings",
  "StarHalf",
  "StarOutline",
  "Star",
  "Delete",
  "Upload",
  "Person",
  "PersonOutline",
  "Warning",
];

const IconWrapper = styled("div")(({ theme }) => ({
  overflow: "hidden",
}));

<EmotionThemeConsumer>
  {theme => (
    <Grid columnCount={8} gap={20}>
      {iconKeys.map(key => {
        const Icon = Icons[key];

        return (
          <IconWrapper key={key}>
            <Icon size={40} color={theme.colors.textOnBackground.base} />
            <EllipsisText>{key}</EllipsisText>
          </IconWrapper>
        );
      })}
    </Grid>
  )}
</EmotionThemeConsumer>;
```
