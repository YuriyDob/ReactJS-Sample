import * as React from "react";

import { STListWrapper, STText } from "./styles";

import { INote } from "src/components/main/Notes/types";
import { IComment } from "./types";

import CardWrapper from "src/components/ui/CardWrapper";
import CommentsList from "./CommentsList";
import CommentInput from "./CommentInput";

interface IProps {
  selectedNote: INote;
  selectedNoteNumber: number;
  onCommentAdd: (commentText: string) => void;
}

const Comments = (props: IProps) => {
  const comments: IComment[] = props.selectedNote.comments;
  return (
    <CardWrapper title={`Comments #${props.selectedNoteNumber}`}>
      <STListWrapper>
        {comments.length > 0 ? (
          <CommentsList comments={comments} />
        ) : (
          <STText>
            <img src="/img/chat.png" alt="" width="50px" height="50px" />
            Leave your comments in the field below
          </STText>
        )}
      </STListWrapper>
      <CommentInput
        onCommentAdd={props.onCommentAdd}
        selectedNoteNumber={props.selectedNoteNumber}
      />
    </CardWrapper>
  );
};

export default Comments;
