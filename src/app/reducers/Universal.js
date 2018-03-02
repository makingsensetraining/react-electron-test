
const initialState = {
  toggles: { openNotification: false },
  storages: {},
  temporalStates: {},
};

const Universal = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_MODULE':
    return Object.assign({}, {
      request: {
        error: false,
        process: true,
      },
    });

  case 'UPDATE_MODULE_SUCCESS':
    return state;

  case 'FETCH_MODULE_SUCCESS':
    return Object.assign({}, state, {
      [(action.module === 'uniques' ? `unique-${action.payload.query.prop}` : action.module)]: {
        docs: action.payload.docs,
        page: action.payload.page,
        limit: action.payload.limit,
        totalPages: action.payload.totalPages,
        query: action.payload.query,
      },
      request: {
        error: false,
        process: false,
      },
    });

  case 'FETCH_MODULE_ERROR':
    return Object.assign({}, state, { request: {
      error: true,
      msg: action.payload.error,
      process: false,
    }});

  case 'TOGGLE_PROP':
    return {
      ...state,
      ...{
        toggles: {
          [action.key]: !state.toggles[action.key],
        },
      },
    };

  case 'ADD_TO_TEMPORAL_STORAGE':
    if (typeof state.storages[action.storage] === 'undefined') {
      return Object.assign({}, state, {
        storages: {
          [action.storage]: [...[], action.item],
        },
      });
    }
    return Object.assign({}, state, {
      storages: {
        [action.storage]: [...state.storages[action.storage], action.item],
      },
    });

  case 'REMOVE_TO_TEMPORAL_STORAGE':
    if (typeof state.storages[action.storage] === 'undefined') return { ...state };
    return Object.assign({}, state, {
      storages: {
        [action.storage]: state.storages[action.storage].filter(n => n[action.key] !== action.item[action.key]),
      },
    });

  case 'SET_TEMPORAL_STATE':
    return Object.assign({}, state, {
      temporalStates: {
        [action.state]: action.value,
      },
    });

  default:
    return state;
  }
};

export default Universal;
