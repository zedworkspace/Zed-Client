import { ICreateChannel, IGetChannels } from "@/interface/channelInterface";
import apiClient from "@/lib/axios.config";
import API_ROUTES from "@/lib/routes";

export const getChannels = async (id: string): Promise<IGetChannels> => {
  const response = await apiClient.get(
    API_ROUTES.CHANNEL.GET_CHANNELS_PROJECT_ID + id
  );
  return response.data;
};

export const createChannels = async (data:{name:string,type:string,projectId:string}): Promise<ICreateChannel> =>{
  console.log(data,'datasss');
  const response = await apiClient.post(API_ROUTES.CHANNEL.CREATE_CHANNEL,data)
  return response.data
}
