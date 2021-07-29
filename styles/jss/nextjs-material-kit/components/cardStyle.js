import { primaryColor } from "../../nextjs-material-kit";

const cardStyle = {
  card: {
    border: "0",
    marginBottom: "30px",
    marginTop: "30px",
    borderRadius: "12px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff",
    width: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    minWidth: "0",
    wordWrap: "break-word",
    fontSize: ".875rem",
    transition: "all 300ms linear",
    border: `1px solid ${primaryColor}`,
    '&:hover' : {
      boxShadow: `-6px 4px ${primaryColor}`
    }
  },
  cardPlain: {
    background: "transparent",
    boxShadow: "none",
  },
  cardCarousel: {
    overflow: "hidden",
  },
};

export default cardStyle;
