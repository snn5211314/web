import { LocalStorage } from 'storage-manager-js'

// set 
export const setItem = function (key, value) {
    LocalStorage.set(key, value)
}

// get
export const getItem = function (key) {
    return LocalStorage.get(key)
}

// delete
export const removeItem = function (key) {
    LocalStorage.delete(key)
}

export const removeAll = function () {
    LocalStorage.deleteAll()
}