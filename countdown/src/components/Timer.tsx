import { useRef, type FC } from 'react';
import { RepeatClockIcon as ResetIcon } from '@chakra-ui/icons';
import { Box, Button, Stat, StatLabel, StatNumber } from '@chakra-ui/react';
// import { useTimer } from 'hooks/useTimer';
import { useTimerPre } from 'hooks/useTimer.pre';

type Props = { maxCount?: number };
const MAX_COUNT = 60;

export const Timer: FC<Props> = ({ maxCount = MAX_COUNT }) => {
  // const [timeLeft, reset] = useTimer(maxCount);
  const [timeLeft, isPrime, reset] = useTimerPre(maxCount);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const onClick = () => inputRef.current?.focus();
  /** 
   *「useRef で定義した値は .current という書き換え可能なプロパティを持つ。
   * それを組み込みコンポーネントの ref に入れておくと、React がリアル DOM を出力した際にその対応する要素を参照する値が.current の中に設定される 
  */

  return (
    <Box p={5} w="sm" borderWidth="1px" borderRadius="lg" boxShadow="base">
      <Stat mb={2}>
        <StatLabel fontSize={18}>Count</StatLabel>
        {/* <StatNumber fontSize={42}>{timeLeft}</StatNumber> */}
        <StatNumber fontSize={42} color={isPrime ? 'pink.300' : 'black'}>
          {timeLeft}
        </StatNumber>
      </Stat>
      <input style={{ 'border': '1px solid #333', 'width': '100%', 'marginBottom': '1em' }} type="text" ref={inputRef} placeholder='素数の時だけピンク色になる' />
      <Button
        w="xs" colorScheme="red" variant="solid" leftIcon={<ResetIcon />} onClick={
          // reset

          () => {
            reset();
            onClick();
          }
        }
      >
        Reset + 押すとフォーカス
      </Button>
    </Box>
  );
};