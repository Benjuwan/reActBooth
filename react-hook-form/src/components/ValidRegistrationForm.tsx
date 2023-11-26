import { useState, type FC, type SyntheticEvent, ChangeEvent } from 'react';
import { Box, Button, ButtonGroup, Checkbox, FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { genderCode } from './RegistrationForm';
import { regFormSchema } from '../schamas/registrationForm';
import type { SubmitHandler } from 'react-hook-form';
import type { RegFormSchema } from '../schamas/registrationForm';


/* npm add yup @hookform/resolvers */


export const ValidRegistrationForm: FC = () => {
    const {
        register,
        handleSubmit,
        reset,
        // registrationForm.ts で指定した入力値のバリデーションエラー情報が入る
        formState: { errors },
    } = useForm<RegFormSchema>({
        defaultValues: {
            username: '',
            isAgreed: false,
        },
        // resolver:外部バリデーションライブラリを利用するためのカスタムリゾルバを設定する。
        resolver: yupResolver(regFormSchema),
    });

    const onSubmit: SubmitHandler<RegFormSchema> = (data) => console.log(data);

    const onReset = (e: SyntheticEvent) => {
        e.stopPropagation();
        reset();
    };


    const [isInputTxt, setInputTxt] = useState<string>('');
    const inputTxt = (inputEl: HTMLInputElement) => {
        setInputTxt((_prevInputTxt) => inputEl.value);
    }
    const inputStyle: object = {
        "display": "block",
        "width": "100%",
        "border": '1px solid #333',
        "borderRadius": "4px",
        "margin": "1em auto",
        "paddingLeft": ".25em"
    }

    /**
     * Chakra UI を併用するときに気をつけないといけないのはフォーム項目を <FormControl> で囲み、エラーがあるときはその isInvalid 属性を true にしておくこと。そうしないとエラーメッセージの表示や自動フォーカスの機能がうまく働かない
    */

    return (
        <Box p={5} w="md" borderWidth="1px" borderRadius="lg" boxShadow="base">
            <form onSubmit={handleSubmit(onSubmit)} action="/hoge">

                <FormControl isInvalid={errors.username !== undefined} isRequired>
                    <FormLabel htmlFor="username" mt={2}>
                        ユーザー名
                    </FormLabel>
                    <Input size="md" {...register('username')} />
                    <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                </FormControl>

                <input style={inputStyle} type="text" value={isInputTxt} onInput={(inputEl: ChangeEvent<HTMLInputElement>) => {
                    inputTxt(inputEl.currentTarget);
                }} />
                {isInputTxt.length >= 0 && <p>{isInputTxt}</p>}

                <FormControl isInvalid={errors.zipcode !== undefined}>
                    <FormLabel htmlFor="zipcode" mt={4}>
                        郵便番号
                    </FormLabel>

                    {/* ここで設定できる maxLength はあくまでバリデーションのためのもの */}
                    <Input size="md" maxLength={7} {...register('zipcode')} />
                    <FormErrorMessage>{errors.zipcode?.message}</FormErrorMessage>
                </FormControl>

                <Select my={6} placeholder="性別を選択…" {...register('gender')}>
                    {Object.entries(genderCode).map(([code, name]) => (
                        <option value={code} key={code}>
                            {name}
                        </option>
                    ))}
                </Select>

                <FormControl isInvalid={errors.isAgreed !== undefined}>
                    <Checkbox {...register('isAgreed')}>規約に同意する</Checkbox>
                    <FormErrorMessage justifyContent="center">
                        {errors.isAgreed?.message}
                    </FormErrorMessage>
                </FormControl>

                <ButtonGroup my={3} w="xs">
                    <Button w="30%" colorScheme="orange" variant="solid" onClick={onReset} >
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