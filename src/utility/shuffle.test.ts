import {
    shuffle,
} from './shuffle';

test('shuold handle empey array',()=>{
    const source:number[] = [];
    shuffle(source);

    expect(source).toEqual([]);
});

test('should contain the same elements after a collection is shuffled',()=>{
    const source = [
        1,2,3,
    ];
    shuffle(source);

    expect(source.sort((a,b)=>b-a)).toEqual([
        3,2,1,
    ]);

});

test('should shuffle small collection',()=>{
    const set = new Set<string>();
    for(let i=0;i<1000;i++){
        const source = [
            1,2,3,
        ];
        shuffle(source);
        set.add(source.join(','));
    }

    expect(set).toEqual(new Set([
        '1,2,3','1,3,2','2,1,3','2,3,1','3,1,2','3,2,1',
    ]));
});

test('should handle start parameter less than 2',()=>{
    const set = new Set<string>();
    for(let i=0;i<1000;i++){
        const source = [
            1,2,3,
        ];
        shuffle(source,-1);
        set.add(source.join(','));
    }

    expect(set).toEqual(new Set([
        '1,2,3','1,3,2','2,1,3','2,3,1','3,1,2','3,2,1',
    ]));
});

test('should handle start parameter greater than or equal arr.length',()=>{
    const source = [
        1,2,3,4,5,6,7,
    ];
    shuffle(source,source.length);
    expect(source).toEqual([
        1,2,3,4,5,6,7,
    ]);

});