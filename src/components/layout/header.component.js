import { Page, Grid, Button, Text } from '@geist-ui/core';
import * as Icons from '@geist-ui/icons';

const Header = ({ theme, onToggleTheme }) => {
  return (
    <Page.Header padding={1}>
      <Grid.Container justify="space-between" alignItems="center">
        <Grid>
          <Grid.Container alignItems="center">
            <Icons.Grid />
            <Text span ml={1}>
              Window Level
            </Text>
          </Grid.Container>
        </Grid>
        <Grid>
          <Button
            aria-label="toggle theme"
            auto
            px={0.6}
            icon={theme === 'system' ? <Icons.Display /> : theme === 'dark' ? <Icons.Moon /> : <Icons.Sun />}
            onClick={onToggleTheme}
          />
        </Grid>
      </Grid.Container>
    </Page.Header>
  );
};

export default Header;
