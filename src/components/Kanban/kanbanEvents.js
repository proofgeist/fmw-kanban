//functions
import { getConfig, getFMFieldName, fmCallScript } from "fmw-utils";
import useSWR, { mutate } from "swr";
import { FIND_SCRIPT } from ".//../../constants";
export const onCardClick = cardId => {
  const obj = { id: cardId };
  // alert(cardId);
  dispatchEventToFm("click", obj);
};

function refreshData() {
  mutate("Kanban");
}

window.refreshData = refreshData;

export const onLaneDragEnd = (oldPos, newPos, payload) => {
  const obj = { id: payload.id, newPos, oldPos };
  var newObj = JSON.stringify(obj);
  dispatchEventToFm("laneDrag", obj);
};

export function dispatchEventToFm(EventType, data) {
  const options = {
    eventType: EventType
  };
  fmCallScript("KanbanEvents", data, options);
}
