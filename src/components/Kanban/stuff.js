const refreshData = (lanes, cards) => {
  var theLanes = JSON.parse(lanes);
  var theCards = JSON.parse(cards);
  console.log(cardStyles);

  const cardsWithStyles = theCards.map(function(item, i) {
    item.cardStyles = cardStyles;
    item.tagStyle = tagStyles;
    return item;
  });
  // setLaneStyles({ ...laneStyleObj, ...laneStyles });

  const theObj = { lanes: finalObj };
  // console.log("New", d);
  setData(theObj);
};
window.refreshData = refreshData;

const sendAllChanges = () => {
  const obj = JSON.stringify(changes);
  window.FileMaker.PerformScript("Show All Changes", obj);
};
window.sendAllChanges = sendAllChanges;

const onLaneClick = laneId => {
  const obj = { laneId };
  var newObj = JSON.stringify(obj);

  window.FileMaker.PerformScript(callbacks.onLaneClick, newObj);
};

const onCardClick = cardId => {
  // alert("Hi");
  const obj = { id: cardId };
  var newObj = JSON.stringify(obj);
  window.FileMaker.PerformScript(callbacks.onCardClick, newObj);
};

const onLaneDragEnd = (oldPos, newPos, payload) => {
  const obj = { laneId: payload.id, newPos, oldPos };
  console.log(obj);
  var newObj = JSON.stringify(obj);
  window.FileMaker.PerformScript(callbacks.onLaneDragEnd, newObj);
};
const updateStyles = (
  FMBoardStyles,
  FMLaneStyles,
  FMCardStyles,
  FMTagStyles
) => {
  const updateLaneStyles = JSON.parse(FMLaneStyles);
  console.log({ updateLaneStyles });
  setLaneStyles({ ...laneStyleObj, ...updateLaneStyles });
  setBoardStyles(JSON.parse(FMBoardStyles));
  setCardStyles(JSON.parse(FMCardStyles));
  setTagStyles(JSON.parse(FMTagStyles));
};

window.updateStyles = updateStyles;

const onDragEnd = (
  cardId,
  sourceLaneId,
  targetLaneId,
  position,
  cardDetails
) => {
  const obj = {
    cardId: cardId,
    oldStatus: sourceLaneId,
    newStatus: targetLaneId,
    newPos: position
  };
  console.log("before", changes);
  changes.push(obj);
  var newObj = JSON.stringify(obj);

  window.FileMaker.PerformScript(callbacks.onDragEnd, newObj);

  setChanges(changes);
  // console.log(changes);
};
