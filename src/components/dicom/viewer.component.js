import { useCallback, useMemo, useState } from 'react';
import { Button, Card, Grid, Input, Text, useTheme } from '@geist-ui/core';
import Viewport from './viewport.component';

const Viewer = ({ series, onLoadInstance }) => {
  const theme = useTheme();
  const [gridSize, setGridSize] = useState(1);
  const [selected, setSelected] = useState(series[0]);

  const handleSelectSeries = useCallback(
    (item) => (event) => {
      setSelected(item);
    },
    []
  );

  const handleSetGridSize = useCallback(({ target: { value } }) => {
    // Cap between 1 and 4
    setGridSize(Math.max(Math.min(value, 4), 1));
  }, []);

  const grids = useMemo(() => {
    var foo = [];

    for (var i = 0; i < gridSize; i++) {
      foo.push(i);
    }
    return foo;
  }, [gridSize]);

  return (
    <div style={{ width: '100%', maxHeight: '60vh' }}>
      <Grid.Container gap={1} height="100%">
        <Grid xs={24}>
          <Card width="100%">
            <Grid.Container gap={1} alignItems="center">
              <Grid>
                <Input
                  htmlType="number"
                  width="150px"
                  label="grid size"
                  value={gridSize}
                  onChange={handleSetGridSize}
                />
              </Grid>
              <Grid>
                <Button scale={4 / 5}>another control</Button>
              </Grid>
              <Grid>
                <Button scale={4 / 5}>and another</Button>
              </Grid>
            </Grid.Container>
          </Card>
        </Grid>
        <Grid xs={24} height="100%">
          <Grid.Container gap={1}>
            {/** left panel of image reel */}
            <Grid xs height="100%">
              <Card width="100%">
                <Grid.Container direction="column" gap={1}>
                  {series.map((item) => (
                    <Grid key={item.id}>
                      <Card hoverable onClick={handleSelectSeries(item)}>
                        <Grid.Container>
                          <Grid>
                            <img src="https://via.placeholder.com/150x150" alt={item.description} />
                          </Grid>
                        </Grid.Container>
                        <Card.Footer style={{ minHeight: 0 }}>
                          <Text small my={0}>
                            {item.description}
                          </Text>
                        </Card.Footer>
                      </Card>
                    </Grid>
                  ))}
                </Grid.Container>
              </Card>
            </Grid>
            {/** grid of images */}
            <Grid xs={16}>
              <div
                style={{
                  width: '100%',
                  minHeight: '400px',
                  borderCollapse: 'collapse',
                  boxSizing: 'border-box',
                  border: `1px solid ${theme.palette.border}`,
                  borderRadius: theme.layout.radius,
                  overflow: 'hidden',
                  background: theme.palette.border
                }}
              >
                <Grid.Container height="100%">
                  {grids.map((grid) => (
                    <Grid key={grid} xs={gridSize === 1 ? 24 : 12}>
                      <Viewport series={selected} index={grid} scale={1 / gridSize} />
                    </Grid>
                  ))}
                </Grid.Container>
              </div>
            </Grid>
            {/** right panel */}
            <Grid xs>
              <Card width="100%">panel</Card>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </div>
  );
};

export default Viewer;
