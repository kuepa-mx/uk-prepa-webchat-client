import { BoxStyleProps } from "@twilio-paste/core/box";
import { TextStyleProps } from "@twilio-paste/core/text";

export const formStyles: BoxStyleProps = {
  padding: "space40",
  paddingTop: "space60",
  overflow: "auto",
  height: "100%",
  display: "flex",
  flexDirection: "column"
};

export const titleStyles: TextStyleProps = {
  fontSize: "fontSize70",
  marginBottom: "space60"
};

export const introStyles: TextStyleProps = {
  marginBottom: "space70"
};

export const fieldStyles: BoxStyleProps = {
  marginBottom: "space70",
  color: "colorTextInverse",
  backgroundColor: "colorBackground"
};
