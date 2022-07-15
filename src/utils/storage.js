//
class Storage {
  get (key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  remove (key) {
    localStorage.removeItem(key)
  }
}
const storage = new Storage()
export default storage
