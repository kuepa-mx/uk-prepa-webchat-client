import { GenericThemeShape } from "@twilio-paste/theme";

/* eslint-disable sonarjs/no-duplicate-string */
export default {
  textColors: {
    colorText: "rgb(0, 0, 0)",
    colorTextInverse: "rgb(255, 255, 255)"
  },
  backgroundColors: {
    colorBackground: "rgb(255, 255, 255)",
    colorBackgroundInverse: "rgb(17, 27, 33)",
    colorBackgroundBody: "rgb(241 245 249)",
    colorBackgroundBodyInverse: "rgb(17, 27, 33)",
    colorBackgroundPrimary: "rgb(248, 250, 252)",
    colorBackgroundPrimaryStrongest: "rgb(241 245 249)",
    colorBackgroundPrimaryLightest: "rgb(248, 250, 252)",
    colorBackgroundPrimaryWeakest: "rgb(241 245 249)",
    colorBackgroundPrimaryStronger: "#475569",
    colorBackgroundError: "rgb(241, 197, 197)"
  },
  borderColors: {
    colorBorder: "rgb(203, 213, 225)",
    colorBorderPrimary: "rgb(229, 231, 235)",
    colorBorderPrimaryStronger: "rgb(229, 231, 235)",
    colorBorderNeutral: "rgb(229, 231, 235)",
    colorBorderInverse: "rgb(229, 231, 235)"
  },
  shadows: {
    shadowBorder: "0 0 0 1px rgb(229, 231, 235)",
    shadowBorderPrimary: "0 0 0 1px rgb(229, 231, 235)",
    shadowBorderPrimaryStrong: "0 0 0 1px rgb(229, 231, 235)"
  }
} as Partial<GenericThemeShape>;
