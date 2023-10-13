import type { ChangeEvent, FC, SyntheticEvent } from 'react';
import { useMemo, useState, useDeferredValue } from 'react';
import { Box, Checkbox, Container, FormLabel, Input } from '@chakra-ui/react';
import Users from './Users';

const ProfileWriter: FC<{ count?: number }> = ({ count = 1 }) => {
  const [username, setUsername] = useState('');
  const [enableDeferred, seteEableDeferred] = useState(false);
  const deferedUsename = useDeferredValue(username);

  // const changeUsername = (event: SyntheticEvent) => {
  //   const target = event.target as HTMLInputElement; // 型アサーション：型推論の上書き
  //   setUsername(target.value);
  // };
  // const changeEnableDeferred = (event: SyntheticEvent) => {
  //   const target = event.target as HTMLInputElement; // 型アサーション：型推論の上書き
  //   seteEableDeferred(target?.checked);
  // };

  /* ChangeEvent を使用 */
  const changeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const changeEnableDeferred = (event: ChangeEvent<HTMLInputElement>) => {
    seteEableDeferred(event.target.checked);
  };

  const deferredUsers = useMemo(
    () => <Users username={deferedUsename} count={count} />,
    [deferedUsename, count]
  );

  return (
    <Container centerContent>
      <Box p={3} w="sm">
        <FormLabel htmlFor="username" mt={2}>
          ユーザー名を入力…
        </FormLabel>
        <Input
          size="md"
          maxLength={18}
          value={username}
          onChange={changeUsername}
        />
        <Checkbox
          mt={4}
          checked={enableDeferred}
          onChange={changeEnableDeferred}
        >
          useDeferredValue を使う
        </Checkbox>
      </Box>
      {enableDeferred ? (
        deferredUsers
      ) : (
        <Users username={deferedUsename} count={count} />
      )}
    </Container>
  );
};

export default ProfileWriter;
