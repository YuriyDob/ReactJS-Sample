import * as React from "react";

import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { INote } from "src/components/main/Notes/types";

interface IProps {
  onModalDone: () => void;
  onModalToggle: () => void;
  note: INote;
  isOpen: boolean;
}

class DeleteModal extends React.Component<IProps> {
  render() {
    const commentsLength: number = this.props.note.comments.length;
    return (
      <Modal toggle={this.props.onModalToggle} isOpen={this.props.isOpen}>
        <ModalHeader toggle={this.props.onModalToggle}>
          You gonna delete this note
        </ModalHeader>
        <ModalBody>
          Note "<strong>{this.props.note.title}</strong>" with{" "}
          <strong>
            {commentsLength} {commentsLength === 1 ? "comment" : "comments"}
          </strong>
          <br />
          Are you sure to delete?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.onModalDone}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={this.props.onModalToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default DeleteModal;
