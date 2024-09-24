import { Fragment } from "react";
import { Box } from "@twilio-paste/core/box";
import { Text } from "@twilio-paste/core/text";
import { Button } from "@twilio-paste/core/button";
import { useDispatch, useSelector } from "react-redux";

import { sessionDataHandler } from "../sessionDataHandler";
import { changeEngagementPhase } from "../store/actions/genericActions";
import { EngagementPhase, AppState } from "../store/definitions";
import { containerStyles, textStyles, titleStyles } from "./styles/ConversationEnded.styles";
import type { Transcript } from "./Transcript";

export const ConversationEnded = () => {
  const dispatch = useDispatch();
  const { messages, users, preEngagementData, transcriptConfig } = useSelector((state: AppState) => ({
    messages: state.chat.messages,
    users: state.chat.users,
    preEngagementData: state.chat.conversation?.attributes.pre_engagement_data,
    transcriptConfig: state.config.transcript
  }));

  const handleStartNewChat = () => {
    sessionDataHandler.clear();
    dispatch(changeEngagementPhase({ phase: EngagementPhase.PreEngagementForm }));
  };

  let TranscriptComponent: typeof Transcript | undefined = undefined;

  // This file and its related dependencies are only bundled if transcripts are enabled in .env file
  if (process.env.DOWNLOAD_TRANSCRIPT_ENABLED === "true" || process.env.EMAIL_TRANSCRIPT_ENABLED === "true") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports,@typescript-eslint/no-var-requires,global-require
    ({ Transcript: TranscriptComponent } = require("./Transcript"));
  }

  return (
    <Box {...containerStyles}>
      <Text as="h3" {...titleStyles}>
        Gracias por charlar con nosotros!
      </Text>
      {TranscriptComponent ? (
        <TranscriptComponent
          messages={messages}
          preEngagementData={preEngagementData}
          users={users}
          transcriptConfig={transcriptConfig}
        />
      ) : (
        <Fragment />
      )}
      <Text as="p" {...textStyles}>
        Si tienes mas consultas, no dudes en contactarnos de nuevo
      </Text>
      <Button variant="primary" data-test="start-new-chat-button" onClick={handleStartNewChat}>
        Empezar nueva conversación
      </Button>
    </Box>
  );
};
