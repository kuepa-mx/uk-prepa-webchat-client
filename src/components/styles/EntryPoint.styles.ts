import { BoxStyleProps } from "@twilio-paste/core/box";

export const containerStyles: BoxStyleProps = {
  border: "none",
  display: "flex",
  height: "sizeIcon90",
  width: "sizeIcon90",
  color: "colorText",
  backgroundColor: "colorBackgroundPrimary",
  fontSize: "fontSize50",
  alignItems: "center",
  justifyContent: "center",
  borderStyle: "solid",
  borderRadius: "borderRadiusCircle",
  borderColor: "colorBorder",
  borderWidth: "borderWidth10",
  cursor: "pointer",
  transition: "background-color 0.2s",
  outline: "0px",
  padding: "space0",
  _hover: {
    backgroundColor: "colorBackgroundPrimaryStronger",
    color: "colorTextInverse"
  },
  _focusVisible: {
    backgroundColor: "colorBackgroundPrimaryStronger",
    boxShadow: "shadowFocus"
  }
};
