# reActoBooth

『りあクト！ TypeScriptで始めるつらくないReact開発 第4版【③ React応用編】』の個人用ハンズオンファイル

- 型アサーション
型推論の上書き

- as const：
`as const`を付けるとプロパティが`readonly`になる

```
export const genderCode = {
  f: '女性',
  m: '男性',
  n: 'それ以外',
} as const;
```

### countdown

- タプル：`useTimer.pre.ts`
関数は本来 1関数につき 1値しか返せないが複数の値を配列（に格納する形）で返せる仕組みがあり、そうして返される値をタプルという。タプルはそれぞれの値の型を指定できる（例：[string, number, boolean]）

- stopPropagation()：`useTimer.pre.ts`
子要素のクリックイベント発火に伴う、親要素のクリックイベント発火連鎖を防止

- useRef：`Timer.tsx`
「useRef で定義した値は .current という書き換え可能なプロパティを持つ。それを組み込みコンポーネントの ref に入れておくと、React がリアル DOM を出力した際にその対応する要素を参照する値が.current の中に設定される 

```
const inputRef = useRef<HTMLInputElement | null>(null);
const onClick = () => inputRef.current?.focus();
```

### deferred

- useDeferredValue：`ProfileWriter.tsx`
あらかじめ任意の state 更新における緊急性をマークしておくことで、緊急性の低い更新を必要に応じて遅らせることができる機能。遅延する値（deferedUsename）を適用するコンポーネント（Users）をメモ化して依存配列にその値を入れる必要がある

```
/* 遅延する値（deferedUsename）を適用するコンポーネント（Users）をメモ化して依存配列にその値を入れる必要がある */
  const deferredUsers = useMemo(
    // フォームテキストを更新するためのレンダリングが優先されて、プロフィール情報の更新のレンダリングが遅延される
    () => <Users username={deferedUsename} count={count} />,
    [deferedUsename, count]
  );
```

### presentational / container

- Presentational Component
表象的なコンポーネント

- Container Component
表象的なコンポーネント（Presentational Component）を包含（import）したコンテナのようにそれを入れて動かすコンポーネント

- ユニオンで使用する場合、関数の型の表記はかっこで囲む必要がある

```
type btnProps = {
    btnTxt?: string | HTMLElement | ReactNode;
    method: undefined | (() => void); // ユニオンで使用する場合、関数の型の表記はかっこで囲む必要がある。() => void → (() => void)
    anyClassName?: string;
}
```

### react-router

- keyof typeof：`AllPlayers.tsx`

```
const SORT = {
  height: '身長順',
  grade: '学年順',
};
type Props = {
  sortType?: 'height' | 'grade'; // keyof typeof SORT
  my?: number | string;
}
```

- typeof 配列[indexNumber]：`types.ts`

```
typeof SCHOOL_CODE[number]; // 'shohoku' | 'ryonan' | 'kainandai';
```