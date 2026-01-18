import { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  // CallControls,
  // CallParticipantsList,
  // ParticipantView,
  // useCallStateHooks,
  Call,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css"; // Import styles

const userId = localStorage.getItem("userId")!;
const API_KEY = "th8534tttvjg"; // Replace with your API key
const USER_ID = userId;
const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjdkZDE4NDZhN2I0Mjg1NGFmZjhjN2FhIn0._aUp1GOp1_WRisCo7EuJLLBoMbxXyoeBj28ye7WiHrA';
const client = new StreamVideoClient({ apiKey: API_KEY });

const VoiceChannel = () => {
  const [call, setCall] = useState<Call | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const connectUser = async () => {
      if (!USER_ID) {
        console.error("User ID not found in localStorage");
        return;
      }

      await client.connectUser({ id: USER_ID, name: "Abhay" }, USER_TOKEN);
      setConnected(true);

      const newCall = client.call("default", "group-call");
      await newCall.join({ create: true });
      setCall(newCall);
    };

    connectUser();
  }, []);

  if (!connected) return <p className="text-center text-white">Loading...</p>;
  if (!call) return <p className="text-center text-white">Joining call...</p>;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        {/* <CallUI call={call} /> */}
      </StreamCall>
    </StreamVideo>
  );
};

// const CallUI = ({ call }: { call: Call }) => {
//   const { useLocalParticipant, useRemoteParticipants, useScreenShareState } = useCallStateHooks();
//   const localParticipant = useLocalParticipant();
//   const remoteParticipants = useRemoteParticipants();
//   const { screenShareActive, screenShareParticipant } = useScreenShareState();
  
//   const toggleScreenShare = async () => {
//     if (screenShareActive) {
//       await call.screenShare.stop();
//     } else {
//       await call.screenShare.start();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
//       {/* ✅ Video Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6 w-full max-w-6xl">
//         {/* ✅ Show Shared Screen */}
//         {screenShareActive && screenShareParticipant && (
//           <div className="col-span-2 md:col-span-3 lg:col-span-4 relative w-full h-64 md:h-80 border-2 border-green-500 rounded-lg shadow-lg overflow-hidden">
//             <p className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded-md text-sm">
//               {screenShareParticipant.name} is sharing
//             </p>
//             <ParticipantView participant={screenShareParticipant} />
//           </div>
//         )}

//         {/* ✅ Self Video */}
//         {localParticipant && (
//           <div className="relative w-full h-48 md:h-60 border-2 border-blue-500 rounded-lg shadow-lg overflow-hidden">
//             <p className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded-md text-sm">You</p>
//             <ParticipantView participant={localParticipant} />
//           </div>
//         )}

//         {/* ✅ Remote Participants */}
//         {remoteParticipants.map((participant) => (
//           <div key={participant.userId} className="relative w-full h-48 md:h-60 border rounded-lg shadow-lg overflow-hidden">
//             <p className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded-md text-sm">{participant.name}</p>
//             <ParticipantView participant={participant} />
//           </div>
//         ))}
//       </div>

//       {/* ✅ Controls Section */}
//       <div className="fixed bottom-6 flex justify-center items-center gap-4 px-6 py-4 rounded-lg shadow-lg">
//         <CallControls />
//         {/* ✅ Screen Share Button */}
//         <button
//           onClick={toggleScreenShare}
//           className="px-4 py-2 bg-blue-500 rounded-md text-black font-semibold"
//         >
//         </button>
//       </div>

//       {/* ✅ Participants List (Popup Style) */}
//       <div className="absolute top-20 right-4 bg-black/80 p-4 rounded-lg shadow-lg">
//         <h3 className="text-lg font-semibold">Participants</h3>
//         <CallParticipantsList onClose={() => {}} />
//       </div>
//     </div>
//   );
// };

export default VoiceChannel;
