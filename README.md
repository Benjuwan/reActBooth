# reActBooth

『りあクト！ TypeScriptで始めるつらくないReact開発 第4版【③ React応用編】』の個人用ハンズオンファイル及びメモ

## 注意事項
- `countdown`と`deferred`をインストール（`npm install`）する度に、不要なファイル（`.git/hooks/pre-commit`）が発生して`commit`できなくなるので、インストールした際は`commit`する前に`.git/hooks/pre-commit`を削除しておく<br />
> pre-commit フックは、変更をコミットしようとすると最初に実行され、特定のチェック、テスト、条件を実行するために使用できます

### 簡易メモ

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

- エッジコンピューティング<br />
「端末の近くにサーバーを分散配置する」ネットワーク技法。CDN のようにクライアントとオリジン（サーバー）の中間点に位置する。

- チャンク（Chunk）<br />
一塊の JavaScript バンドルファイル

- FID（First Input Delay）<br />
コアウェブバイタルの指標のひとつで、初回入力までの遅延時間

- LCP（Largest Contentful Paint）<br />
コアウェブバイタルの指標のひとつで、ユーザーの認識としてのページ表示速度を測る指標

- ハイドレーション（Hydration）<br />
  - サーバーで生成した DOM を HTML 文字列化（SSR / SSG）
  - クライアントで HTML 文字列を DOM に復元する処理
  - 上記（サーバー・クライアント）の DOM に差異があると Hydration エラーが発生

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

- Promise（非同期）を使った処理に`void`を付ける

```
const load = async () => {
  .
  .
  await ...
  .
  .
};
void load(); // 返ってくる Promise をあえて無視することを明示
```

返ってくる Promise をあえて無視することを明示するために void（返却値なし）式を利用する。これを書いていないと`@typescript-eslint/no-floating-promises`ルールに引っかかる。

- カスタムフックは「変数」も返せる

```
// 変数を返すカスタムフック（useReturnStates）
︙
export const useReturnStates = () => {
  const [users, setUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 何らかの他の処理
  setUsers(usersData); // 変数 users を更新
  setIsLoading(false); // 変数 isLoading を更新
  // 何らかの他の処理

  return { users, isLoading };
};
```

```
// カスタムフック（useReturnStates）を使用するコンポーネント
︙
const { users, isLoading } = useGetMembers();
```

- マイクロサービス・アーキテクチャ<br />
認証や購入といった機能別に責務を区切って開発（システム的にそれぞれが独立して動くような形に）し、運用・保守もそれぞれ別々に行う手法

### react-hook-form

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

※`React Helmet`というパッケージが本家だが、更新が 2020 年 6 月で止まってて、React 18 の非同期レンダリングに対応してないので、使用するのは`react-helmet-async`。

### Redux
* Flux
  * Store …… アプリケーション全体で参照するための状態データ（`State`）を一元管理する保管庫
  * Action …… イベントにおける『何をどうしたいか』という意図を表現したもの
  * Dispatcher …… `Action`の種類を判別して、それにひもづけられた`Store`の更新処理を行うもの

- **Flux は単方向データフローを実現するためのアーキテクチャ**<br />「Flux では状態は `Store` と呼ばれる保管庫に格納され、`View` からは書き込み不可で参照のみを行うことができる。<br />`Action` という『何をどうしたいか』という意図を表現したオブジェクトを、`Dispatcher` に対して発行する。すると `Dispatcher` が `Action` の種類を判別して、それに対応したあらかじめ定められている手順通りに `Store` の任意の状態を変更する。`Store` が書き換えられれば、参照していた `View` にも速やかに反映される。<br />書き換え手続きをこのように限定することでデータフローが常に単方向になることが保証される。

* Redux
  * Store …… アプリケーション全体で参照するための状態データ（`State`）を一元管理する保管庫
  * Action …… イベントにおける『何をどうしたいか』という意図を表現したもの
  * Dispatcher ……  `store` の構造や状態については一切関知しない。その名のとおり役割が `action` を `reducer` に送りつける（＝ dispatch）ことだけに限定されたもの
  * Reducer …… 状態を更新する 純粋関数。`Action` と現在の `State` を受け取って新しい `State` を生成する（`(prevState, action) => newState`）

