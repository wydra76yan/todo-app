function addItem(value){
  const newItem = {
    ...value,
    isLiked: false,
    isCompleted: false,
    key: Date.now().toString(),
    comments: null,
  };
  return newItem;
}

module.exports = { addItem }
