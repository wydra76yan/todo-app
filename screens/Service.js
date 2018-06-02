function addItem(value){
  const newItem = {
    ...value,
    isLiked: false,
    isCompleted: false,
    isSetting: false,
    key: Date.now().toString(),
    comments: ['kek', 'lol']
  };
  return newItem;
}

module.exports = { addItem }
