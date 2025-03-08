import { format } from "date-fns";

export const formatDate = (dateString: string,formatString:string) => {
    return format(new Date(dateString),formatString );
  };