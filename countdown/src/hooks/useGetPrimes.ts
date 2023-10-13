export const useGetPrimes = () => {
    const GetPrimes = (maxRange: number) => {
        const Ary = [...Array(maxRange + 1).keys()]; // Object.keys: object の key（プロパティ）を配列として返す（Object.values だと object の値を配列として返す）
        // console.log(Ary);

        /* 素数でない 0, 1 を省いた配列に */
        const SliceAry = Ary.slice(2);
        // console.log(SliceAry);

        // SliceAry.filter((n) => {

        /*テキスト51p の記述方法にある getPrimes = (maxRange: number): number[] 部分の型注釈の数値型配列（number[]）を実現するため filter 処理を return */
        return SliceAry.filter((n) => {
            // console.log(n);
            for (let i = 2; i < n; i += 1) {
                /* 素数：1より大きい整数のうち、1とその数自身以外に約数（その数を割り切ることのできる整数）をもたない数字 */
                if (n % i === 0) return false;
            }
            return true;
        });
    }

    return { GetPrimes }
}
