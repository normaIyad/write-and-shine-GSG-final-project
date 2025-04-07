interface IPlog{
    id: number;
    title: string;
    content: string;
    createdAt: string;
        name: string;
        image: string;
}


export interface Post {
    id: number,
    title: string,
    content: string,
    author_id: number,
    category_id: number,
    is_active: boolean,
    like_count: number
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

export default IPlog;
