import { GenericThemeShape } from "@twilio-paste/theme";

/* eslint-disable sonarjs/no-duplicate-string */
export default {
  textColors: {
    colorText: "rgb(255, 255, 255)",
    colorTextInverse: "rgb(0, 0, 0)"
  },
  backgroundColors: {
    colorBackground: "rgb(17, 27, 33)",
    colorBackgroundInverse: "rgb(32 44 51)",
    colorBackgroundBody: "rgb(17, 27, 33)",
    colorBackgroundBodyInverse: "rgb(32, 44, 51)",
    colorBackgroundPrimary: "rgb(32, 44, 51)",
    colorBackgroundPrimaryStrongest: "rgb(17, 27, 33)",
    colorBackgroundPrimaryLightest: "rgb(248, 250, 252)",
    colorBackgroundPrimaryWeakest: "rgb(229, 231, 235)",
    colorBackgroundPrimaryStronger: "#475569",
    colorBackgroundError: "rgb(155 84 84)"
  },
  borderColors: {
    colorBorder: "rgb(32, 44, 51)",
    colorBorderPrimary: "rgb(32, 44, 51)"
  },
  shadows: {
    shadowBorder: "0 0 0 1px rgb(32, 44, 51)",
    shadowBorderPrimary: "rgb(32, 44, 51)"
  }
} as Partial<GenericThemeShape>;
