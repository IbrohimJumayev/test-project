export const saveToLocalStorage = (name: string, data: any): void => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getFromLocalStorage = (name: string): any | null => {
  const item = localStorage.getItem(name);
  return item ? JSON.parse(item) : null;
};
