export enum BlockType {
  PARAGRAPH = "paragraph",
  TO_DO = "to_do",
  CHILD_PAGE = "child_page",
}

export interface BlockResult {
  archived: boolean;
  created_by: CreatedBy;
  created_time: string;
  has_children: boolean;
  id: string;
  in_trash: boolean;
  last_edited_by: LastEditedBy;
  last_edited_time: string;
  object: string;
  paragraph?: Paragraph;
  parent: Parent;
  type: BlockType;
  to_do?: ToDo;
  child_page?: ChildPage;
}

export interface CreatedBy {
  id: string;
  object: string;
}

export interface LastEditedBy {
  id: string;
  object: string;
}

export interface Paragraph {
  color: string;
  rich_text: any[];
}

export interface Parent {
  page_id: string;
  type: string;
}

export interface ToDo {
  checked: boolean;
  color: string;
  rich_text: RichText[];
}

export interface RichText {
  annotations: Annotations;
  href: any;
  plain_text: string;
  text: Text;
  type: string;
}

export interface Annotations {
  bold: boolean;
  code: boolean;
  color: string;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
}

export interface Text {
  content: string;
  link: any;
}

export interface ChildPage {
  title: string;
}

export interface AddTodoBlock {
  text: string;
  checked: boolean;
}

export interface UpdateBlock {
  to_do: Partial<ToDo>;
}
