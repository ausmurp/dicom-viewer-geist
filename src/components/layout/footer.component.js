import { Page, Grid, Text } from '@geist-ui/core';

const Footer = () => {
  return (
    <Page.Footer padding={1}>
      <Grid.Container justify="center" alignItems="center">
        <Text small>Made with ❤️ by Thumbyte</Text>
      </Grid.Container>
    </Page.Footer>
  );
};

export default Footer;
