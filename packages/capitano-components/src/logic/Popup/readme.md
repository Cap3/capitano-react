Popup Component based on popper.js

rendered on the left side

```js
const { Text, Icons } = require('../../atoms');
const { EmotionThemeConsumer } = require('@cap3/capitano-theme/lib/EmotionThemeConsumer');
const styled = require('react-emotion').default;

const Target = styled('div')(({ theme }) => ({
  width: '32px',
  height: '32px',
  backgroundColor: theme.colors.primary.A400,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const PopupContainer = styled('div')(({ theme }) => ({
  width: '100px',
  height: '100px',
  padding: 8,
  background: theme.colors.layout.base,
  border: `solid 1px ${theme.colors.layout.M30}`,
  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 10px',
}));

const Boundary = styled('div')({
  width: '32px',
});
<EmotionThemeConsumer>
  {theme => (
    <Boundary>
      <Popup
        modifiers={{ keepTogether: { enabled: true } }}
        target={({ ref, toggle }) => (
          <Target innerRef={ref} onClick={toggle}>
            <Icons.Menu color={theme.colors.textOnPrimary} size={40} />
          </Target>
        )}
        popup={({ ref, ...popperProps }) => (
          <PopupContainer {...popperProps} innerRef={ref}>
            <Text>POPUP</Text>
          </PopupContainer>
        )}
      />
    </Boundary>
  )}
</EmotionThemeConsumer>;
```

rendered on the right side with wrapping scroll container

```js
const { Text, Icons } = require('../../atoms');
const { EmotionThemeConsumer } = require('@cap3/capitano-theme/lib/EmotionThemeConsumer');
const styled = require('react-emotion').default;

const Target = styled('div')(({ theme }) => ({
  width: '32px',
  height: '32px',
  backgroundColor: theme.colors.primary.A400,
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '32px',
  alignSelf: 'flex-end',
}));
const PopupContainer = styled('div')(({ theme }) => ({
  width: '100px',
  height: '100px',
  padding: 8,
  background: theme.colors.layout.base,
  border: `solid 1px ${theme.colors.layout.M30}`,
  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 10px',
}));

const ExampleScrollContainer = styled('div')({
  width: '100%',
  height: '170px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
});

<EmotionThemeConsumer>
  {theme => (
    <ExampleScrollContainer>
      <Popup
        target={({ ref, toggle }) => (
          <Target innerRef={ref} onClick={toggle}>
            <Icons.Menu color={theme.colors.textOnPrimary} size={40} />
          </Target>
        )}
        popup={({ ref, ...popperProps }) => (
          <PopupContainer {...popperProps} innerRef={ref}>
            <Text>POPUP</Text>
          </PopupContainer>
        )}
      />
    </ExampleScrollContainer>
  )}
</EmotionThemeConsumer>;
```