- **Redux は Flux よりシンプルに記述できる状態管理ライブラリ**<br />
<details>
<summary>Redux の現状</summary>

> Redux はまだまだ多くのプロジェクトに現役で使われていて、純粋にその数だけなら圧倒的だけれども、今日ではアプリケーションでグローバルな状態を扱うのに必ずしも Redux を使う必要がないし、常に Redux がその最適解とも言えない。

> アプリケーションにとって重要なデータの管理をトップで独占的に行い、下々のコンポーネントはそれを拝領するのみという中央集権型ではなく、宣言的に記述された個々のコンポーネントが自律的かつスマートに必要なデータを取り扱う地方分権型のアーキテクチャ。本家がそちらの方向に進みつつある中、Single Source of Truth を標榜する典型的な中央集権型の Redux は少しずつ収まりが悪くなってきてる

</details>

- Redux の構造とワークフロー<br />
`View`から（`Action Creator`関数を通じて）「意図表現」した`Action`（チケットのようなもの）が発行されて、そのチケットを`Dispatcher`（読み取り機のようなもの）に渡す。その機械（`Dispatcher`）を通って「チケットに記載されていた機能・処理」が`Reducer`（実施機）へ送られて実施され、`Store`内にある「チケット記載の処理にマッチした`State`が更新」されて`View`に反映される。

- 「Redux で **`store` の状態を変更するための唯一の方法は、どんなイベントが起こったかを表現する `action` を発行する**こと。変更手段を `action` だけに集約し、厳密にひとつずつ処理するようにすることで、書き換えの競合や予期せぬ書き換えを防ぐことができる。Redux の `action` は単なるプレーンオブジェクトなので、ログを取って後で状態の変化を再現することも簡単にできる。

- Redux では `store` は状態を格納するひとつのステートツリーと、それを更新するための `Reducer` という純粋関数で表現される装置から構成されている。<br /> `reducer` は極限まで抽象化すると`(prevState, action) => newState`のような式になる。

