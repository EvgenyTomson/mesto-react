const apiOptions = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '14bcc1cd-5619-4964-8098-6c46ced3ee82',
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Проверяем статус ответа сервера:
  _checkResponseStatus(response, method) {
    return response.ok ? response.json() : Promise.reject(`Ошибка в ${method}: ${response.status}`)
  }

  // загрузка карточек с сервера:
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._headers,
      })
        .then(res => {
          return this._checkResponseStatus(res, 'getInitialCards')
        })
  }

  // загрузка данных пользователя с сервера:
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
        .then(res => {
          return this._checkResponseStatus(res, 'getUserData')
        })
  }

  // Редактирование профиля пользователя на сервере:
  editUserData(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(userData)
      })
        .then(res => {
          return this._checkResponseStatus(res, 'editUserData')
        })
  }

  // Добавление новой карточки:
  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(cardData)
      })
        .then(res => {
          return this._checkResponseStatus(res, 'addNewCard')
        })
  }

  // Удаление СВОЕЙ карточки с сервера:
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(res => {
          return this._checkResponseStatus(res, 'deleteCard')
        })
  }

  // Постановка и снятие лайка:
  _addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
        .then(res => {
          return this._checkResponseStatus(res, 'addLike')
        })
  }

  _removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(res => {
          return this._checkResponseStatus(res, 'removeLike')
        })
  }

  toggleCardLikeStatus(cardId, isLiked) {
    return isLiked ? this._removeLike(cardId) : this._addLike(cardId)
  }

  // Обновление аватара пользователя:
  editUserAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar : avatarUrl
        })
      })
        .then(res => {
          return this._checkResponseStatus(res, 'editUserAvatar')
        })
  }
}

const api = new Api(apiOptions);

export default api;
