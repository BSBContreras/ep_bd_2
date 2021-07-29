import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
import VerifiedUser from "@material-ui/icons/VerifiedUser";
import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import InfoArea from "components/InfoArea/InfoArea.js";

import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "styles/jss/nextjs-material-kit/pages/hospedesSections/hospedagemStyle.js";

const useStyles = makeStyles(styles);

export default function Hospedagens() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Hospedagens Ativas do Hotel</h2>
          <h5 className={classes.description}>
            Será exibido as hopedagens ativas do KASSINÃO
          </h5>
        </GridItem>
      </GridContainer>
      <div>
        {[0, 1, 2].map(key => (
          <Card key={key} plain>
            <CardBody>
              <GridContainer>
                <GridItem md={2}>
                  <img 
                    src="/img/icons/roomIcon.svg" 
                    alt="bed"
                  />
                </GridItem>
                <GridItem md={10}>
                  <p className={classes.description}>
                    You can write here details about one of your team members. You
                    can give more details about what they do. Feel free to add
                    some <a href="#pablo">links</a> for people to be able to
                    follow them outside the site.
                  </p>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
