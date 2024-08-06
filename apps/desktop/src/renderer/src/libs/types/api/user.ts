export interface UserResult {
  avatar_url: string
  id: string
  name: string
  object: string
  person?: Person
  type: string
  bot?: Bot
}

export interface Person {
  email: string
}

export interface Bot {
  owner: Owner
  workspace_name: string
}

export interface Owner {
  type: string
  user: User
}

export interface User {
  avatar_url: string
  id: string
  name: string
  object: string
  person: Person2
  type: string
}

export interface Person2 {
  email: string
}
