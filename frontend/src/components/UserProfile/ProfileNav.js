import './style/userprofile.css';
import { useState } from 'react';
import SongContainer from './SongContainer';
import PlaylistContainer from './PlaylistContainer';

const ProfileNav = ({userId, sessionUser}) => {
    const [allActive, setAllActive] = useState(true);
    const [visible, setVisible] = useState(false);

    let links;
    if (parseInt(userId) === sessionUser.id) {
        links = (
        <>
            <div
                className={allActive ? 'profile-nav-button selected' : 'profile-nav-button'}
                onClick={() => setAllActive(!allActive)}>All Music</div>
            <div
                className={!allActive ? 'profile-nav-button selected' : 'profile-nav-button'}
                onClick={() => setAllActive(!allActive)}>Playlists</div>
            <div
                onClick={() => setVisible(!visible)}> + </div>
            <div className={visible ? "playlist-entry" : "hidden"}>
                <input
                    type="text"
                    placeholder="New Playlist Name">
                </input>
                <div className='playlist-create-button'>
                    create
                </div>
            </div>
        </>
        )
    } else {
        links = (
        <>
            <div className='profile-nav-button'>All Music</div>
        </>
        )
    }

    return(
        <>
            <div className="profile-nav-wrapper">
                {links}
            </div>
            {allActive ?
                <SongContainer /> :
                <PlaylistContainer />
            }
        </>
    )
};

export default ProfileNav;
