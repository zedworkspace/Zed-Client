/* eslint-disable @next/next/no-img-element */
export default function Activity() {

    const activity =[
        {profileImage:'https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg?cs=srgb&dl=pexels-ezz7-691583.jpg&fm=jpg', actionTaker : 'user1', actionWhoTak : 'user2', action : 'removed', card :'task1', date:'feb 12,2025 1:42pm', board : 'zed'},
        {profileImage:'https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg?cs=srgb&dl=pexels-ezz7-691583.jpg&fm=jpg', actionTaker : 'user1', actionWhoTak : 'user2', action : 'removed', card :'task1', date:'feb 12,2025 1:42pm', board : 'zed'},
        {profileImage:'https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg?cs=srgb&dl=pexels-ezz7-691583.jpg&fm=jpg', actionTaker : 'user1', actionWhoTak : 'user2', action : 'removed', card :'task1', date:'feb 12,2025 1:42pm', board : 'zed'},
        {profileImage:'https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg?cs=srgb&dl=pexels-ezz7-691583.jpg&fm=jpg', actionTaker : 'user1', actionWhoTak : 'user2', action : 'removed', card :'task1', date:'feb 12,2025 1:42pm', board : 'zed'},
        {profileImage:'https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg?cs=srgb&dl=pexels-ezz7-691583.jpg&fm=jpg', actionTaker : 'user1', actionWhoTak : 'user2', action : 'removed', card :'task1', date:'feb 12,2025 1:42pm', board : 'zed'},
    ]
    return(
        <div>
            <h1>this is activity page</h1>
            {activity.map((act,ind)=>(
                <div key={ind} className="flex mt-3 space-x-2 items-center">
                    <img src={act.profileImage} alt="profil image" className="w-8 h-8 rounded-full "/>
                    <div>
                        <div className="flex space-x-1 items-center">
                        <p className="font-bold">{act.actionTaker}</p>
                        <p className="text-sm font-light">{act.action}</p>
                        <p>{act.actionWhoTak}</p>
                        {act.action === 'removed' ?<p className="text-sm">from</p>:<p className="text-sm">to</p>}
                        <p>{act.card}</p>
                        </div>
                        <div className="flex space-x-1 text-xs items-center">
                            <p>{act.date} . onboard</p>
                            <p className="text-sm">{act.board}</p>

                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}