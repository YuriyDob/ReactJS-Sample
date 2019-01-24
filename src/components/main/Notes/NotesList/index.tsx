import * as React from "react";
import { ListGroup } from "reactstrap";

import NoteItem from "src/components/main/Notes/NotesList/NoteItem";

import { INote } from "src/components/main/Notes/types";

interface IProps {
  notes: INote[];
  onNoteSelect: (note: INote) => void;
  onNoteDelete: (note: INote) => void;
  selectedNoteId: string;
}

const NotesList = (props: IProps) => {
  return (
    <ListGroup flush>
      {props.notes.map((note: INote) => (
        <NoteItem
          key={note.id}
          note={note}
          onNoteSelect={props.onNoteSelect}
          onNoteDelete={props.onNoteDelete}
          selectedNoteId={props.selectedNoteId}
        />
      ))}
    </ListGroup>
  );
};

export default NotesList;
