import { Input } from "@twilio-paste/core/input";
import { Box } from "@twilio-paste/core/box";
import { FormEvent, useEffect } from "react";
import { Button } from "@twilio-paste/core/button";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "@twilio-paste/core/text";
import { Label, Option, Select } from "@twilio-paste/core";

import { sessionDataHandler } from "../sessionDataHandler";
import { addNotification, changeEngagementPhase, updatePreEngagementData } from "../store/actions/genericActions";
import { initSession } from "../store/actions/initActions";
import { AppState, EngagementPhase } from "../store/definitions";
import { notifications } from "../notifications";
import { NotificationBar } from "./NotificationBar";
import { introStyles, fieldStyles, titleStyles, formStyles } from "./styles/PreEngagementFormPhase.styles";

const requestTypes = [
  {
    value: "subject",
    label: "Tengo dudas sobre mis materias"
  },
  {
    value: "career", // FAQ
    label: "Tengo dudas sobre Prepa Uk"
  }
] as const;

export type RequestType = typeof requestTypes[number]["value"];

export const PreEngagementFormPhase = () => {
  const { name, email, requestType } = useSelector((state: AppState) => state.session.preEngagementData) || {};
  const dispatch = useDispatch();

  useEffect(() => {
    const preEngagementData = localStorage.getItem("TWILIO_PRE_ENGAGEMENT_FORM_DATA");
    if (preEngagementData) {
      dispatch(updatePreEngagementData(JSON.parse(preEngagementData)));
    }
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(changeEngagementPhase({ phase: EngagementPhase.Loading }));
    try {
      if (!requestType) {
        throw new Error("Seleccione el tipo de consulta");
      }

      const data = await sessionDataHandler.fetchAndStoreNewSession({
        formData: {
          friendlyName: name,
          email,
          requestType,
          webchatType: "prepa"
        }
      });
      dispatch(initSession({ token: data.token, conversationSid: data.conversationSid }));
    } catch (err) {
      dispatch(addNotification(notifications.failedToInitSessionNotification((err as Error).message)));
      dispatch(changeEngagementPhase({ phase: EngagementPhase.PreEngagementForm }));
    }
  };

  return (
    <>
      <NotificationBar />
      <Box as="form" data-test="pre-engagement-chat-form" onSubmit={handleSubmit} {...formStyles}>
        <Text {...titleStyles} className="dark:text-white" as="h3">
          Bienvenido a Uk Prepa
        </Text>
        <Text {...introStyles} className="dark:text-white" as="p">
          Seleccióne por favor el tipo de consulta que desee hacer
        </Text>
        <Input
          hidden
          type="hidden"
          name="name"
          className={"input" as unknown as undefined}
          data-test="pre-engagement-chat-form-name-input"
          value={name}
          onChange={(e) => dispatch(updatePreEngagementData({ name: e.target.value }))}
          required
        />
        <Input
          hidden
          type="hidden"
          name="email"
          className={"input" as unknown as undefined}
          data-test="pre-engagement-chat-form-email-input"
          value={email}
          onChange={(e) => dispatch(updatePreEngagementData({ email: e.target.value }))}
          required
        />

        <Box {...fieldStyles}>
          <Label htmlFor="requestType">Tipo de consulta</Label>
          <Select
            data-paste-element="SELECT"
            name="requestType"
            defaultValue={requestType}
            className="text-black select_input"
            onChange={(e) => {
              dispatch(updatePreEngagementData({ requestType: e.target.value as RequestType }));
            }}
          >
            {requestTypes.map(({ label, value }) => (
              <Option data-paste-element="OPTION" key={value} value={value}>
                {label}
              </Option>
            ))}
          </Select>
        </Box>

        <Button variant="primary" type="submit" data-test="pre-engagement-start-chat-button">
          Comenzar
        </Button>
      </Box>
    </>
  );
};
