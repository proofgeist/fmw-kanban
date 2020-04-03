import React, { useState } from "react";
import Board from "react-trello";
import MyCard from "./CustomCard";
import themes from "./Style/themes";
import { mutate } from "swr";
import { boardStyleObj, laneStyleObj } from "./Style/boardStyles";
import { createLanesWithCards, reconfigureObj } from "./kanbanUtils";
import { onCardClick, onLaneDragEnd, dispatchEventToFm } from "./kanbanEvents";
import { useFindRecords } from "../../customHooks";
// Add this in your component file
require("react-dom");
window.React2 = require("react");
// const

function KanbanBoard({ Config, webDirectRefresh }) {
  const draggable = true;
  const laneDraggable = false;
  const cardDraggable = Config.CardDraggable.value;
  const tagStyles = {};

  const theme = Config.Style.value;
  // const [theData, setData] = useState();
  const [{ data }] = useState(useFindRecords("Kanban"));
  let newData, lanesAndCards;
  if (webDirectRefresh === true) {
    console.log(
      "Kanban booting after a webd refresh",
      webDirectRefresh === true
    );
    let cache = window.sessionStorage.getItem("kanban.cache");
    try {
      cache = JSON.parse(cache);
      theme = cache.theme;
    } catch (e) {}
  }
  const onDragEnd = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    function findCard(e) {
      return e.id === cardId;
    }

    const lane = lanesAndCards.filter(e => e.id === targetLaneId);
    const length = lane[0].cards.length;
    console.log(lane, length, position);
    // const thisCard = lane[0].cards.filter(e => e.id === cardId);
    // const thisCardSort = thisCard.sort;
    const thisCardPosOld = lane[0].cards.findIndex(findCard);

    console.log(thisCardPosOld);
    let finalPos,
      prevPos,
      prevCard,
      nextCard,
      prevSort,
      nextSort,
      isBeginning,
      isEnd,
      sameLane,
      setFinal,
      direction;
    console.log(cardId);
    //check to see if there are two cards.

    isBeginning = position === 0;
    isEnd = length > 0 ? position === length : false;
    sameLane = targetLaneId === sourceLaneId;
    if (sameLane) {
      direction = thisCardPosOld < position ? "Down" : "Up";
    } else {
      direction = null;
    }
    console.log(isBeginning, isEnd);
    console.log("Same lane", sameLane, "Direction", direction);

    //length =0: set position to be 0.

    if (length === 0) {
      // alert("Len = 0");
      finalPos = 1;
      setFinal = true;
      isEnd = false;
      isBeginning = false;
    }
    //there's one card in the lane already.
    else if (length === 1) {
      // alert("len 1");
      //Is at the end of the lane
      if (isEnd) {
        // alert("1 and end");
        const prevOneCardSort = lane[0].cards[length - 1].sort;
        finalPos = prevOneCardSort + 1;
        setFinal = true;
      }
      //at the beginning of the lane
      else if (isBeginning) {
        // alert("1 and beg");
        prevPos = 0;
      }
    }
    //Same lane, moving up or down.
    else if (direction) {
      // alert("direction");
      if (direction === "Up") {
        // alert("Up");
        prevPos = Math.max(position - 1, 0);
      } else {
        // alert("down");
        prevPos = position + 1;
        if (prevPos === length) {
          isEnd = true;
        }
      }
    }
    //where the length of the lane is greater than one.
    else {
      // alert("else");
      if (isBeginning) {
        prevPos = 0;
      } else {
        // alert("prev");
        prevPos = position - 1;
      }

      //
    }

    console.log("Pos", position, "Prev", prevPos);
    if (isEnd && !setFinal) {
      // alert("End");
      const prevOneCard = lane[0].cards[length - 1].sort;
      const prevTwoCard = lane[0].cards[length - 2].sort || -1;
      finalPos = prevOneCard - prevTwoCard + prevOneCard;
    }

    if (!setFinal && !isEnd) {
      prevCard = lane[0].cards[prevPos];
      console.log(prevCard);
      nextCard = lane[0].cards[position];
      nextSort = nextCard.sort;
      prevSort = isBeginning ? 0 : prevCard.sort;
      finalPos = (nextSort + prevSort) / 2;
    }
    //length = 1 and isEnd
    //length = 1 and isBeginning
    //length > 1 and isEnd
    //length > 1 and isBeginning
    //length > 1

    console.log("Pos", position, "prev", prevPos, "final", finalPos);
    const obj = {
      id: cardId,
      newStatus: targetLaneId,
      newPos: finalPos
    };

    dispatchEventToFm("cardDrag", obj);
    // setData(mutate("Kanban"));
    console.log(lanesAndCards);
  };

  if (data) {
    newData = reconfigureObj(data);
    lanesAndCards = createLanesWithCards(newData);

    // console.log("Unique", createLanesWithCards(newData));

    //Need to set the data correctly.

    function buildThemeColors(stylesToModify) {
      let styles = "";

      if (stylesToModify && stylesToModify.length > 0) {
        for (let i = 0; i < stylesToModify.length; i++) {
          styles += ` .${stylesToModify[i].name} ${stylesToModify[i].styleString}`;
        }
      }

      // console.log("STYLES", styles);

      return styles;
    }
    return (
      <>
        <>
          <style
            dangerouslySetInnerHTML={{
              __html: buildThemeColors(themes[theme])
            }}
          />
        </>
        <div>
          <Board
            draggable={draggable}
            editable={false}
            tagStyle={tagStyles}
            style={boardStyleObj}
            laneStyle={laneStyleObj}
            data={{ lanes: lanesAndCards }}
            collapsiableLanes={false}
            handleDragEnd={onDragEnd}
            handleLaneDragEnd={onLaneDragEnd}
            onCardClick={onCardClick}
            // onLaneClick={callbacks.onLaneClick ? onLaneClick : null}
            components={{ Card: MyCard }}
            laneDraggable={laneDraggable}
            cardDraggable={cardDraggable}
          >
            <MyCard onClick={onCardClick} data={lanesAndCards}></MyCard>
          </Board>
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default KanbanBoard;
