import { useState } from "react";
import { useCallback, useEffect } from "react";

import { ServiceEventEmitter } from "../../utils/eventEmitter/event.emitter";

import { GeneralService } from "./general.service";

type OmitMethods<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

export type mvoieServiceProps = OmitMethods<GeneralService>;

export function useGeneralServiceValue<K extends keyof mvoieServiceProps>(key: K): GeneralService[K] {
  const [state, setState] = useState(GeneralService.getInstance()[key]);
  useEffect(() => {
    const handleChange = (value: GeneralService[K]) => {
      setState(value);
    };

    ServiceEventEmitter.addListener(key, handleChange);

    return () => {
      ServiceEventEmitter.removeListener(key, handleChange);
    };
  }, [key]);

  return state;
}

export function useSetGeneralService<K extends keyof mvoieServiceProps>(key: K): (value: GeneralService[K]) => void {
  const setterWrapper = useCallback(
    (value: GeneralService[K]) => {
      GeneralService.getInstance()[key] = value;
    },
    [key]
  );

  return setterWrapper;
}

export function useGeneralService<K extends keyof mvoieServiceProps>(key: K): [GeneralService[K], (value: GeneralService[K]) => void] {
  return [useGeneralServiceValue(key), useSetGeneralService(key)];
}
