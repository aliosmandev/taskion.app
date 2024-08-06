export interface PagesResult {
  archived: boolean
  cover: any
  created_by: CreatedBy
  created_time: string
  icon: any
  id: string
  in_trash: boolean
  last_edited_by: LastEditedBy
  last_edited_time: string
  object: string
  parent: Parent
  properties: Properties
  public_url: any
  url: string
}

export interface CreatedBy {
  id: string
  object: string
}

export interface LastEditedBy {
  id: string
  object: string
}

export interface Parent {
  type: string
  workspace?: boolean
  page_id?: string
}

export interface Properties {
  title: Title
}

export interface Title {
  id: string
  title: Title2[]
  type: string
}

export interface Title2 {
  annotations: Annotations
  href: any
  plain_text: string
  text: Text
  type: string
}

export interface Annotations {
  bold: boolean
  code: boolean
  color: string
  italic: boolean
  strikethrough: boolean
  underline: boolean
}

export interface Text {
  content: string
  link: any
}
