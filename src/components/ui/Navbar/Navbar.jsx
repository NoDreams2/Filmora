import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
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
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { iconComponents, MOVIE_LISTS, TOP_LISTS } from '../../../constans';
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
                  {TOP_LISTS.map(item => (
                    <Link
                      key={item.title}
                      component={RouterLink}
                      to={item.url}
                      className={styles.link}
                    >
                      <ListItem className={styles.listItem} disablePadding>
                        <ListItemButton className={styles.listItemButton}>
                          <ListItemIcon>
                            <Icon
                              iconName={item.icon}
                              className={styles.movieIcon}
                            />
                          </ListItemIcon>
                          <ListItemText
                            className={styles.listItemText}
                            primary={item.title}
                          />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  ))}
                </List>
                <div className={styles.line}></div>
                <List>
                  {MOVIE_LISTS.map(item => (
                    <Link
                      key={item.title}
                      component={RouterLink}
                      to={item.url}
                      className={styles.link}
                    >
                      <ListItem className={styles.listItem} disablePadding>
                        <ListItemButton className={styles.listItemButton}>
                          <ListItemIcon>
                            <Icon
                              iconName={item.icon}
                              className={styles.movieIcon}
                            />
                          </ListItemIcon>
                          <ListItemText
                            className={styles.listItemText}
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
              className={styles.logo}
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
