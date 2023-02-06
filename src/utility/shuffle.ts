// 考虑使用场景，因为前start个数都是1，所以前start次重排没意义，所以加了一个start
export function shuffle<T>(mines:Array<T>,start = 1):void {
    for (let i = Math.max(1,start); i < mines.length; i++) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const tmp = mines[randomIndex];
        mines[randomIndex] = mines[i];
        mines[i] = tmp;
    }
}