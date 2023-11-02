interface Conversation {
  _id: string;
  sender: {
    _id: string;
    username: string;
    profile_image: string;
  };
  receiver: {
    _id: string;
    username: string;
    profile_image: string;
  };
  message: string;
  type: string;
  messageStatus: string;
  createdAt: Date;
  totalUnreadMessage: number;
}

interface IUser {
  _id: string;
  username: string;
  email: string;
  about: string;
  profile_image: string;
  display_name: string;
  createdAt: Date;
}

interface ViewImage {
  isShow: boolean;
  author: string;
  profileImage: string;
  image: string;
  createdAt: Date | null;
}
