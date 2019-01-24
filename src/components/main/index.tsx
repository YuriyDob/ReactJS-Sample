import * as React from "react";
import update from "immutability-helper";
import * as uuid from "uuid";

import { Container, Col, Row } from "reactstrap";

import { insertById } from "src/utils/storage/comments";
import { deleteNoteById, findAll } from "src/utils/storage/notes";

import { STPageWrapper } from "./styles";

import { INote } from "src/components/main/Notes/types";
import { IComment } from "src/components/main/Comments/types";

import DeleteModal from "src/components/ui/DeleteModal";
import Aside from "src/components/main/Aside";
import Comments from "src/components/main/Comments";
import Notes from "src/components/main/Notes";

interface IState {
  selectedNote: INote;
  noteToDelete: INote;
  notes: INote[];
  showModal: boolean;
}

class MainPageContainer extends React.Component<any, IState> {
  state = {
    selectedNote: null,
    noteToDelete: null,
    notes: [],
    showModal: false
  };

  onNoteSelect = (note: INote) => {
    this.setState({ selectedNote: note });
  };

  handleCommentAdd = (commentText: string) => {
    const comment: IComment = {
      id: uuid(),
      text: commentText
    };
    const updatedNote: INote = insertById(this.state.selectedNote.id, comment);

    const noteIndex: number = this.state.notes.findIndex(
      n => n.id === updatedNote.id
    );

    const newNotes: INote[] = update(this.state.notes, {
      [noteIndex]: {
        comments: {
          $push: [comment]
        }
      }
    });

    this.setState({
      notes: newNotes,
      selectedNote: updatedNote
    });
  };

  handleConfirmDeletion = () => {
    const deletedNote = deleteNoteById(this.state.noteToDelete.id);

    const noteIndex: number = this.state.notes.findIndex(
      n => n.id === deletedNote.id
    );

    const newNotes: INote[] = update(this.state.notes, {
      $splice: [[noteIndex, 1]]
    });

    this.setState({
      showModal: false,
      notes: newNotes,
      selectedNote: null
    });
  };

  handleNoteDelete = (note: INote) => {
    this.setState({
      noteToDelete: note,
      showModal: true
    });
  };

  handleNoteAdd = (note: INote) => {
    this.setState({ notes: [...this.state.notes, note], selectedNote: note });
  };

  getId = (): string => {
    if (this.state.selectedNote) {
      return this.state.selectedNote.id;
    }
    return null;
  };

  getNumber = (): number => {
    if (this.state.selectedNote) {
      const selectedNoteNumber =
        this.state.notes.findIndex(
          (note: INote) => note.id === this.state.selectedNote.id
        ) + 1;
      return selectedNoteNumber;
    }
    return null;
  };

  toggle = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  componentDidMount() {
    const notes: INote[] = findAll();
    if (notes) {
      this.setState({ notes });
    }
  }

  public render() {
    const selectedId: string = this.getId();
    const selectedNoteNumber: number = this.getNumber();

    return (
      <STPageWrapper>
        <Container fluid>
          <Row>
            <Col lg={2} className="d-none d-lg-block pl-0">
              <Aside />
            </Col>
            <Col xs={12} md={6} lg={5}>
              <Notes
                onNoteSelect={this.onNoteSelect}
                onNoteAdd={this.handleNoteAdd}
                onNoteDelete={this.handleNoteDelete}
                notes={this.state.notes}
                selectedNoteId={selectedId}
              />
            </Col>
            <Col xs={12} md={6} lg={5}>
              {this.state.selectedNote && (
                <Comments
                  selectedNoteNumber={selectedNoteNumber}
                  selectedNote={this.state.selectedNote}
                  onCommentAdd={this.handleCommentAdd}
                />
              )}
            </Col>
          </Row>
        </Container>

        {this.state.showModal && (
          <DeleteModal
            onModalDone={this.handleConfirmDeletion}
            onModalToggle={this.toggle}
            isOpen={this.state.showModal}
            note={this.state.noteToDelete}
          />
        )}
      </STPageWrapper>
    );
  }
}

export default MainPageContainer;
