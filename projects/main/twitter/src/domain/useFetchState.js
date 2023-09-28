import { useReducer } from 'react';

export default function useFetchState() {
  const initialState = {
    error: '',
    loading: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'INIT':
        return {
          ...state,
          ...initialState,
        };
      case 'FETCH':
        return {
          ...state,
          error: '',
          loading: true,
        };
      case 'FULLFILLED':
        return {
          ...state,
          loading: false,
        };
      case 'REJECTED':
        return {
          ...state,
          error: action.payload,
          loading: false,
        };
      default:
        break;
    }
  }

  const [{ error, loading }, dispatch] = useReducer(reducer, initialState);

  return [
    {
      error,
      loading,
    },
    dispatch,
  ];
}
