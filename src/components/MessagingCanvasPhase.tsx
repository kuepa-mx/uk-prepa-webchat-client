import { useEffect, Fragment, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@twilio-paste/core";
import axios from "axios";

import { Header } from "./Header";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { AppState } from "../store/definitions";
import { ConversationEnded } from "./ConversationEnded";
import { NotificationBar } from "./NotificationBar";
import { removeNotification } from "../store/actions/genericActions";
import { notifications } from "../notifications";
import { AttachFileDropArea } from "./AttachFileDropArea";

export const MessagingCanvasPhase = () => {
  const dispatch = useDispatch();
  const conversation = useSelector((state: AppState) => state.chat.conversation);
  const conversationState = useSelector((state: AppState) => state.chat.conversationState);

  useEffect(() => {
    dispatch(removeNotification(notifications.failedToInitSessionNotification("ds").id));
  }, [dispatch]);

  const Wrapper = conversationState === "active" ? AttachFileDropArea : Fragment;

  const handleFinishConversation = useCallback(() => {
    if (!conversation?.sid) return;

    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/webchat/close`, { conversationSid: conversation.sid })
      .catch((error) => {
        console.error(`Error al finalizar conversación. Error: ${error?.message}`);
      });
  }, [conversation?.sid]);

  return (
    <Wrapper>
      <Header>
        <Box as="div">
          {conversationState === "active" && (
            <Button variant="primary" type="button" onClick={handleFinishConversation}>
              Finalizar Chat
            </Button>
          )}
        </Box>
      </Header>
      <NotificationBar />
      <MessageList />
      {conversationState === "active" ? <MessageInput /> : <ConversationEnded />}
    </Wrapper>
  );
};
