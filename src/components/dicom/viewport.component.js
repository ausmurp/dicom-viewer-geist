import { Button, Grid, Input, Popover, useTheme } from '@geist-ui/core';
import { MoreVertical, X } from '@geist-ui/icons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { initExampleImageIdLoader } from './initExampleImageIdLoader';

const Viewport = ({ series, index, scale }) => {
  const theme = useTheme();

  const elRef = useRef(null);
  const viewportRef = useRef(null);
  const initialWindow = useRef(null);

  const [showMenu, setShowMenu] = useState(false);

  const [windowW, setWindowW] = useState(0);
  const [windowC, setWindowC] = useState(0);

  useEffect(() => {
    initExampleImageIdLoader(window.cornerstone);
    window.cornerstone.enable(elRef.current);
    window.cornerstone.loadImage(`example://${series.id}`).then(function (image) {
      window.cornerstone.displayImage(elRef.current, image);
      let viewport = window.cornerstone.getViewport(elRef.current);
      viewportRef.current = viewport;
      initialWindow.current = { width: image.windowWidth, center: image.windowCenter };

      setWindowW(image.windowWidth);
      setWindowC(image.windowCenter);
    });
  }, [series, scale]);

  useEffect(() => {
    if (!viewportRef.current) {
      return;
    }

    viewportRef.current.voi.windowWidth = parseFloat(windowW);
    viewportRef.current.voi.windowCenter = parseFloat(windowC);
    window.cornerstone.setViewport(elRef.current, viewportRef.current);
  }, [windowW, windowC]);

  const handleSetWindowW = useCallback(({ target: { value } }) => {
    setWindowW(value);
  }, []);

  const handleSetWindowC = useCallback(({ target: { value } }) => {
    setWindowC(value);
  }, []);

  const handleInvertWindow = useCallback(() => {
    viewportRef.current.invert = !viewportRef.current.invert;
    window.cornerstone.setViewport(elRef.current, viewportRef.current);
  }, []);

  const handleResetWindow = useCallback(() => {
    viewportRef.current.voi.windowWidth = parseFloat(initialWindow.current.width);
    viewportRef.current.voi.windowCenter = parseFloat(initialWindow.current.center);
    viewportRef.current.invert = false;
    window.cornerstone.setViewport(elRef.current, viewportRef.current);

    setWindowW(initialWindow.current.width);
    setWindowC(initialWindow.current.center);
  }, []);

  const handleToggleMenu = useCallback(
    (open) => () => {
      setShowMenu((prev) => (open != null ? open : !prev));
    },
    []
  );

  const handleMouseDown = useCallback((e) => {
    let lastX = e.pageX;
    let lastY = e.pageY;

    function mouseMoveHandler(e) {
      const deltaX = e.pageX - lastX;
      const deltaY = e.pageY - lastY;
      lastX = e.pageX;
      lastY = e.pageY;

      let viewport = window.cornerstone.getViewport(elRef.current);
      viewport.voi.windowWidth += deltaX / viewport.scale;
      viewport.voi.windowCenter += deltaY / viewport.scale;
      window.cornerstone.setViewport(elRef.current, viewport);

      setWindowW(Number(Number(viewport.voi.windowWidth).toFixed(0)));
      setWindowC(Number(Number(viewport.voi.windowCenter).toFixed(0)));
    }

    function mouseUpHandler() {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }, []);

  const Menu = useCallback(() => {
    return (
      <>
        <Popover.Item title>
          <Grid.Container alignItems="center" alignContent="space-between">
            <Grid xs>Window Level</Grid>
            <Grid>
              <Button iconRight={<X />} auto scale={1 / 3} px={0.4} onClick={handleToggleMenu(false)} />
            </Grid>
          </Grid.Container>
        </Popover.Item>

        <Popover.Item>
          <Input
            style={{ width: '100%', maxWidth: '140px' }}
            label={<span style={{ width: '40px' }}>Width</span>}
            id="ww"
            htmlType="number"
            value={windowW}
            onChange={handleSetWindowW}
          />
        </Popover.Item>
        <Popover.Item>
          <Input
            style={{ width: '100%', maxWidth: '140px' }}
            label={<span style={{ width: '40px' }}>Center</span>}
            id="wc"
            htmlType="number"
            value={windowC}
            onChange={handleSetWindowC}
          />
        </Popover.Item>
        <Popover.Option>
          <Grid.Container gap={1} justify="flex-end">
            <Grid>
              <Button auto scale={2 / 3} onClick={handleInvertWindow}>
                Invert
              </Button>
            </Grid>
            <Grid>
              <Button auto scale={2 / 3} onClick={handleResetWindow}>
                Reset
              </Button>
            </Grid>
          </Grid.Container>
        </Popover.Option>
      </>
    );
  }, [handleInvertWindow, handleResetWindow, handleSetWindowC, handleSetWindowW, handleToggleMenu, windowC, windowW]);

  return (
    <>
      <div
        style={{
          width: '100%',
          minHeight: '200px',
          borderCollapse: 'collapse',
          boxSizing: 'border-box',
          background: theme.palette.background,
          flex: 1,
          position: 'relative'
        }}
      >
        <div ref={elRef} id="dicomImage" style={{ width: '100%', height: '100%' }} onMouseDown={handleMouseDown}></div>
        <div style={{ position: 'absolute', top: '12px', left: '8px' }}>
          <Popover
            visible={showMenu}
            onVisibleChange={setShowMenu}
            content={Menu}
            placement="bottomStart"
            disableItemsAutoClose
            hideArrow
          >
            <MoreVertical />
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Viewport;
