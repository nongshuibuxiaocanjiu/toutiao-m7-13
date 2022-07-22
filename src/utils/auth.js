import storage from './storage'

const TOKEN_KEY = 'HEIMATOUTIAO_TOKEN'

export const getToken = () => storage.get(TOKEN_KEY)

export const setToken = (token) => storage.set(TOKEN_KEY, token)

export const removeToken = () => storage.remove(TOKEN_KEY)

const SearchHistory = 'SearchHistory'

export const gethistory = () => storage.get(SearchHistory)

export const sethistory = (token) => storage.set(SearchHistory, token)
