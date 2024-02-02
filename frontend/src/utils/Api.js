class Api {
    constructor({ url }) {
        this._url = url;

    }
    /** Обработка ответа сервера */
    _handlingServerResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
        };
    }
    /** Получение данных профиля */
    getUserData() {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })


    };
    /** Загрузка начальных карточек с сервера */
    getInitialCards() {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Отправление новых данных пользователя на сервер */
    passeUserData(name, job) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'PATCH',
            body: JSON.stringify({
                name: name,
                about: job
            })
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Добавление новой карточки */
    postNewCard(name, link) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'POST',
            body: JSON.stringify({ name, link })
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Удаление карточки */
    deleteCard(cardId) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/${cardId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'DELETE'
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Постановка лайка карточке */
    placeCardLike(cardId) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            method: 'PUT'
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Удаление лайка */
    deleteCardLike(cardId) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: 'DELETE'
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })
    }
    /** Отправка данных аватара */
    passAvatarData(avatar) {
        const token = localStorage.getItem('token');
        return fetch(`${this._url}/users/me/avatar`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            method: 'PATCH',
            body: JSON.stringify({ avatar: avatar })
        })
            .then(res => {
                return this._handlingServerResponse(res);
            })

    }
};
const api = new Api({
    url: 'http://localhost:3000',
});
export default api;