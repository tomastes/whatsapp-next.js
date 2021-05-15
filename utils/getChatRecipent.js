export const getChatRecipent = (users, userLoggedIn) => {
  return users?.filter((user) => user !== userLoggedIn?.email)[0];
};
