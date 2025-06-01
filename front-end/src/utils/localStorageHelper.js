export const getFromLocalStorage = (key, parseJson = false) => {
    try {
      const value = localStorage.getItem(key);
      if (parseJson && value) {
        return JSON.parse(value);
      }
      return value;
    } catch (error) {
      console.error(`Error reading key "${key}" from localStorage:`, error);
      return null;
    }
  };
  