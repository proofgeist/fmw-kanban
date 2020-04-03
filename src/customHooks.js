import { fmFetch, getConfig } from "fmw-utils";
import useSWR from "swr";
import { FIND_SCRIPT } from "./constants";
/*
Custom Hooks are your friend. 
SWR makes it trivial to right hooks that keep the data up to date.
you'll likely need one for each find you do.
*/

/**
 * performs a find on the sample data
 * @param {string} primaryKeyQuery
 */
export const useFindRecords = query => {
  //async function for SWR
  const PrimaryKeyField = getConfig("PrimaryKeyField");
  const sortField = getConfig("SortField");
  const fetcher = async () => {
    const req = {
      layouts: getConfig("DataSourceLayout"),
      limit: 500,
      query: [{ [PrimaryKeyField]: "*" }],
      sort: [{ fieldName: sortField, sortOrder: "ascend" }]
    };

    const result = await fmFetch(FIND_SCRIPT, req);
    if (result.messages[0].code !== "0") {
      throw new Error(
        `Error: ${result.messages[0].code}. ${result.messages[0].message}`
      );
    }
    const dataArray = result.response.data;
    const obj = { style: getConfig("Style") };
    if (window.onWebdInternalRefresh) {
      // this will only run on WebD
      window.sessionStorage.setItem(
        "kanban.cache",
        JSON.stringify({
          theme: getConfig("Style")
        })
      );
    }
    return dataArray;
  };

  //ask swr to take it from here.
  return useSWR("Kanban", fetcher, { refreshInterval: 6000000 });
};
