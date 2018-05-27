function addItem(value){
  const newItem = {
    ...value,
    isLiked: false,
    completed: false,
    // setting: false,
     key: Date.now().toString(),
    // comments:[]
  };
  return newItem;
}

module.exports = { addItem }
