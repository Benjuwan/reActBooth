/**
 * container component：デザイン面を包含した機能付きコンポーネント
*/

import type { FC } from 'react';

// カウントダウン機能
import { useTimer } from 'hooks/useTimer';

// presentational component：表象コンポーネント（デザイン面）
import { TimerBox } from './TimerBox';

type Props = { maxCount?: number };
const MAX_COUNT = 60;

export const CountdownTimer: FC<Props> = ({ maxCount = MAX_COUNT }) => {
    const [timeLeft, reset] = useTimer(maxCount);

    return (
        <>
            {/* <TimerBox {...{ timeLeft, reset }} /> */}
            <TimerBox timeLeft={timeLeft} reset={reset} />
        </>
    );
};