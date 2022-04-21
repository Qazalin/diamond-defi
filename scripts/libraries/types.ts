export type ActionType = "add" | "remove" | "replace";

export type deployConfigType = {
  names: string[];
  actions: ActionType[];
};

export type CutActionType = {
  facetAddress: string;
  action: number;
  functionSelectors: any[];
};
