# reActBooth

『りあクト！ TypeScriptで始めるつらくないReact開発 第4版【③ React応用編】』の個人用ハンズオンファイル及びメモ

- 関心領域 ＝ ドメイン

- （配列要素の子要素に必要な）`key`を渡すために`div`をわざわざ用意せずとも`Fragment`を使えば済む
```
import { Fragment } from 'react';

<Fragment key={n}>
  // コンポーネントや処理など...
</Fragment>
```

- インポート時に別名を付けることができる **（JSX 記法に則って先頭は大文字に）**
```
import { インポート時のデフォルトコンポーネント名 as HogeComponent } from ...
```

- 冪等（べきとう）性<br />
処理を一回、または複数回行っても結果は全て同じものである（べき）という性質

- 型アサーション<br />
型推論の上書き

- `never`型<br />
**「値を持たない」** を意味するTypeScriptの特別な型。`never`型には`never`型以外、何も代入できないが、`never`型はどんな型にも代入できる。
>...値を持たないはずの never 型に値を持っているstatus（string型）を代入しようとしているためです。つまりdefault 節に到達すると絶対にエラーが発生するため、それ以前に網羅チェックを行うことが強制されるのです！...
[参考記事](https://qiita.com/sosomuse/items/b7b36b95686b83ec36f4)

- リテラル型<br />
プリミティブ型の特定の値だけを代入可能にする型（文字列リテラル型など）

- as const<br />
`as const`を付けるとプロパティが`readonly`になる

```
export const genderCode = {
  f: '女性',
  m: '男性',
  n: 'それ以外',
} as const;
```

### countdown

- タプル：`useTimer.pre.ts`<br />
関数は本来 1関数につき 1値しか返せないが複数の値を配列（に格納する形）で返せる仕組みがあり、そうして返される値をタプルという。タプルはそれぞれの値の型を指定できる（例：[string, number, boolean]）

- stopPropagation()：`useTimer.pre.ts`<br />
子要素のクリックイベント発火に伴う、親要素のクリックイベント発火連鎖を防止

- useRef：`Timer.tsx`<br />
「useRef で定義した値は .current という書き換え可能なプロパティを持つ。それを組み込みコンポーネントの ref に入れておくと、React がリアル DOM を出力した際にその対応する要素を参照する値が.current の中に設定される 

```
const inputRef = useRef<HTMLInputElement | null>(null);
const onClick = () => inputRef.current?.focus();
```

### deferred

- useDeferredValue：`ProfileWriter.tsx`<br />
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

- Presentational Component<br />
表象的なコンポーネント

- Container Component<br />
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

- [`react-helmet-async`](https://github.com/staylor/react-helmet-async)<br />
HTMLヘッダの中でなくても任意のコンポーネントの中で `<title>`タグを置いてドキュメントのタイトルを変更できるようにするパッケージ。「`<title>`だけじゃなく`<meta>`とか`<link>`とかドキュメントヘッダに置けるものは全部置ける。これを使うにはルートでプロバイダコンポーネントを設定する必要がある。

```
import { HelmetProvider } from 'react-helmet-async';
const Providers: FC<PropsWithChildren> = ({ children }) => (
<HelmetProvider>
<ChakraProvider>
<Router>{children}</Router>
</ChakraProvider>
</HelmetProvider>
);
export default Providers;
```

※`React Helmet`というパッケージが本家だが、更新が 2020 年 6 月で止まってて、React 18
の非同期レンダリングに対応してないので、使用するのは`react-helmet-async`。

### Redux
* Flux
  * Store …… アプリケーション全体で参照するための状態データ（`State`）を一元管理する保管庫
  * Action …… イベントにおける『何をどうしたいか』という意図を表現したもの
  * Dispatcher …… Action の種類を判別して、それにひもづけられた Store の更新処理を行うもの

- **Flux は単方向データフローを実現するためのアーキテクチャ**<br />「Flux では状態は Store と呼ばれる保管庫に格納され、View からは書き込み不可で参照のみを行うことができる。<br />Action という『何をどうしたいか』という意図を表現したオブジェクトを、Dispatcher に対して発行する。すると Dispatcher が Action の種類を判別して、それに対応したあらかじめ定められている手順通りに Store の任意の状態を変更する。Store が書き換えられれば、参照していた View にも速やかに反映される。<br />書き換え手続きをこのように限定することでデータフローが常に単方向になることが保証される。

* Redux
  * Store …… アプリケーション全体で参照するための状態データ（`State`）を一元管理する保管庫
  * Action …… イベントにおける『何をどうしたいか』という意図を表現したもの
  * Dispatcher ……  store の構造や状態については一切関知しない。その名のとおり役割が action を reducer に送りつける（＝ dispatch）ことだけに限定されたもの
  * Reducer …… 状態を更新する 純粋関数。Action と現在の State を受け取って新しい State を生成する

- Redux は Flux よりシンプルに記述できる状態管理ライブラリ

- Redux の構造とワークフロー<br />
`View`から（`Action Creator`関数を通じて）「意図表現」した`Action`（チケットのようなもの）が発行されて、そのチケットを`Dispatcher`（読み取り機のようなもの）に渡す。その機械（`Dispatcher`）を通って「チケットに記載されていた機能・処理」が`Reducer`（実施機）へ送られて実施され、`Store`内にある「チケット記載の処理にマッチした`State`が更新」されて`View`に反映される。

- 「Redux で **store の状態を変更するための唯一の方法は、どんなイベントが起こったかを表現する action を発行する**こと。変更手段を action だけに集約し、厳密にひとつずつ処理するようにすることで、書き換えの競合や予期せぬ書き換えを防ぐことができる。Redux の action は単なるプレーンオブジェクトなので、ログを取って後で状態の変化を再現することも簡単にできる。

- Redux では store は状態を格納するひとつのステートツリーと、それを更新するための Reducer という純粋関数で表現される装置から構成されている。<br />reducer は極限まで抽象化すると`(prevState, action) => newState`のような式になる。

- **Redux を導入するのに必要なパッケージは次の 2 つ**。`Redux` 本体と [`React Redux`](https://react-redux.js.org/)。後者は Redux を Reactにバインディングするための公式ライブラリ（Redux は React 専用ではなく、Angular や Vue など各種ライブラリでも利用できるため React仕様を設定する必要がある）

- `useSelector`<br />
store から任意の state の値を抽出するための（Redux の提供する Hooks）API。コールバックが引数になっていて、それが state を受け取ってそこから必要な値を抜き出して返す。一般的にセレクト関数と呼ばれるもの。<br />第 1 引数（`CounterState`）が store の state ツリー全体の型、第 2 引数（`number`）が抽出する state 値の型になっている。
```
/* reducer.ts で 指定 */
export interface CounterState {
  count: number;
}
export const initialState: CounterState = { count: 0 };
/* reducer.ts で 指定 */

const count = useSelector<CounterState, number>((state) => state.count);
```

- `useDispatch`
action を dispatcher に渡すための関数を取得する（Redux の提供する Hooks）API。得た関数を`dispatch({ type: 'INCREMENT' }) `のように action を引数にしてコールすれば、INCREMENT タイプの action が dispatch されるようになっている。<br />実使用はバグやタイポ防止などのために`dispatch(increment()) `のように記述して、生の action オブジェクトを dispatch するんじゃなくて action creator 関数で生成したものを使う。

- オブジェクトの`key（プロパティ）`を取得して配列にする<br />
```
/* ColorfulBeads.tsx */
[...Array(count).keys()] // reducer.ts で 指定した count: number; の中身がスプレッド構文で展開及び更新されていく

// Object.values() ... オブジェクトの`value`を取得して配列にする
```

- [`Immer`](https://immerjs.github.io/immer/)：オブジェクトのイミュータブルな更新を簡単にしてくれるライブラリ
```
import produce from 'immer';
const updatedArticle = produce(article, (draftArticle) => {
  /* オブジェクトのプロパティをメソッドチェーン形式で記述して更新することができる */
  draftArticle.comments[213974].body = 'You are a genius!';
});
```
React 公式ドキュメントで、ネストが深いオブジェクトの更新では `Immer` を使うことが推奨されている。state の階層が深くなったときとか、reducer で state のピンポイントな更新処理を書くのに Immer はかなり有効。

#### ReduxToolKits
Redux の開発チームが効率的で快適な DX を開発者に提供しようと考えてリリースされたのが Redux Toolkit（RTK）。
> Redux の概念の上に応用されてるものだから敷居が高く感じてる初心者が多そうだけど、実は初心者こそ恩恵が大きいツールだってことがもっと広く理解されてほしいね。

* RTK が提供している主要な API は次の 4 つ
  * configureStore …… 各種デフォルト値が設定可能な createStore のカスタム版（今の`Redux`では`createStore`を使う書き方は非推奨）。デフォルトで最初から`Redux DevTools`の設定がされてるので何もしなくても`Redux DevTools`が使える
  * createReducer …… reducer の作成を簡単にしてくれる
  * createAction …… action creator を作成する
  * **createSlice …… action の定義と action creator, reducer をまとめて生成できる**

- action と reducer のロジックを統合したもののことを Redux Toolkit では`Slice`と呼ぶ。

- `createSlice`の実例
```
export const counterSlice = createSlice({
  name: 'counter', // action の定義
  initialState,

  /* action creator, reducer をまとめて生成 */
  reducers: {
    /* action：add */
    added: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },

    /* action：decremented */
    decremented: (state) => {
      if (state.count > 0) {
        state.count--;
      }
    },

    /* action：incremented */
    incremented: (state) => {
      state.count++;
    },
  },
});
```

- RTK での Store の設置
```
/* index.tsx */

︙
import { configureStore } from '@reduxjs/toolkit';
import { Provider as ReduxProvider } from 'react-redux';
import { counterSlice } from 'stores/counter';

/* configureStore */
const store = configureStore({ reducer: counterSlice.reducer });

const Providers: FC<PropsWithChildren> = ({ children }) => (
  <HelmetProvider>
    <ChakraProvider>
      /* store */
      <ReduxProvider store={store}>{children}</ReduxProvider>
    </ChakraProvider>
  </HelmetProvider>
);
︙
```