import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";

import styles from "styles/jss/nextjs-material-kit/pages/hospedesPage.js";

// Sections for this page
import HospedagensSection from "pages-sections/HospedesPage-Sections/HospedagensSection.js";
import ModalSection from "pages-sections/HospedesPage-Sections/ModalSection.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);

export default function hospedagens(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [currentAccomodation, setCurrentAccomodation] = React.useState({});
  console.log(currentAccomodation)
  return (
    <div>
      <Header
        brand="KASSINÃO"
        rightLinks={<HeaderLinks />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 400,
          color: "white",
        }}
        {...rest}
      />
      <Parallax image="/img/nextjs_header.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>KASSINÃO</h1>
                <h2 className={classes.hotel}>Hotel</h2>
                <h3 className={classes.subtitle}>
                  Maior Hotel-Cassino da América Latina
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <HospedagensSection setCurrentAccomodation={setCurrentAccomodation} />
          <ModalSection 
            setCurrentAccomodation={setCurrentAccomodation}
            currentAccomodation={currentAccomodation} 
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
