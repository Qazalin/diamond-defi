export type ActionType = "add" | "remove" | "replace";

export type deployConfigType = {
  names: string[];
  actions: ActionType[];
};
