import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { State } from '../store';

export const useField = (name: string, reducerName: keyof State) => {
  const selectorHandler = (state: State) => {
    if (typeof state[reducerName] === 'undefined') {
      throw new Error(`Reducer ${reducerName.toString()} does not exist`);
    }

    if (reducerName === 'products' || reducerName === 'recipes') {
      return state[reducerName].create[name as keyof State[keyof State]];
    }

    return state[reducerName]?.[name as keyof State[keyof State]] ?? '';
  };

  return useSelector(selectorHandler);
};
