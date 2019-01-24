import { IComment } from "../Comments/types";

export interface INote {
  id: string;
  title: string;
  comments: IComment[];
}
