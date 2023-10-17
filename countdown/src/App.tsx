import type { FC } from 'react';
import { Heading } from '@chakra-ui/react';
import { Timer } from 'components/Timer';
import { CountdownTimer } from 'presentationalContainer/CountdownTimer';
import './App.css';

const App: FC = () => (
  <>
    <Heading size="lg" as="h1" my={8}>
      {import.meta.env.VITE_APP_TITLE}
    </Heading>
    {/* <Timer /> */}

    {/* CountdownTimer：container component */}
    <CountdownTimer />
  </>
);

export default App;
