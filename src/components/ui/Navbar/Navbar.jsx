import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Link,
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
import React, { useCallback, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { iconComponents, MOVIE_LISTS, TOP_LISTS } from '../../../constants';
import styles from './NavBar.module.scss';

const Icon = ({ iconName, className }) => {
  const IconComponent = iconComponents[iconName];
  return <IconComponent className={className} />;
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const trigger = useScrollTrigger({
    target: window,
  });

  const handleDrawerToggle = useCallback(() => {
    setIsOpen(prevState => !prevState);
  }, []);

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar className={styles.navbar}>
        <div className={styles.navbar__container}>
          <Toolbar>
            <IconButton
              className={styles.navbar__iconButton}
              color="inherit"
              onClick={handleDrawerToggle}
              aria-label="open menu"
              aria-expanded={isOpen}
            >
              <MenuIcon className={styles.navbar__burger} />
            </IconButton>
            <Drawer
              open={isOpen}
              onClose={handleDrawerToggle}
              PaperProps={{
                className: styles.navbar__drawer,
              }}
            >
              <Box className={styles.navbar__menu} onClick={handleDrawerToggle}>
                <List>
                  {TOP_LISTS.map(item => (
                    <Link
                      key={item.title}
                      component={RouterLink}
                      to={item.url}
                      className={styles.navbar__link}
                    >
                      <ListItem
                        className={styles.navbar__listItem}
                        disablePadding
                      >
                        <ListItemButton
                          className={styles.navbar__listItemButton}
                        >
                          <ListItemIcon>
                            <Icon
                              iconName={item.icon}
                              className={styles.navbar__movieItemIcon}
                            />
                          </ListItemIcon>
                          <ListItemText
                            className={styles.navbar__listItemText}
                            primary={item.title}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                <List>
                  {MOVIE_LISTS.map(item => (
                    <Link
                      key={item.title}
                      component={RouterLink}
                      to={item.url}
                      className={styles.navbar__link}
                    >
                      <ListItem
                        className={styles.navbar__listItem}
                        disablePadding
                      >
                        <ListItemButton
                          className={styles.navbar__listItemButton}
                        >
                          <ListItemIcon>
                            <Icon
                              iconName={item.icon}
                              className={styles.navbar__movieItemIcon}
                            />
                          </ListItemIcon>
                          <ListItemText
                            className={styles.navbar__listItemText}
                            primary={item.title}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Box>
            </Drawer>
            <Typography
              variant="h5"
              className={styles.navbar__logo}
              component={RouterLink}
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
