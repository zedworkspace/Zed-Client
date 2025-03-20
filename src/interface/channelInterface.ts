import { LucideIcon } from "lucide-react";

interface IFetch {
  status: string;
  message: string;
}

export interface IChannel {
  _id: string;
  name: string;
  projectId: string;
  type: string;
  description: string;
  allowedRoles: object[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateChannel {
  message: string;
  data: IChannel;
}

export interface IGetChannels extends IFetch {
  data: { textChannels: IChannel[]; voiceChannels: IChannel[] };
}
export interface IGetChannel extends IFetch {
  data: IChannel;
}

export interface IMapChannels extends IChannel {
  url: string;
  icon: LucideIcon;
}

export interface ICreateChannelBody {
  name: string;
  type: string;
  projectId: string;
  allowedRoles?: string[];
}
