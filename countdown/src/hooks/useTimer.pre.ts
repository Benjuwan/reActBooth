import { SyntheticEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useGetPrimes } from './useGetPrimes';

/**
 * useTimer の型注釈 [number, () => void] はタプル。
 * タプル：関数は本来 1関数につき 1値しか返せないが複数の値を配列（に格納する形）で返せる仕組みがあり、そうして返される値をタプルという。タプルはそれぞれの値の型を指定できる（例：[string, number, boolean]）
*/

// export const useTimer = (maxCount: number): [number, () => void] => {
export const useTimerPre = (maxCount: number): [number, boolean, () => void] => {
  const { GetPrimes } = useGetPrimes();
  // const primes = GetPrimes(maxCount);
  const primes = useMemo(() => GetPrimes(maxCount), [maxCount]);

  /* 「useRef は ref 属性だけじゃなく、汎用的な値にも使うことができる */
  const intervalId = useRef<ReturnType<typeof setInterval>>();

  const [timeLeft, setTimeLeft] = useState(maxCount);

  // const tick = () => setTimeLeft((t) => t - 1);
  const tick = useCallback(() => setTimeLeft((t) => t - 1), []);

  // const reset = () => setTimeLeft(maxCount);
  // const reset = (event?: SyntheticEvent) => {
  //   /* stopPropagation：子要素のクリックイベント発火に伴う、親要素のクリックイベント発火連鎖を防止 */
  //   event?.stopPropagation();
  //   setTimeLeft(maxCount);

  //   if (intervalId.current !== undefined) {
  //     clearInterval(intervalId.current);
  //   }
  //   // setTimeLeft(maxCount);
  //   intervalId.current = setInterval(tick, 1000);
  // };

  const reset = useCallback((event?: SyntheticEvent) => {
    event?.stopPropagation();
    setTimeLeft(maxCount);

    /* 既に intervalId.current が存在する場合はクリーン（リセット）した後に、
    （※存在しない場合はただ単に）新たな intervalId.current を生成する */
    if (intervalId.current !== undefined) {
      clearInterval(intervalId.current);
    }
    intervalId.current = setInterval(tick, 1000);
  }, [maxCount, tick]);

  useEffect(() => {
    // const timerId = setInterval(tick, 1000);

    /* 処理後にクリーンにするため、return () => clearInterval(timerId); という記述。clearInterval(timerId); だと即時（クリーン）処理になりタイマーが機能しなくなる */
    // return () => clearInterval(timerId);
    // clearInterval(timerId);

    reset();
    return () => clearInterval(intervalId.current);
  }, []);

  useEffect(() => {
    // if (timeLeft === 0) reset();
    if (timeLeft === 0) {
      reset();
    }
  }, [timeLeft, maxCount]); // eslint-disable-line react-hooks/exhaustive-deps

  return [timeLeft, primes.includes(timeLeft), reset];
};
