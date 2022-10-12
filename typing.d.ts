export interface Post {
  _id: string;
  title: string;
  createAt: string;
  author: {
    name: string;
    image: string;
  };
  description: string;
  mainImage: {
    assets: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
  comments: [Comment];
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}