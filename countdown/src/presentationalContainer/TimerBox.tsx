/**
 * presentational component：表象コンポーネント（デザイン面）
*/

import type { ChangeEvent, FC } from 'react';
import { RepeatClockIcon as ResetIcon } from '@chakra-ui/icons';
import { Box, Button, Stat, StatLabel, StatNumber } from '@chakra-ui/react';

type Props = {
    timeLeft?: number;
    reset?: () => void;
}

// export const TimerBox: FC<Props> = ({ timeLeft = 0, reset = () => undefined }) => {
export const TimerBox: FC<Props> = (props) => {
    // 各 props にデフォルト値を指定 
    const { timeLeft = 0, reset = () => undefined } = props;

    return (
        <Box p={5} w="sm" borderWidth="1px" borderRadius="lg" boxShadow="base">
            <Stat mb={2}>
                <StatLabel fontSize={18}>Count</StatLabel>
                <StatNumber fontSize={42}>{timeLeft}</StatNumber>
            </Stat>
            <Button
                w="xs"
                colorScheme="red"
                variant="solid"
                leftIcon={<ResetIcon />}
                onClick={reset}
            >
                Reset
            </Button>
            {/* onChange と onClick */}
            <input style={{ 'width': '100%', 'margin': '1em auto', 'border': '1px solid' }} type="text" onInput={(clickEvent: ChangeEvent<HTMLInputElement>) => {
                console.log(`onChange：ChangeEvent：${clickEvent.currentTarget.value}`);
            }} />
            <input style={{ 'width': '100%', 'margin': '1em auto', 'border': '1px solid' }} type="text" onClick={(clickEvent: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
                console.log(`onClick：React.MouseEvent：${clickEvent.currentTarget.value}`);
            }} />
        </Box>
    );
}