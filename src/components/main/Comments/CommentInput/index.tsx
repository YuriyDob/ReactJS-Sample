import * as React from "react";

import {
  FormGroup,
  Input,
  Form,
  Row,
  Col,
  FormFeedback,
  Container,
  Button
} from "reactstrap";

import UserAvatar from "src/components/ui/UserAvatar";
import { STButton } from "../../Notes/NoteInput/styles";

interface IState {
  commentText: string;
  isValid: boolean;
}
interface IProps {
  onCommentAdd: (commentText: string) => void;
  selectedNoteNumber: number;
}

class CommentInput extends React.Component<IProps, IState> {
  readonly state = {
    isValid: true,
    commentText: ""
  };

  inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  handleKeyDown = (event: React.KeyboardEvent) => {
    const keyCode: number = event.keyCode;
    const ctrlOrCmdKey: boolean = event.ctrlKey || event.metaKey;
    if (keyCode === 13 && ctrlOrCmdKey) {
      this.handleAddComment();
    }
  };

  handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const value: string = event.currentTarget.value;
    this.setState({
      commentText: value,
      isValid: value.length > 2
    });
  };
  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.handleAddComment();
  };

  handleAddComment = () => {
    if (this.state.commentText.length < 3) {
      this.setState({
        isValid: false
      });
    } else if (this.state.isValid) {
      this.props.onCommentAdd(this.state.commentText);
      this.setState({ commentText: "" });
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.selectedNoteNumber !== this.props.selectedNoteNumber) {
      this.inputRef.current.focus();
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Container>
          <Row>
            <Col xs={3} sm={2}>
              <UserAvatar />
            </Col>
            <Col xs={9} sm={10}>
              <FormGroup>
                <Input
                  autoFocus
                  invalid={!this.state.isValid}
                  type="textarea"
                  name="text"
                  innerRef={this.inputRef}
                  onKeyDown={this.handleKeyDown}
                  onChange={this.handleChange}
                  value={this.state.commentText}
                />
                {!this.state.isValid && (
                  <FormFeedback>
                    Comment must be more than 2 characters
                  </FormFeedback>
                )}
              </FormGroup>
            </Col>
            <Col
              xs={{ size: 9, offset: 3 }}
              sm={{ size: 10, offset: 2 }}
              className="d-lg-none"
            >
              <STButton block disabled={!this.state.isValid} type="submit">
                Send
              </STButton>
            </Col>
          </Row>
        </Container>
      </Form>
    );
  }
}

export default CommentInput;
