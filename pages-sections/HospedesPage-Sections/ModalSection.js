import React from "react";
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";


import styles from "styles/jss/nextjs-material-kit/pages/componentsSections/javascriptStyles.js";
import { Divider } from "@material-ui/core";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

const getAccomodation = () => ({
  "idhospedagem": 3,
  "id_hospede_resp": 5,
  "num_quarto": 2,
  "checkin": "2021-05-28T00:00:00.000Z",
  "checkout": null,
  "valor_total_pago": null,
  "data_pagamento": null,
  "hospedes": [
    {
      "idhospede": 6,
      "nome": "CONI",
      "cpf": "34448472",
      "nasc": "1992-06-15T00:00:00.000Z",
      "sexo": "M",
      "celular": null,
      "id_hospedagem": 3,
      "id_hospede": 6
    },
    {
      "idhospede": 7,
      "nome": "JEAN",
      "cpf": "95423472",
      "nasc": "1993-10-05T00:00:00.000Z",
      "sexo": "M",
      "celular": null,
      "id_hospedagem": 3,
      "id_hospede": 7
    }
  ]
});

const getCheckout = () => ({
  "idhospedagem": 3,
  "id_hospede_resp": 5,
  "num_quarto": 2,
  "checkin": "2021-05-28T00:00:00.000Z",
  "checkout": null,
  "valor_total_pago": null,
  "data_pagamento": null,
  "qtd_pratos": 3,
  "valor_total_comida": "75.00",
  "valor_total_estadia": "4960.00",
  "total_a_pagar": "5035.00"
})

const calculateAge = date => { 
  const birthday = new Date(date);
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const calculateDays = date => { 
  const checkin = new Date(date);
  var dateDifMs = Date.now() - checkin.getTime();
  var daysDate = new Date(dateDifMs);
  return Math.round(daysDate / (1000 * 3600 * 24));
}

const initialAccommodation = {
  hospedeResponsavel: {},
  hospedes: []
};

export default function ModalSection({ currentAccomodation, setCurrentAccomodation }) {

  const [accommodation, setAccommodation] = React.useState(initialAccommodation);
  const [loading, setLoading] = React.useState(false);
  const [checkout, setCheckout] = React.useState({});

  const clearAccomodation = () => {
    setAccommodation({...initialAccommodation})
  }

  const handleCloseModal = () => {
    setCurrentAccomodation({});
    clearAccomodation();
    setCheckout({});
    setClassicModal(false);
  }

  const handlePayment = () => {
    handleCloseModal();
  }
 
  const handleCheckout = () => {
    setLoading(true);
    fetch(
      `https://banco-de-dados-dois.herokuapp.com/checkout/${currentAccomodation.idhospedagem}`
    ).then(async (response) => {
      const data = await response.json();
      setCheckout(data);
    }).catch(error => {
      console.log(error)
    });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  React.useEffect(() => { 
    if(currentAccomodation && currentAccomodation.idhospedagem) {
      fetch(
        `https://banco-de-dados-dois.herokuapp.com/hospedagens/${currentAccomodation.idhospedagem}/hospedes`
      ).then(async (response) => {
        const data = await response.json();
        setAccommodation(data);
      }).catch(error => {
        console.log(error)
      });
      setClassicModal(true); 
    }
  }, [currentAccomodation]);

  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);
  return (
    <>
    <Dialog
      classes={{
        root: classes.center,
        paper: classes.modal,
      }}
      open={classicModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogTitle
        id="classic-modal-slide-title"
        disableTypography
        className={classes.modalHeader}
      >
        <IconButton
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={handleCloseModal}
        >
          <Close className={classes.modalClose} />
        </IconButton>
        <h4 className={classes.modalTitle}>Detalhes da Hospedagem, Quarto K0{accommodation.num_quarto}</h4>
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <Grid container>
          <Grid item sm={6}>
            <p style={{ fontSize: 18 }}>
              Checkin feito à 
              <span
                style={{ fontWeight: 700, color: '#ED960B'}}
              >
                {` ${calculateDays(accommodation.checkin)} `}
              </span> 
              dias atás
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left', width: '100%' }}>
              {
                accommodation.hospedeResponsavel.nome &&
                <Avatar alt="Remy Sharp" src={`https://source.unsplash.com/80x80/daily?${accommodation.hospedeResponsavel.nome}`} />
              }
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 12 }}>
                <span>Hóspede Responsável</span>
                <span style={{ fontWeight: 700 }}>Hóspede {accommodation.hospedeResponsavel.nome}</span>
              </div>
            </div>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 24 }}>
                <CircularProgress />
              </div>
            ) : checkout.idhospedagem && (
                <div style={{ width: '100%', marginTop: 24, marginRight: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 4 }}>
                    <span>Restaurante</span>
                    <span style={{ fontWeight: 700 }}>R$ {checkout.valor_total_comida.replace('.', ',')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 4 }}>
                    <span>Estadia</span>
                    <span style={{ fontWeight: 700 }}>R$ {checkout.valor_total_estadia.replace('.', ',')}</span>
                  </div>
                  <Divider />
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 4 }}>
                    <span>Total</span>
                    <span style={{ fontWeight: 700 }}>R$ {checkout.total_a_pagar.replace('.', ',')}</span>
                  </div>
                </div>
              )
            }
          </Grid>
          <Grid item sm={6}>
            <h5 className={classes.modalTitle}>Hóspedes</h5>
            <List className={classes.root}>
              {accommodation.hospedes.map(guest => (
                <ListItem key={guest.idhospede} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={guest.nome} src={`https://source.unsplash.com/80x80/daily?${guest.nome}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${guest.nome}, ${calculateAge(guest.nasc)}`}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          CPF
                        </Typography>
                        {` — ${guest.cpf}`}                   
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        {checkout.idhospedagem && !loading ? (
          <Button 
            onClick={handlePayment}
            color="success" 
          >
            Fazer Pagamento
          </Button>
        ) : (
          <Button 
            onClick={handleCheckout}
            color="transparent" 
            simple 
          >
            Fazer Checkout
          </Button>
        )}
        <Button
          onClick={handleCloseModal}
          color="danger"
          simple
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
    
    </>
  );
}
