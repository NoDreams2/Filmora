import MenuIcon from '@mui/icons-material/Menu';
import MovieIcon from '@mui/icons-material/Movie';
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './NavBar.module.scss';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const trigger = useScrollTrigger({
    target: window,
  });

  const handleDrawerToggle = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <Slide appear={false} direction="right" in={!trigger}>
      <AppBar className={styles.appBar}>
        <div className={styles.container}>
          <Toolbar>
            <IconButton
              className={styles.IconButton}
              color="inherit"
              onClick={handleDrawerToggle}
            >
              <MenuIcon className={styles.burger} />
            </IconButton>
            <Drawer
              open={isOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                className: styles.drawerPaper,
              }}
            >
              <Box className={styles.menu} onClick={handleDrawerToggle}>
                <List>
                  <ListItem className={styles.listItem} disablePadding>
                    <ListItemButton className={styles.listItemButton}>
                      <ListItemIcon>
                        <MovieIcon className={styles.movieIcon} />
                      </ListItemIcon>
                      <ListItemText
                        className={styles.listItemText}
                        primary="Фильмы"
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
            <Typography
              variant="h5"
              className={styles.logo}
              component={Link}
              to="/"
            >
              Filmora
            </Typography>
          </Toolbar>
        </div>
      </AppBar>
    </Slide>
  );
}