- **Redux を導入するのに必要なパッケージは次の 2 つ**。`Redux` 本体と [`React Redux`](https://react-redux.js.org/)。後者は Redux を Reactにバインディングするための公式ライブラリ（Redux は React 専用ではなく、Angular や Vue など各種ライブラリでも利用できるため React仕様を設定する必要がある）

- `useSelector`<br />
`store` から任意の state の値を抽出するための（Redux の提供する Hooks）API。コールバックが引数になっていて、それが state を受け取ってそこから必要な値を抜き出して返す。一般的にセレクト関数と呼ばれるもの。<br />第 1 引数（`CounterState`）が `store` の state ツリー全体の型、第 2 引数（`number`）が抽出する state 値の型になっている。

```
/* reducer.ts で 指定 */
export interface CounterState {
  count: number;
}
export const initialState: CounterState = { count: 0 };
/* reducer.ts で 指定 */

const count = useSelector<CounterState, number>((state) => state.count);
```

- ミドルウェア（Middleware）<br />
外部から `dispatcher` を拡張して `Reducer` の実行前後に任意の処理を追加できるようにするための Redux が持つ仕組み
> ... View から Action Creator 経由で Action が発行されて、それが Dispatcher によって Reducer に渡される。そして Reducer が`(prevState, action) => newState`のような形で一意に State を更新し、それが View に反映されるという Redux の仕組みにおいて、ミドルウェアはこの Dispatcher に機能を追加する働きを持つ...

```
import { createStore, applyMiddleware } from 'redux';
import awesomeMiddleware from 'awesome-middleware';
import { reducer, initialState } from './reducer';

/* createStore の第 3 引数に、Redux の dispatch() 関数をラップした処理が記述されたミドルウェアのオブジェクトを渡す形 */
const store = createStore(reducer, initialState, applyMiddleware(awesomeMiddleware));
```

- `useDispatch`
`action` を `dispatcher` に渡すための関数を取得する（Redux の提供する Hooks）API。得た関数を`dispatch({ type: 'INCREMENT' }) `のように `action` を引数にしてコールすれば、INCREMENT タイプの `action` が dispatch されるようになっている。<br />実使用はバグやタイポ防止などのために`dispatch(increment()) `のように記述して、生の `action` オブジェクトを dispatch するんじゃなくて`action creator`関数で生成したものを使う。

- `Object.keys()`：オブジェクトの`key（プロパティ）`を取得して配列にする

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
React 公式ドキュメントで、ネストが深いオブジェクトの更新では `Immer` を使うことが推奨されている。state の階層が深くなったときとか、`reducer` で state のピンポイントな更新処理を書くのに Immer はかなり有効。

#### ReduxToolKits
Redux の開発チームが効率的で快適な DX を開発者に提供しようと考えてリリースされたのが Redux Toolkit（RTK）。
> Redux の概念の上に応用されてるものだから敷居が高く感じてる初心者が多そうだけど、実は初心者こそ恩恵が大きいツールだってことがもっと広く理解されてほしいね。

* RTK が提供している主要な API は次の 4 つ
  * configureStore …… 各種デフォルト値が設定可能な createStore のカスタム版（今の`Redux`では`createStore`単体を使う書き方は非推奨）。デフォルトで最初から`Redux DevTools`の設定がされてるので何もしなくても`Redux DevTools`が使える
  * createReducer …… `reducer` の作成を簡単にしてくれる
  * createAction …… `action creator` を作成する
  * **createSlice …… action の定義と `action creator`, `reducer` をまとめて生成できる**

- `action` と `reducer` のロジックを統合したもののことを Redux Toolkit では`Slice`と呼ぶ。

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

-  RTK Query<br />
`action` でデータ取得ができてかつその値をキャッシュ管理できる機能
> それまではデータ取得のような非同期処理を Redux で扱うには `createAsyncThunk`という API が用意されてたんだけど使い勝手が悪くて開発者の評判も芳しくなかった。だからそれは非推奨にして今後は RTK Query を全力で推していく方針

### useReducer
- useReducer<br />
`Redux`で行っていた「`action`と`reducer`によるアプリケーションを包括するグローバルな状態（`State`）の管理」を個別のコンポーネントで可能にする Hooks API。
```
const [state, dispatch] = useReducer(reducer, initialState);
```

- RTK は useReducer でも使用可能
> 余計なコードを書きたくないので、useReducer を使うときは私は RTK の createSlice で action や reducer を生成させるようにしてる

- useReducer を使用するメリット
> コンポーネントの機能が複雑化してくると state の数が増え、ある state の更新ロジックが別の state を参照するようになる。2 つくらいならともかく、たくさんの state が更新時に相互参照し、さらにそれが useEffect の副作用処理の中で行われたりすると人間の頭では追いつかなくなって、予期せぬ更新が予期せぬ場所で起きるカオスな状態に陥りがちになる

上記のような自体に対して、**useReducer を使えばコンポーネントの state を Redux のようにシングルツリーのオブジェクトに格納して、その中身を `reducer` によって副作用を排除しつつ更新できる**ようになる。

> note
>
> - Hooks のオブジェクト（テキスト：p152～154）<br />
> `Fiber`というレンダリングのためのアーキテクチャがあり、`Fiber`には`React Elements`に対応する**差分検出やデータ更新、再描画のスケジューリングといった作業のための最小単位としての意味**もある。
> コンポーネント内で（React が提供している公式の）Hooks API を使用すると、仮想 DOM にマウントされた`React Elements`に対応する`Fiber`が確保してるメモ化された領域の中にその Hooks のオブジェクトが作られ、それらが**コールされた順番に連結リストとして格納**される。<br /><br />
> Hooks API の呼び出しがこれらのどの Hooks オブジェクトに対応するかは**連結リストの順番によって照合される**ため、もし**再レンダリング時に呼び出しの順番が変わるようなことがあるとこの参照がズレて**しまう。そのため、Hooks API の使用はコンポーネントの論理階層の**トップレベルで行い、条件文やループの中で使ってはならない**ルールがある。
>
>
> * Hooks のオブジェクトはそれぞれ固有の state を持っている<br />
> Hooks のオブジェクトはそれぞれ固有の state を持っていて、対応する Hooks API コールが返す値はそこへの参照となっている。
>
>
> * useReducer の動き<br />
> useReducer は state を Redux ライク（※全く同じ仕組みではない）な action と reducer を使った仕組みで更新する（= ひとつの state ごとに小さな Redux をポコポコ作ってコンポーネントに付与し、React によるレンダリングの仕組みと結びついた仕組みになっている）。<br /><br />
> 具体的には、`Fiber`が確保してるメモ化された領域の中にある**各 Hooks のオブジェクトごとが持つ dispatch 関数に action を渡して実行**する。すると、それが直後に reducer に渡されるのではなく、**各 Hooks オブジェクトごとが持つ「更新キュー」に発行した action が追加**されていく。そして React の差分検出エンジンが最適化されたタイミングで**そのコンポーネントの再レンダリングを実行すると描画の直前にキューの中に溜まってた action が reducer へ渡され、キューの数だけ`(prevState, action) => newState` が実行された最終結果が state へ反映**される。
> 
> * useState の場合<br />
> 戻り値として useReducer における dispatch 関数の代わりに setter 関数を返す仕組みだが、その実体は **setter action だけを発行する専用の dispatcher** であり、対応する Hooks オブジェクトの動作は上記と全く同じ。useState の実体はひとつの setter action だけを持つ useReducer。つまり機能を限定した useReducer。
>
>
> ここまでの説明は、p153 の「図 29: Fiber における Hooks の動作メカニズム」を見ながらの方が理解促進に有益。  
>

### ポスト Redux の状態管理ライブラリ
> （Redux や Create React App などの作成者である）Dan 先生曰く『React の公式な状態管理ライブラリは React 自身』なんだそう

- Zustand（ザスタンド）<br />
Flux パターンをシンプルに Hooks インターフェースで実装したもので、`store`が single source（唯一の情報源：一元管理）ではなくて個別に分かれており、`reducer`のようなものも存在しない。トップ階層にプロバイダコンポーネントを置かなくても機能するし、バンドルサイズが軽量なのも特徴。<br />
Redux 同様にミドルウェアのしくみを備えていて、本体パッケージの中に`LocalStorage`への永続化、`Redux DevTools`対応、state 操作への Immer の適用といったミドルウェアが含まれてる。

```
︙
import create from 'zustand'; // zustand の読込

/* BearState の中身（型）*/
interface BearState {
  bears: number;
  increaseBear: () => void; // 返却値なしの関数
  removeAllBears: () => void; // 返却値なしの関数
}

/* BearState を更新するカスタムフック */
const useBearStore = create<BearState>((set) => ({
  bears: 0, // 初期値設定
  increaseBear: () => set((state) => ({ bears: state.bears + 1 })), // 1つインクリメント
  removeAllBears: () => set({ bears: 0 }), // 0 に変更（上書き）
}));

/* bears の個数を反映するコンポーネント */
const BearCounter: FC = () => {
  const bears = useBearStore((state) => state.bears); // bears の個数を設定（初期値0）

  return (
  <div>
    {/*（オブジェクトの）bears の個数（キー・プロパティ）を配列形式にして、個数分の「🐻アイコン（熊のアイコン）」を表示 */}
    {[...Array(bears).keys()].map((n) => (
      <span key={n} role="img" aria-label="bear">🐻</span>
    ))}
  </div>
  );
};

/* bears の個数を更新（追加・削除）するボタンコンポーネント */
const CountButtons: FC = () => {
  const increaseBear = useBearStore((state) => state.increaseBear); // インクリメントのメソッドを設定
  const removeAllBears = useBearStore((state) => state.removeAllBears); // 全削除のメソッドを設定

  return (
  <div>
    <button onClick={increaseBear}>One Up</button>
    <button onClick={removeAllBears}>Clear</button>
    </div>
  );
};

const App: FC = () => (
  <div className="App">
  <h1>Hello Bears!</h1>

  {/* bears の個数を更新（追加・削除）するボタンコンポーネント */}
  <CountButtons />

  {/* bears の個数を反映するコンポーネント */}
  <BearCounter />
  </div>
);

export default App;
```

- Recoil<br />
`Atom`という最小限の更新・購読可能な状態を分散して持つ仕組みで、`atom`は`key`によって一意に識別され、アクセスできるようになっている。Redux のように`action`で更新手続きを登録しておくようなことはできない（※ Atom Effect を使えば可能だが扱いづらいそう）。

```
import { atom } from 'recoil';
  const fontSizeState = atom({
    key: 'fontSizeState', // atom という（疑似的な）State の中の key を操作する
    default: 14,
  });
```

`atom`の操作には`useRecoilState`という Hooks API を使用。`useRecoilState`に引数として渡す`atom`オブジェクトは異なるものであっても、`key`が同じなら参照する state 値が同じになるため`key`が重複しないように注意する。

```
import { useRecoilState } from 'recoil';
︙
const FontButton: FC = () => {
  /* 作成した atom を引数に指定（キーと初期値を含んだ atom オブジェクトを渡す）*/
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);

  return (
    <button onClick={
      /*（引数に指定した）atom の key の値（default）を更新して style にセット */
      () => setFontSize((size) => size + 1)
    } style={{ fontSize }}>
      Click to Increase the Font Size
    </button>
  );
};
```

任意の`atom`を加工して（読み取り専用の）データとして取り回すには`Selector`を使用する。

```
import { selector } from 'recoil';
const fontSizeWithUnit = selector({
  key: 'fontSizeWithUnit',
  get: ({ get }) => {
    const fontSize = get(fontSizeState); // fontSizeState（atom）を取得して変数に代入
    const unit = 'px';
    return `${fontSize}${unit}`; // 任意の atom の値と設定した単位（unit）をテンプレートリテラルで文字列として返す（返却例：'14px'）
  },
});

︙
︙
︙
// コンポーネントでの使用例
import { useRecoilState, useRecoilValue } from 'recoil';
︙
const FontButton: FC = () => {
  /* 作成した selector（fontSizeWithUnit）を引数に指定（get で取得した結果：実物のオブジェクトを渡す）*/
  const [fontSize, setFontSize] = useRecoilState(fontSizeState);
  const fontSizeWithUnit = useRecoilValue(fontSizeWithUnit);

  return (
  <>
    <div>Current Font Size: {fontSizeLabel}</div>
    <button onClick={
      () => setFontSize((size) => size + 1)
    } style={{ fontSize }}>
    Click to Increase the Font Size
    </button>
  </>
  );
};
```

Recoil の懸念点<br />
> ... useRecoilState だけ使うにはいいけど、それ以外の API を積極的に使う気にはなれないかな。しかもそれだけ使うには 23KB というバンドルサイズは大きすぎるし。Meta 謹製なのに伸び悩んでるのは、多くの開発者も私と同じように考えてるからじゃないかな...GitHub のリポジトリがずっと facebookexperimental というところに置かれてて、最初のリリースから 2年以上たってもまだバージョンが 1.0 に到達してないのも懸念材料。Meta 製とはいえ、コントリビュートの大半がひとりの開発者に依ってるのは他のライブラリと変わらないし、このままどこかでプロジェクトが止まってしまう可能性だって小さくないと思う...

- Jotai<br />
Recoil と同じく`atom`を用いた仕組みだが、Recoil より痒い所に手が届くようなライブラリ。<br /><br />
・`atom`という最小限の単位の状態を分散管理する仕組み<br />
・トップレベルにプロバイダコンポーネントを必要としない（使用することも可能）<br />
・`key`で特定するのではなく生成した`atom`オブジェクトを取り回す<br />
・任意の`atom`を使って新しい読み取り専用の`atom`を生成できたり（derived atom）、セット関数をユーザーがカスタマイズできて、かつその中で他の`atom`の state 値を変更できたりもする<br />
・バンドルサイズが 3.4KB と軽量<br /><br />

Qiita の下記記事が分かりやすい。<br />

[初学者でも分かるようにJotaiを丁寧に解説していく](https://qiita.com/moritakusan/items/9a5e8c315b2565a02848)


#### 昨今の状態管理の事情

> フロントエンドの都合にバックエンドのほうが柔軟に合わせる思想が広まってる。GraphQL の普及はその文脈に沿うものだし、Firebase や AWS Amplify に代表される BaaS（Backend as a Service）も広く使われるようになってきた

- GraphQL<br />
RESTful API が抱える問題を解決するために作られた、データの参照・操作・スキーマ定義のための言語仕様を含んだ規格。フロントエンドが直接バックエンドにクエリ（処理要求）を発行して、その時々に必要なデータ（API）を柔軟に取得できるような働きを持つ。

- [Firebase](https://firebase.google.com/?hl=ja)<br />
Google が提供するモバイル Web アプリケーションプラットフォーム。GCP（Google Cloud Platform）上に構築されており、データベースの Cloud Firestore、Firebase Authentication によるユーザー認証、Web に静的ファイルを展開できる Firebase Hosting など数々の開発者向けサービスがパッケージとして提供されている。

- [AWS Amplify](https://aws.amazon.com/jp/amplify/)<br />
Amazon が AWS 上で提供しているアプリケーション開発のためのフレームワークおよび Web ホスティングサービス。

- Apollo Client
「昨今の状態管理の事情」の流れや、クエリ単位の結果を必要に応じてキャッシュすればこと足りるという思想のもと台頭してきたライブラリ。GraphQL との相性が良い。<br />
特徴としては、Apollo Client はもともと Redux を包含する形で構築されていたものの独立して状態管理システムを持つようになった経緯がある。ローディング状態やエラー状態を管理してくれる上、データはキャッシュベースで取り回され、そのキャッシュは Apollo Client  が勝手に正規化してくれたり、`mutation`（`GraphQL`のデータ更新系のクエリ）を発行すればレスポンスがサーバから返ってくる前にキャッシュを先に更新してくれたりする。<br />
そのデータがリモートにあるのかローカルにあるのかをあまり意識することなく、`GraphQL`のクエリ自体が状態にひもづいてコンポーネント内で扱える、つまり個々のコンポーネントがサーバとシームレスに連携して状態を管理できる。<br /><br />

Apollo Client は `SWR`や`React Query`、クエリキャッシュを Redux に統合できるようにした`RTK Query`の登場のきっかけを作ったそう。

- [`SWR`（stale-while-revalidate）](https://swr.vercel.app/ja)：まずキャッシュからデータを返し（stale）、次にフェッチリクエストを送り（revalidate）、最後に最新のデータを持ってくるという、データ取得のための React Hooks ライブラリ。

### React v18
**素の React で SSR を行うのは難易度が高い**。公式も SSR したければ Next.js や Remix などのフレームワークの使用を推奨（一般的になっている）している。

- React v18 以前<br />
`Blocking Rendering`というコンポーネントのレンダリング方法で、一度始まると
中断できない、割り込み不能で同期的なものだった。

- React v18 以降<br />
`Concurrent Rendering`という方法に置き換わった。これは、一度始まったレンダリングを中断して他のレンダリングを実行したり、停止していたレンダリングを再開したり、破棄したりすることもできるようになった。<br />
各コンポーネントのレンダリングを適宜中断、再開、破棄するなどして、それぞれの緊急性の高さなども考慮に入れつつ全体のレンダリングを適切にスケジューリングしてくれる。一度にひとつのレンダリングしかできないが、擬似的（＊1）にレンダリングの並列化を図っている。<br />

> ＊1：Concurrent Processing（並行処理）とは、OS とかで**単一の計算リソースを時系列で細切れにして複数のタスクに割り当てることによって擬似的にマルチタスク処理を実現すること**をいうのね。一度に実行できるタスクは実際にはひとつだけだけど、うまいことスケジューリングしてシステムの応答性を改善するというところがミソ

React 18 では、ユーザーの体感パフォーマンス（UX）の向上を方針にしていて、そのための具体的なソリューションを提供している。ただし、それらの中には**最初に設定だけしておけば後は何もせずともその恩恵に授かれるもの**もあれば、**使いどころを見極めて適切に利用しないといけないもの**もある。

- `createRoot`

```
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

`root`オブジェクトには`render`メソッドに加えて`unmount`メソッドも実装されていて、それによって任意のタイミングで DOM ノードから削除できる。

- Strict Mode<br />
アプリケーションの潜在的な問題を開発者に警告するためのもの。`React.Fragment`と同様 UI のレンダリング結果には影響しないし、開発環境でしか有効にならず本番用のビルドにも影響しない（が、React 18 では開発環境で`useEffect`や`useLayoutEffect`使用時に 2回レンダリングという挙動を見せる）