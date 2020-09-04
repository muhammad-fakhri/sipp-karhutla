import { makeStyles } from "@material-ui/core/styles";
import { List, ListItem, Icon } from "@material-ui/core";
import styles from "assets/jss/nextjs-material-kit/components/headerLinksStyle.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";
import Link from "next/link";
import React from "react";
import useAuth from '../../context/auth';
const useStyles = makeStyles(styles);

const AuthenticatedMenu = (props) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link href="/dashboard">
          <Button
            color="transparent"
            className={classes.navLink} >
            Dashboard
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText="Patroli"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={[
            <Link href="/patroli/terpadu">
              <a className={classes.dropdownLink}>Patroli Terpadu</a>
            </Link>,
            <Link href="/patroli/mandiri">
              <a className={classes.dropdownLink}>Patroli Mandiri</a>
            </Link>,
            <Link href="/patroli/pencegahan">
              <a className={classes.dropdownLink}>Patroli Pencegahan</a>
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/penugasan">
          <Button
            color="transparent"
            className={classes.navLink} >
            Penugasan
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Link href="/pengguna">
          <Button
            color="transparent"
            className={classes.navLink} >
            Pengguna
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          buttonText="Wilayah Kerja"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          dropdownList={[
            <Link href="/wilayah">
              <a className={classes.dropdownLink}>Wilayah</a>
            </Link>,
            <Link href="/wilayah/balai">
              <a className={classes.dropdownLink}>Balai</a>
            </Link>,
            <Link href="/wilayah/daops">
              <a className={classes.dropdownLink}>Daerah Operasi</a>
            </Link>
          ]}
        />
      </ListItem>
      
      <ListItem className={classes.listItem}>
        <Link href="/hotspot">
          <Button
            color="transparent"
            className={classes.navLink} >
            Hotspot
          </Button>
        </Link>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          className={classes.navLink}
          onClick={props.logout} >
          Logout
        </Button>
      </ListItem>
    </List>
  )
}

const UnauthenticatedMenu = () => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        <Link href="/login">
          <Button
            color="transparent"
            className={classes.navLink} >
            <Icon className={classes.icons}>login</Icon> Login
        </Button>
        </Link>
      </ListItem>
    </List>
  )
}

export default function HeaderLinks(props) {
  const { isAuthenticated, logout } = useAuth();

  if (!props.isLoginPage) {
    return (
      isAuthenticated ?
        <AuthenticatedMenu logout={logout} /> :
        <UnauthenticatedMenu />
    );
  } else {
    return null;
  }
}
