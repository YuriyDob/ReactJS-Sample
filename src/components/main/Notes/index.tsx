import * as React from "react";

import { CardBody } from "reactstrap";

import { INote } from "src/components/main/Notes/types";

import NoteInput from "src/components/main/Notes/NoteInput";
import NotesList from "src/components/main/Notes/NotesList";
import CardWrapper from "src/components/ui/CardWrapper";

interface IProps {
  notes: INote[];
  onNoteSelect: (note: INote) => void;
  onNoteAdd: (note: INote) => void;
  onNoteDelete: (note: INote) => void;
  selectedNoteId: string;
}

const Notes = (props: IProps) => {
  return (
    <CardWrapper title="Items">
      <CardBody>
        <NoteInput onNoteAdd={props.onNoteAdd} />
        <NotesList
          notes={props.notes}
          onNoteSelect={props.onNoteSelect}
          onNoteDelete={props.onNoteDelete}
          selectedNoteId={props.selectedNoteId}
        />
      </CardBody>
    </CardWrapper>
  );
};

export default Notes;
