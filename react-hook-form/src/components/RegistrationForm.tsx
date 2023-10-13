import type { FC, ChangeEvent, SyntheticEvent } from 'react';
import { useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';


// const genderCode = {
/* registrationForm.ts で使用するため export */
export const genderCode = {
  f: '女性',
  m: '男性',
  n: 'それ以外',
} as const;
// as const を付けるとプロパティが readonly になる

type FormData = {
  username: string;
  zipcode?: string;
  gender?: keyof typeof genderCode;
  isAgreed: boolean;
}



/* npm install react-hook-form */



export const NoValidateRegistrationForm: FC = () => {
  // const [formData, setFormData] = useState<FormData>({
  //   username: '',
  //   isAgreed: false,
  // });

  const {
    register,
    handleSubmit,
    reset
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      isAgreed: false
    }
  });

  // const handleSubmit = (event: SyntheticEvent) => {
  //   event.preventDefault();
  //   console.log(formData);
  // };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  }

  const onReset = (event: SyntheticEvent) => {
    /* onClickイベント実行時のバブリングに伴う親のイベント発火を防止 */
    event.stopPropagation();
    reset();
  }

  // const handleChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name } = event.target;
  //   const value =
  //     event.target.type === 'checkbox'
  //       ? (event.target as HTMLInputElement).checked
  //       : event.target.value;
  //   setFormData((state) => ({ ...state, [name]: value }));
  // };

  return (
    <Box p={3} w="md" borderWidth="1px" borderRadius="lg" boxShadow="base">
      {/* <form onSubmit={handleSubmit}> */}

      {/* handleSubmit：引数として関数を受け取り、フォームが送信されたときにフォームデータをその関数に渡して実行する高階関数（高階関数：関数を引数に取ったり、関数を戻り値として返したりする）*/}
      <form onSubmit={handleSubmit(onSubmit)} action='/hoge'>
        <FormLabel htmlFor="username" mt={2}>
          ユーザー名
        </FormLabel>
        {/* <Input
          name="username"
          size="md"
          value={formData.username}
          onChange={handleChange}
        /> */}

        {/* register：この関数の戻り値には ref のプロパティが含まれてる。それを展開してフォーム要素の属性として与えることで、非制御コンポーネントとして対応するリアル DOM を React Hook Form が管理下に置く */}
        <Input size="md" {...register('username')} />

        <FormLabel htmlFor="zipcode" mt={4}>
          郵便番号
        </FormLabel>
        {/* ここで設定できる maxLength はあくまでバリデーションのためのもの */}
        <Input size="md" maxLength={7} {...register('zipcode')} />

        {/* <Select
          name="gender"
          my={6}
          placeholder="性別を選択…"
          value={formData.gender}
          onChange={handleChange}
        > */}
        <Select my={6} placeholder="性別を選択…" {...register('gender')}>

          {Object.entries(genderCode).map(([code, name]) => (
            <option value={code} key={code}>
              {name}
            </option>
          ))}
        </Select>

        {/* <Checkbox
          name="isAgreed"
          isChecked={formData.isAgreed}
          onChange={handleChange}
        > */}
        <Checkbox {...register('isAgreed')}>

          規約に同意する
        </Checkbox>
        <ButtonGroup my={3} w="xs">
          {/* <Button w="30%" colorScheme="orange" variant="solid" type="reset"> */}
          <Button w="30%" colorScheme="orange" variant="solid" onClick={onReset}>

            リセット
          </Button>
          <Button w="70%" colorScheme="blue" variant="solid" type="submit">
            送信
          </Button>
        </ButtonGroup>
      </form>
    </Box>
  );
};