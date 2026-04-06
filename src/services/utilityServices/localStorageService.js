export const getUsers = () => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

export const setUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const getSession = () => {
  const session = localStorage.getItem("session");
  return session ? JSON.parse(session) : null;
};

export const setSession = (user) => {
  localStorage.setItem("session", JSON.stringify(user));
};

export const clearSession = () => {
  localStorage.removeItem("session");
};

export const getTransaction = () => {
    const transaction = localStorage.getItem("transaction");
    return transaction? JSON.parse(transaction) : [];
};

export const setTransaction = (transaction) => {
    localStorage.setItem("transaction", JSON.stringify(transaction));
};