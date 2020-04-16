import React, {
  useState
} from "react";
import Board from "@geistinteractive/react-trello";
import MyCard from "./CustomCard";
import themes from "./Style/themes";
import {
  mutate
} from "swr";
import {
  boardStyleObj,
  laneStyleObj
} from "./Style/boardStyles";
import {
  createLanesWithCards,
  reconfigureObj
} from "./kanbanUtils";
import {
  onCardClick,
  onLaneDragEnd,
  dispatchEventToFm
} from "./kanbanEvents";
import {
  useFindRecords
} from "../../customHooks";
// Add this in your component file

function KanbanBoard({
  Config,
  webDirectRefresh
}) {
  const draggable = true;
  const laneDraggable = false;
  const cardDraggable = Config.CardDraggable.value;
  const tagStyles = {};

  const theme = Config.Style.value;
  // const [theData, setData] = useState();
  const [{
    data
  }] = useState(useFindRecords("Kanban"));
  let newData, lanesAndCards;

  //GET FORMATTED LANES AND CARDS
  if (webDirectRefresh === true) {
    console.log(
      "Kanban booting after a webd refresh",
      webDirectRefresh === true
    );
    let cache = window.sessionStorage.getItem("kanban.cache");
    try {
      cache = JSON.parse(cache);
      lanesAndCards = cache.lanesAndCards;
    } catch (e) {}
  }

  //NEEDS TO BE LOCAL IN THIS FILE
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

    const lane = lanesAndCards.filter((e) => e.id === targetLaneId);
    const length = lane[0].cards.length;
    // const thisCard = lane[0].cards.filter(e => e.id === cardId);
    // const thisCardSort = thisCard.sort;
    const thisCardPosOld = lane[0].cards.findIndex(findCard);

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
    //check to see if there are two cards.

    isBeginning = position === 0;
    isEnd = length > 0 ? position === length : false;
    sameLane = targetLaneId === sourceLaneId;
    if (sameLane) {
      direction = thisCardPosOld < position ? "Down" : "Up";
    } else {
      direction = null;
    }

    //length =0: set position to be 0.

    if (length === 0) {
      finalPos = 1;
      setFinal = true;
      isEnd = false;
      isBeginning = false;
    }
    //there's one card in the lane already.
    else if (length === 1) {
      //Is at the end of the lane
      if (isEnd) {
        const prevOneCardSort = lane[0].cards[length - 1].sort;
        finalPos = prevOneCardSort + 1;
        setFinal = true;
      }
      //at the beginning of the lane
      else if (isBeginning) {
        prevPos = 0;
      }
    }
    //Same lane, moving up or down.
    else if (direction) {
      if (direction === "Up") {
        prevPos = Math.max(position - 1, 0);
      } else {
        prevPos = position + 1;
        if (prevPos === length) {
          isEnd = true;
        }
      }
    }
    //where the length of the lane is greater than one.
    else {
      if (isBeginning) {
        prevPos = 0;
      } else {
        prevPos = position - 1;
      }

      //
    }

    if (isEnd && !setFinal) {
      const prevOneCard = lane[0].cards[length - 1].sort;
      const prevTwoCard = lane[0].cards[length - 2].sort || -1;
      finalPos = prevOneCard - prevTwoCard + prevOneCard;
    }

    if (!setFinal && !isEnd) {
      prevCard = lane[0].cards[prevPos];
      nextCard = lane[0].cards[position];
      nextSort = nextCard.sort;
      prevSort = isBeginning ? 0 : prevCard.sort;
      finalPos = (nextSort + prevSort) / 2;
    }

    const obj = {
      id: cardId,
      newStatus: targetLaneId,
      newPos: finalPos,
    };

    dispatchEventToFm("cardDrag", obj);
  };

  if (data) {
    newData = reconfigureObj(data);
    lanesAndCards = createLanesWithCards(newData);
    //SET Lanes and cards to session storage
    if (webDirectRefresh === true) {
      //this will only run on WebD
      window.sessionStorage.setItem(
        "kanban.cache",
        JSON.stringify({
          lanesAndCards: lanesAndCards,
        })
      );
    }

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
    return ( <
      >
      <
      >
      <
      style dangerouslySetInnerHTML = {
        {
          __html: buildThemeColors(themes[theme]),
        }
      }
      />{" "} < / > {
        " "
      } <
      div >
      <
      Board draggable = {
        draggable
      }
      editable = {
        false
      }
      tagStyle = {
        tagStyles
      }
      style = {
        boardStyleObj
      }
      laneStyle = {
        laneStyleObj
      }
      data = {
        {
          lanes: lanesAndCards,
        }
      }
      collapsiableLanes = {
        false
      }
      handleDragEnd = {
        onDragEnd
      }
      handleLaneDragEnd = {
        onLaneDragEnd
      }
      onCardClick = {
        onCardClick
      }
      // onLaneClick={callbacks.onLaneClick ? onLaneClick : null}
      components = {
        {
          Card: MyCard,

        }
      }
      laneDraggable = {
        laneDraggable
      }
      cardDraggable = {
        cardDraggable
      } >
      <
      MyCard onClick = {
        onCardClick
      }
      data = {
        lanesAndCards
      } > {
        " "
      } <
      /MyCard>{" "} < /
      Board > {
        " "
      } <
      /div>{" "} < / >
    );
  } else {
    return null;
  }
}

export default KanbanBoard;