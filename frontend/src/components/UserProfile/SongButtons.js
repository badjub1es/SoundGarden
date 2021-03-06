import { useSong } from "../../Context/SongContext";
import { useDispatch, useSelector } from 'react-redux';
import { putSong, deleteSong } from "../../store/songs";
import { useState, useEffect } from "react";
import { getPlaylists, addToPlaylist } from '../../store/playlists';

const SongButtons = ({visible, id, hoveredSong, song, currentUser, bypass}) => {
    const [showEdit, setShowEdit] = useState(false);
    const [editSong, setEditSong] = useState(null);
    const [newTitle, setNewTitle] = useState(null);
    const [playlistsVisible, setPlaylistsVisible] = useState(false);
    const [errors, setErrors] = useState([]);
    const sessionUser = useSelector((state) => state.session.user);
    const playlists = useSelector((state) => Object.values(state.playlists));
    const { setCurrentSong } = useSong();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlaylists(sessionUser.id))
    }, [dispatch])

    useEffect(() => {
        const errors = [];
        if (!newTitle) errors.push('Please provide a value for new Title.')
        if (newTitle) {
            if (newTitle.length > 100) errors.push('Please provide a Title less than 100 characters.');
        };
        setErrors(errors);
    }, [newTitle]);

    const handleEdit = (song) => {
        if (errors.length) {
            return alert('Provide new Title less than 100 characters long.')
        };
        const { userId, url, imgUrl, id } = song;
        const newSong = {
            id,
            userId,
            title: newTitle,
            url,
            imgUrl
        };
        console.log(newSong);
        dispatch(putSong(newSong));
        setShowEdit(false);
        setNewTitle(null);
    };

    const handleDelete = (songId) => {
        if (songId) {
            dispatch(deleteSong(songId));
            return;
        }
    };

    const handlePlaylistAdd = (playlistId, songId) => {
        const args = {
            playlistId,
            songId
        };
        dispatch(addToPlaylist(args));
        return;
    };

    return (
        <div
            id={id}
            className={bypass ? 'song-button-container' : visible && id == parseInt(hoveredSong) ? 'song-button-container' : 'hidden'}
        >
            <div className="song-play-button">
                <img
                    className="song-image"
                    src={require('./style/images/play-button.png')}
                    onClick={() => setCurrentSong([song?.title, song?.url, currentUser?.user.username])}
                    onMouseEnter={(e) => e.target.src = (require('./style/images/play-button-transition.png'))}
                    onMouseLeave={(e) => e.target.src = (require('./style/images/play-button.png'))}
                />
            </div>
            <div className="create-playlist-button">
                <img
                    className="song-image playlist"
                    src={require('./style/images/playlist-button.png')}
                    onClick={() => setPlaylistsVisible(!playlistsVisible)}
                    onMouseEnter={(e) => e.target.src = (require('./style/images/playlist-button-transition.png'))}
                    onMouseLeave={(e) => e.target.src = (require('./style/images/playlist-button.png'))}
                />
                <div
                    className={playlistsVisible ? "playlist-dropdown" : "hidden"}>
                    {playlists?.map((playlist) => (
                        <div
                            id={playlist?.id}
                            key={`${playlist?.id}`}
                            className="playlist-title-container"
                            onClick={() => handlePlaylistAdd(playlist?.id, song?.id)}
                        >{playlist?.title}
                        </div>
                    ))}
                </div>
            </div>
            {song?.userId === sessionUser?.id &&
            <>
                <div className="song-edit-button">
                    <img
                        id={song?.id}
                        className="song-image edit"
                        src={require('./style/images/edit-button.png')}
                        onMouseEnter={(e) => e.target.src = (require('./style/images/edit-button-transition.png'))}
                        onMouseLeave={(e) => e.target.src = (require('./style/images/edit-button.png'))}
                        onClick={() => {
                            setShowEdit(!showEdit)
                            setEditSong(song?.id)
                            setNewTitle(song?.title)
                        }}></img>
                        {showEdit && editSong === song?.id &&
                                    <div>
                                        <input
                                            type="text"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)} />
                                        <button onClick={(e) => handleEdit(song)}>Submit</button>
                                    </div>
                                }
                </div>
                <div className="song-delete-button">
                    <img
                        id={song?.id}
                        className="song-image delete"
                        src={require('./style/images/delete-button.png')}
                        onMouseEnter={(e) => e.target.src = (require('./style/images/delete-button-transition.png'))}
                        onMouseLeave={(e) => e.target.src = (require('./style/images/delete-button.png'))}
                        onClick={(e) => handleDelete(e.target.id)}></img>
                </div>
            </>
            }
        </div>
    )
};

export default SongButtons;
