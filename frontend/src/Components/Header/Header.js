import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import styles from "./Header.scss";

const links = [
  {
    name: "Обо мне",
    to: "/about-me"
  },
  {
    name: "Мой блог",
    to: "/blog"
  },
  {
    name: "Мои программы",
    to: "/programs"
  }
];

const Header = () => {
  return (
    <div className={styles.appBar} color="inherit">
      <AppBar position="static">
        <Toolbar className={styles.toolBar}>
          <nav className={styles.nav}>
            {links.map(link => (
              <Button component={Link} to={link.to} key={link.name} className={styles.link}>
                {link.name}
              </Button>
            ))}
          </nav>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { Header };
