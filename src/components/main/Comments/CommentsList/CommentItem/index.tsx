import * as React from "react";

import { Row, Col, Container } from "reactstrap";
import { STGroupItem } from "./styles";

import { IComment } from "src/components/main/Comments/types";

import UserAvatar from "src/components/ui/UserAvatar";

interface IProps {
  item: IComment;
}

const CommentItem = (props: IProps) => (
  <STGroupItem>
    <Container>
      <Row>
        <Col xs={3} sm={2}>
          <UserAvatar />
        </Col>
        <Col xs={9} sm={10}>
          {props.item.text.split("\n").map((item, key) => (
            <span key={key}>
              {item}
              <br />
            </span>
          ))}
        </Col>
      </Row>
    </Container>
  </STGroupItem>
);

export default CommentItem;
