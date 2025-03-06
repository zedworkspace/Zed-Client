export interface Message {
    _id?: string;
    senderId: {
      _id: string;
      name: string;
      profileImg?: string;
    };
    readBy:string[]
    content: string;
    fileUrl:string
    type: string;
    createdAt: string;
    channelId: string;
  }