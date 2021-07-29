import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Avatar from "@material-ui/core/Avatar";

import styles from "styles/jss/nextjs-material-kit/pages/landingPageSections/teamStyle.js";

const useStyles = makeStyles(styles);

const getAccomodations = () => [
  {
    "idhospedagem": 3,
    "id_hospede_resp": 5,
    "num_quarto": 2,
    "checkin": "2021-05-28T00:00:00.000Z",
    "checkout": null,
    "valor_total_pago": null,
    "data_pagamento": null
  },
  {
    "idhospedagem": 1,
    "id_hospede_resp": 8,
    "num_quarto": 1,
    "checkin": "2021-07-01T00:00:00.000Z",
    "checkout": "2021-08-01T00:00:00.000Z",
    "valor_total_pago": null,
    "data_pagamento": null
  }
];

export default function HospedagensSection({ setCurrentAccomodation }) {

  const [accommodations, setAccommodations] = React.useState([]);

  React.useEffect(() => {
    setAccommodations(getAccomodations());
    return;
    fetch(
      'https://banco-de-dados-dois.herokuapp.com/hospedagens',
    ).then(data => {
      console.log(data)
    }).catch(error => {
      console.log(error)
    })
  }, []);

  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Hospedagens Hotel</h2>
      <div>
        <GridContainer>
          {accommodations.map(accommodation => (
            <GridItem key={accommodation.idhospedagem} xs={12} sm={12} md={4}>
              <Card plain>
                <GridItem xs={12} sm={12} md={6} style={{ marginTop: 16 }} className={classes.itemGrid}>
                  <img
                    src="/img/icons/bed.svg"
                    alt="bed"
                    className={imageClasses}
                  />
                </GridItem>
                <h4 className={classes.cardTitle}>
                  Quarto K0{accommodation.num_quarto}
                  <br />
                  <small className={classes.smallTitle}>Quarto Comum</small>
                </h4>
                <CardBody>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <Avatar alt="Remy Sharp" src={`https://source.unsplash.com/80x80/daily?${accommodation.id_hospede_resp}`} />
                    <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 12 }}>
                      <span>Hóspede Responsável</span>
                      <span style={{ fontWeight: 700 }}>Hóspede {accommodation.id_hospede_resp}</span>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className={classes.justifyCenter}>
                  <Button
                    color="primary"
                    className={classes.margin5}
                    onClick={() => setCurrentAccomodation(accommodation)}
                  >
                    Ver Hospedagem
                  </Button>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
      </div>
    </div>
  );
}
