import styled from "styled-components";

import { ListGroupItem } from "reactstrap";

export const STGroupItem = styled(ListGroupItem)`
  overflow-wrap: break-word;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;

  /* word-wrap: break-word; */
  color: #666666;
  font-size: 12px;
  &&& {
    padding: 10px 0px 20px;
  }
`;
