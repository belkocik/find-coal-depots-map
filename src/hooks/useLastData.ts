import { useRef } from "react";

const useLastData = <S>(data: S) => {
  // while moving or zooming map data is fetched and sometimes there is undefined so we need to keep track of the last data is passed to data variable
  const ref = useRef(data);
  if (data !== null && data !== undefined) {
    ref.current = data;
  }
  return ref.current;
};

export { useLastData };
