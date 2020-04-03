//functions
import { fmCallScript } from "fmw-utils";
import { mutate } from "swr";
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
  dispatchEventToFm("laneDrag", obj);
};

export function dispatchEventToFm(EventType, data) {
  const options = {
    eventType: EventType
  };
  fmCallScript("KanbanEvents", data, options);
}
