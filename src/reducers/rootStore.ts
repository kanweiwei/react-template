type RootState = {
  [propName: string]: unknown;
};

const initState: RootState = {};

export default (state = initState, action: { type: unknown }): unknown => {
  switch (action.type) {
    default:
      //
      return state;
  }
};
