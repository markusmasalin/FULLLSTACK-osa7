import React from 'react'

const PersonForm = ({handleSubmit, newAuthor, handleAuthorChange, handleUrlChange, newTitle, handleTitleChange, newUrl, newLike, handleLikeChange}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <h3>Add new blog</h3>
              <div>
                Kirjoittajan nimi: <input 
                value={newAuthor}
                onChange={handleAuthorChange}
                />
              </div>
            </div>
            <div>aihe: <input 
                value={newTitle}
                onChange={handleTitleChange}
                />
            </div>
            <div>url: <input 
                value={newUrl}
                onChange={handleUrlChange}
                />
            </div>
            <div>Tykkäysten määrä: <input 
                value={newLike}
                onChange={handleLikeChange}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default PersonForm