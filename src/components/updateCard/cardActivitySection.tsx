import React from "react";
import { FileText } from "lucide-react";
import { IActivity } from "@/interface/activityInterface";
import { formatDistanceToNow } from "date-fns";

export default function CardActivitySection({
  activities,
}: {
  activities?: IActivity[];
}) {
  if (activities?.length === 0)
    return (
      <div className="w-80 border-l border-[#40444b] pl-6 rounded-r-lg">
        <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
          <FileText className="h-4 w-4 text-[#b9bbbe]" />
          Activity
        </h3>
        <div className="space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#202225] scrollbar-track-[#2f3136]">
          <div className="text-sm  p-3 rounded-lg text-[#b9bbbe]">
            <p className="text-center">No activity recorded yet</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-80 border-l border-[#40444b] pl-6 rounded-r-lg overflow-scroll scrollbar-hide">
      <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
        <FileText className="h-4 w-4 text-[#b9bbbe]" />
        Activity
      </h3>
      <div className="space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#202225] scrollbar-track-[#2f3136] max-h-[39rem] scrollbar-hide">
        {activities?.map((activity) => (
          <div
            key={activity._id}
            className="text-sm p-2 rounded-lg border-none text-[#b9bbbe] flex gap-3"
          >
            <img
              src={activity.user.profileImg}
              alt={activity.user.name}
              className="w-8 h-8 rounded-full border border-[#40444b]"
            />
            <div>
              <p>
                <span className="font-semibold text-white">
                  {activity.user.name}
                </span>{" "}
                {activity.details}
              </p>

              <p className="text-xs text-gray-500">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

{
  /* <div className="space-y-2 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#202225] scrollbar-track-[#2f3136]">
{mockActivities.length > 0 ? (
  mockActivities.map((activity) => (
    <div
      key={activity.id}
      className="text-sm p-2 rounded-lg border-none text-[#b9bbbe] flex gap-3"
    >
      <img
        src={activity.profileImg}
        alt={activity.user}
        className="w-8 h-8 rounded-full border border-[#40444b]"
      />
      <div>
        <p>
          <span className="font-semibold text-white">
            {activity.user}
          </span>{" "}
          {activity.action}
        </p>
        {activity.oldValue && activity.newValue && (
          <p className="text-xs text-gray-400">
            "{activity.oldValue}" → "{activity.newValue}"
          </p>
        )}
        {activity.newValue && !activity.oldValue && (
          <p className="text-xs text-gray-400">"{activity.newValue}"</p>
        )}
        <p className="text-xs text-gray-500">{activity.timestamp}</p>
      </div>
    </div>
  ))
) : (
  <div className="text-sm bg-[#32353b] p-3 rounded-lg border border-[#40444b] text-[#b9bbbe]">
    <p className="text-center">No activity recorded yet</p>
  </div>
)}
</div> */
}
