import { formatDate } from "@/utils/formateDate";

interface DateSeparatorProps {
  date: string;
}

const DateSeparator = ({ date }: DateSeparatorProps) => {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow h-px bg-gray-600"></div>
      <div className="px-2 text-center text-gray-400 text-xs font-bold">
        {formatDate(date, "MMM dd, yyyy")}
      </div>
      <div className="flex-grow h-px bg-gray-600"></div>
    </div>
  );
};

export default DateSeparator;