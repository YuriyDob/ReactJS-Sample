import styled from "styled-components";
import { Button, ListGroupItem, Badge } from "reactstrap";
import * as React from "react";

interface IListItemProps {
  isActive: boolean;
}

export const STGroupItem = styled(({ isActive, ...rest }) => (
  <ListGroupItem {...rest} />
))`
  ::before {
    position: absolute;
    content: "";
    top: 0;
    left: -37px;
    width: 5px;
    height: 100%;
    ${(props: IListItemProps) =>
      props.isActive ? "border-left: 5px solid #ff2f5a;" : ""}
  }
  &&& {
    :first-child {
      border-top: 0;
    }
    padding-left: 0;
    padding-right: 0;
    color: #2b2f3e;
    font-size: 16px;
    font-weight: bold;

    :hover {
      cursor: pointer;
      color: #666666;
    }
  }

  position: relative;
`;

export const STListText = styled.span`
  display: flex;
  flex: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const STBadge = styled(Badge)`
  margin-left: 8px;

  &&& {
    background-color: #27ccc0;
    font-size: 13px;
  }
`;

export const STButtonText = styled.span`
  padding: 5px 13px;
`;
