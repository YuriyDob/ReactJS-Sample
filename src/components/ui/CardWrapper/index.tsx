import * as React from "react";
import { STCard, STCardTitle } from "./styles";

interface IProps {
  title: string;
  children: React.ReactNode;
}

const CardWrapper = (props: IProps) => {
  return (
    <STCard>
      <STCardTitle>{props.title}</STCardTitle>
      {props.children}
    </STCard>
  );
};

export default CardWrapper;
