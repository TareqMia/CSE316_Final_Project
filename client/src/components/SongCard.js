import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [ draggedTo, setDraggedTo ] = useState(0);
    const { song, index } = props;

    function handleDragStart(event) {
        event.dataTransfer.setData("song", index);
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(true);
    }

    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }

    function handleDrop(event) {
        event.preventDefault();
        let targetIndex = index;
        let sourceIndex = Number(event.dataTransfer.getData("song"));
        setDraggedTo(false);

        // UPDATE THE LIST
        store.addMoveSongTransaction(sourceIndex, targetIndex);
    }
    function handleRemoveSong(event) {
        store.showRemoveSongModal(index, song);
    }
    
    function handleEditSong(event) {
        store.showEditSongModal(index, song);
    }

    const handleSelectSong = (event) => {
        store.setSongIndex(index);
    }

    let cardClass = "list-card unselected-list-card";
    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onClick={handleSelectSong}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
            style={{display: 'flex', justifyContent: 'space-between'}}
        >
            <div>
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                target='_blank'
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>

            </div>

             {!store.currentList.published ? 
             
             <div style={{display: 'flex', flexDirection: 'row'}}>
                <input
                    type='button'
                    id={"edit-song-" + index}
                    className="list-card-button"
                    value={'✎'}
                    onClick={handleEditSong}
                
                />
            
                <input

                    type="button"
                    id={"remove-song-" + index}
                    className="list-card-button"
                    // value={"\u2715"}
                    value={'x'}
                    onClick={handleRemoveSong}
                />
            </div> : null }
        </div>
    );
}

export default SongCard;