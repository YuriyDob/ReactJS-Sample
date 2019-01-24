import * as React from "react";
import * as uuid from "uuid";

import {
  Form,
  FormGroup,
  FormFeedback,
  Input,
  Row,
  Col,
  Container
} from "reactstrap";

import { insertOneNote } from "src/utils/storage/notes";

import { INote } from "src/components/main/Notes/types";

import { STButton } from "./styles";

interface IState {
  noteTitle: string;
  isValid: boolean;
}

interface IProps {
  onNoteAdd: (note: INote) => void;
}

class NoteInput extends React.Component<IProps, IState> {
  readonly state = {
    noteTitle: "",
    isValid: true
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    this.setState({ noteTitle: value, isValid: value.length > 2 });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.noteTitle.length < 3) {
      this.setState({ isValid: false });
    } else if (this.state.isValid) {
      this.createNewNote();
      this.setState({ noteTitle: "" });
    }
  };

  createNewNote() {
    const note: INote = {
      id: uuid(),
      title: this.state.noteTitle,
      comments: []
    };
    insertOneNote(note);
    this.props.onNoteAdd(note);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row>
          <Col xs={12} sm={8} md={7}>
            <FormGroup>
              <Input
                invalid={!this.state.isValid}
                type="text"
                name="noteTitle"
                placeholder="type name here..."
                onChange={this.handleChange}
                value={this.state.noteTitle}
              />
              {!this.state.isValid && (
                <FormFeedback>
                  Title must be more than 2 characters
                </FormFeedback>
              )}
            </FormGroup>
          </Col>
          <Col xs={12} sm={4} md={5}>
            <STButton
              color="primary"
              type="submit"
              block
              disabled={!this.state.isValid}
            >
              Add new
            </STButton>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default NoteInput;
