export interface User {
  id: string
  email: string
  role: "admin" | "contributor" | "user"
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  status: string
  author_id?: string
  tags?: string[]
  created_at: string
  updated_at: string
}


export interface Blog {
  id: string
  title: string
  slug: string
  content: string
  status: "draft" | "pending" | "approved"
  author_id: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface Gallery {
  id: string
  image_url: string
  category: string
  caption: string
  visible: boolean
  created_at: string
}

export interface AskALawyer {
  id: string
  name: string
  email: string
  topic: string
  message: string
  file_url: string | null
  status: "new" | "read" | "responded"
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string
  message: string
  file_url: string | null
  created_at: string
}

export interface Settings {
  key: string
  value: string
  updated_at: string
}
