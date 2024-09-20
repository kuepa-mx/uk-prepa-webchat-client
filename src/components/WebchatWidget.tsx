import { useDispatch } from "react-redux";
import { CustomizationProvider, CustomizationProviderProps } from "@twilio-paste/core/customization";
import { CSSProperties, FC, useEffect, useState } from "react";

import { RootContainer } from "./RootContainer";
import { EngagementPhase } from "../store/definitions";
import { sessionDataHandler } from "../sessionDataHandler";
import { initSession } from "../store/actions/initActions";
import { changeEngagementPhase } from "../store/actions/genericActions";
import light from "../themes/light";
import dark from "../themes/dark";

const AnyCustomizationProvider: FC<CustomizationProviderProps & { style: CSSProperties }> = CustomizationProvider;

export function WebchatWidget() {
  const dispatch = useDispatch();
  const [selectedTheme, setSelectedTheme] = useState<"default" | "dark">(() =>
    localStorage.getItem("theme") === "dark" ? "dark" : "default"
  );
  const themes = {
    default: light,
    dark
  };

  useEffect(() => {
    const storageListener = () => {
      setSelectedTheme(localStorage.getItem("theme") === "dark" ? "dark" : "default");
    };
    window.addEventListener("storage", storageListener);

    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, [dispatch]);

  useEffect(() => {
    const data = sessionDataHandler.tryResumeExistingSession();
    if (data) {
      try {
        dispatch(initSession({ token: data.token, conversationSid: data.conversationSid }));
      } catch (e) {
        // if initSession fails, go to changeEngagement phase - most likely there's something wrong with the store token or conversation sis
        dispatch(changeEngagementPhase({ phase: EngagementPhase.PreEngagementForm }));
      }
    } else {
      // if no token is stored, got engagement form
      dispatch(changeEngagementPhase({ phase: EngagementPhase.PreEngagementForm }));
    }
  }, [dispatch]);

  return (
    <AnyCustomizationProvider
      baseTheme="default"
      theme={themes[selectedTheme]}
      elements={{
        MESSAGE_INPUT: {
          boxShadow: "none!important" as "none"
        },
        MESSAGE_INPUT_BOX: {
          display: "inline-block",
          boxShadow: "none",
          backgroundColor: "none"
        },
        ALERT: {
          paddingTop: "space30",
          paddingBottom: "space30",
          color: "colorTextInverse",
          backgroundColor: "colorBackgroundError"
        },
        BUTTON: {
          marginTop: "auto",
          alignSelf: "flex-end",
          "&[aria-disabled='true'][color='colorTextLink']": {
            color: "colorTextLinkWeak"
          }
        },
        SELECT: {
          color: "colorText",
          border: "initial",
          boxShadow: "shadowBorder",
          borderRadius: "borderRadius10"
        },
        OPTION: {
          backgroundColor: "colorBackground"
        }
      }}
      style={{ minHeight: "100%", minWidth: "100%" }}
    >
      <RootContainer />
    </AnyCustomizationProvider>
  );
}
