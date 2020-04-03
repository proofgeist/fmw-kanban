import { getConfig, getFMFieldName } from "fmw-utils";
export const createLanesFromRecords = data => {
  const lanes = [];

  return lanes;
};

export const reconfigureObj = data => {
  const primaryKeyFn = getFMFieldName("PrimaryKeyField");
  const cardStyleF = getFMFieldName("CardStyle");
  const titleF = getFMFieldName("TitleField");
  const descriptionF = getFMFieldName("DescriptionField");
  const statusF = getFMFieldName("StatusField");
  const labelF = getFMFieldName("LabelField");
  const additionalF = getFMFieldName("AdditionalInfoField");
  const sortF = getFMFieldName("SortField");
  const assignedToF = getFMFieldName("AssignedTo");

  const newArray = data.map(function(e, i) {
    let primaryKey = e.fieldData[primaryKeyFn];

    let title,
      description,
      status,
      label,
      additional,
      sort,
      assignedTo,
      cardStyle;

    if (titleF) {
      title = e.fieldData[titleF];
    }
    if (descriptionF) {
      description = e.fieldData[descriptionF];
    }
    if (statusF) {
      status = e.fieldData[statusF];
    }
    if (labelF) {
      label = e.fieldData[labelF];
    }
    if (cardStyleF) {
      cardStyle = e.fieldData[cardStyleF];
    }
    if (additionalF) {
      additional = e.fieldData[additionalF];
    }
    if (sortF) {
      sort = e.fieldData[sortF];
    }
    if (assignedToF) {
      assignedTo = getInitials(e.fieldData[assignedToF]);
    }
    const obj = {
      id: primaryKey,
      title,
      description,
      status,
      label,
      additional,
      sort,
      assignedTo,
      cardStyle
    };
    return obj;
  });
  return newArray;
};
export const createLanesWithCards = data => {
  const lanes = createLanesObj(getUniqueLanes(data));
  console.log("Lanes", lanes);
  const obj = lanes.map(function(item, i) {
    var whichLaneId = item.id;
    const getCards = data.filter(item => item.status === whichLaneId);
    item.cards = getCards;
    // item.style = { ...laneStyleObj, ...item.style };
    return item;
  });
  return obj;
};

const getUniqueLanes = data => {
  const statusSortOrder = getConfig("LaneSortOrder");
  let unique;

  if (statusSortOrder) {
    return statusSortOrder;
  } else {
    unique = [...new Set(data.map(item => item.status))];
    return unique.sort();
  }
};

const createLanesObj = lanes => {
  const newLanes = lanes.map(function(e, i) {
    let newObj = { id: e, laneTextColor: "#fff", position: i, title: e };
    return newObj;
  });

  return newLanes;
};
// export const createLanesWithCardsOld = (lanes, laneStyleObj, cardStyleObj) => {
//   const obj = lanes.map(function(item, i) {
//     var whichLaneId = item.id;
//     const getCards = cardsWithStyles.filter(
//       item => item.laneId === whichLaneId
//     );
//     item.cards = getCards;
//     item.style = { ...laneStyleObj, ...item.style };
//     return item;
//   });
//   return obj;
// };

export const setStylesToCards = (cards, cardStyles) => {
  const obj = cards.map(function(item, i) {
    item.cardStyles = cardStyles;
    return item;
  });
  return obj;
};

// export const cardsWithStyles = (cards, cardStyles) => {
//   const obj = cards.map(function(item, i) {
//     item.cardStyles = cardStyles;
//     return item;
//   });
//   return obj;
// };
export const getInitials = str => {
  const arr = str.split(" ");
  const l = arr.length;
  let initials;

  if (l === 3) {
    initials = arr[0].substring(0, 1) + arr[2].substring(0, 1);
  } else if (l === 2) {
    initials = arr[0].substring(0, 1) + arr[1].substring(0, 1);
  } else {
    initials = arr[0].substring(0, 1);
  }
  return initials;
};
