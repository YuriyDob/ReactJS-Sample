import { INote } from "src/components/main/Notes/types";
import { IComment } from "src/components/main/Comments/types";

const getNotes = (): INote[] =>
  JSON.parse(localStorage.getItem("notes") as string);

// it was optimized in the farther development,
// it's still there to demonstrate proof of concept

export const getById = (id: string) => {
  const notes: INote[] = getNotes();
  if (notes) {
    const note: INote | undefined = notes.find((n: INote) => n.id === id);
    if (note) {
      return note.comments;
    }
  }
  return [];
};

//

export const insertById = (id: string, value: IComment) => {
  const notes: INote[] = getNotes();
  if (notes) {
    const noteIndex: number = notes.findIndex((n: INote) => n.id === id);
    if (noteIndex >= 0) {
      notes[noteIndex].comments.push(value);
      localStorage.setItem("notes", JSON.stringify(notes));
      return notes[noteIndex];
    }
    return null;
  }
  return null;
};
