
export interface IPlog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  name: string;
  image: string;
  // Add the missing fields from Post here
  author_id: number;
  like_count: number;
  author_name: string;
}
export interface UserProfile {
  id: number,
  username: string,
  email: string,
  image: string,
  job_title: string,
  education: string,
  biography: string
}
export interface Post  {
  id: number,
    title: string,
    content: string,
    author_id: number,
    category_id :number ,
    like_count: number ,
    author_name : string , 
    author_image: string,
    is_active: boolean,
}
export interface Post {
    id: number,
    title: string,
    content: string,
    author_id: number,
    like_count: number ,
    author_name : string
  }
  export interface CustomPayload {
    userId: number;
    email: string;
    iat: number;
    exp: number;
  }
export interface Itags {
  id: number,
  name: string,
  is_active: number,
  created_at: string,
  updated_at: string
}
export interface Icommentts {
  id: number,
  post_id: number,
  author_id: number,
  content: string,
}
export interface Icatigory{
  id: number , 
  name: string,
  is_active: boolean,
}
export interface Iuser {
  id: number,
  username: string,
  email: string,
  password_hash: string,
  role: string,
  is_active: number,
  image: string ,
  post_count : number , 
  comment_count : number , 
  like_count : number
}

export default IPlog;
