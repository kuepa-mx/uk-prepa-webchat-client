import { BoxStyleProps } from "@twilio-paste/core/box";

export const outerContainerStyles: BoxStyleProps = {
  position: "fixed",
  bottom: "space50",
  right: "space60",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  zIndex: "zIndex50"
};

export const innerContainerStyles: BoxStyleProps = {
  boxShadow: "shadow",
  display: "flex",
  flexDirection: "column",
  width: "320px",
  height: "500px",
  marginBottom: "space50",
  borderRadius: "borderRadius30",
  borderWidth: "borderWidth10",
  borderColor: "colorBorder",
  backgroundColor: "colorBackground"
};
