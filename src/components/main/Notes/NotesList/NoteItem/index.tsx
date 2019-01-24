import * as React from "react";

import { Button } from "reactstrap";
import { INote } from "src/components/main/Notes/types";
import { STListText, STBadge, STButtonText, STGroupItem } from "./styles";

interface IProps {
  note: INote;
  onNoteSelect: (note: INote) => void;
  onNoteDelete: (note: INote) => void;
  selectedNoteId: string;
}

class NoteItem extends React.Component<IProps> {
  handleClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    this.props.onNoteDelete(this.props.note);
  };

  render() {
    const commentsLength: number = this.props.note.comments.length;
    const isActive: boolean = this.props.note.id === this.props.selectedNoteId;
    return (
      <STGroupItem
        className="d-flex justify-content-between align-items-centers"
        onClick={() => this.props.onNoteSelect(this.props.note)}
        isActive={isActive}
      >
        <STListText>
          <span>{this.props.note.title}</span>
          {commentsLength > 0 && <STBadge pill>{commentsLength}</STBadge>}
        </STListText>
        <Button outline color="danger" onClick={this.handleClick}>
          <STButtonText>Delete</STButtonText>
        </Button>
      </STGroupItem>
    );
  }
}

export default NoteItem;
