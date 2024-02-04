class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }

    checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserData() {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkResponse);
    }

    getInitialCards() {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkResponse);
    }

    editProfile(userName, userAbout) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userName,
                about: userAbout,
            })
        })
            .then(this.checkResponse);
    }

    addNewCard(newName, newUrl) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newName,
                link: newUrl,
            })
        })
            .then(this.checkResponse);
    }

    deleteCard(cardId) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkResponse);
    }

    setLike(cardId) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkResponse);
    }

    removeLike(cardId) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkResponse);
    }

    changeAvatar(avatarSrc) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                avatar: avatarSrc,
            })
        })
            .then(this.checkResponse);
    }
}

const api = new Api({
    url: 'https://api.tomm.nomoredomainsmonster.ru',
});

export default api;
