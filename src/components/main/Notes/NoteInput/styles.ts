import styled from "styled-components";
import { Button, Row } from "reactstrap";

export const STButton = styled(Button)`
  &&& {
    background-color: #27ccc0;
    border-color: #27ccc0;
  }
`;

export const Wrapper = styled(Row)`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
