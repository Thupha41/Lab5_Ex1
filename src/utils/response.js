const formatResponse = (action, status, data) => {
  return {
    action,
    status,
    "User/Product/ShoppingCart": data,
  };
};

export { formatResponse };
