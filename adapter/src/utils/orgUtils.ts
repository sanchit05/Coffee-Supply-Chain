import * as constants from "./constants";

export const getRandomOrg = (arr: string[], n: number) => {
  try {
    let result: string[] = new Array(n),
      len = arr.length,
      taken = new Array(len);
  
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
  
    while (n--) {
      let x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
  
    return result;
  } catch (err) {
    console.error(`Error while getting random org`);
    return [];
  }
}

export const getEndorsingOrgs = () => {
  const allOrgs: string[] = [
    constants.FARMER_ORG_NAME,
    constants.PROCESSOR_ORG_NAME,
    constants.ROASTER_ORG_NAME,
    constants.SUPPLIER_ORG_NAME,
    constants.RETAILER_ORG_NAME
  ];

  return allOrgs;
}