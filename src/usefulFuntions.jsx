function addItemToList(data, id) {
    var newItem = {
        id: id || guidGenerator(),
        pos: { x: 200, y: 200 },
        rot: { deg: 0 },
        zIndex: 10000 + Object.keys(items).length,
        type: 'text',
        ...data,
    };
    const updatedItems = { ...items, [newItem.id]: newItem };
    setItems(updatedItems);
    debounceElemdataHistoryUpdate(pastItems, updatedItems, undoCount);
    setSelected([newItem.id]);
}

const providerValues = {
    items: items,
    selected: selected,
    setSelected: (item) => {
        setSelected([item]);
        // setSelected([...selected, item])
    },
    deleteItemFromList: deleteItemFromList,
    addItemToList: addItemToList,
    onUpdateDiv: onUpdateDiv,
    mode: mode,
    setModal: setModal,
  };