
class ObjectWrapper<T extends newObj<T> > {
  private _obj;
  /***
   * 引数のオブジェクトのコピーを this._objに設定
   */
  constructor(_obj: T) {
    const copy_obj = Object.assign({}, _obj);
    this._obj = copy_obj;
  }

  /**
   * this._objのコピーを返却
   * @return Object
   */
  get obj(): T {
    const copyThisObject = Object.assign({}, this._obj);
    return copyThisObject;
  }

  /**
   * this._obj[key] に valを設定。keyがthis._objに存在しない場合、falseを返却
   * @param key オブジェクトのキー
   * @param val オブジェクトの値
   */
  set(key: newObjKeyType<T>, val: T[keyof T]): boolean {
    this._obj[key as keyof T] = val;
    return true;
  }
  /**
   * 指定したキーの値のコピーを返却
   * 指定のキーが存在しない場合 undefinedを返却
   * @param key オブジェクトのキー
   */
  get(key: newObjKeyType<T>): newObjKeyType<T> {
    const copyThisObject = Object.assign({}, this._obj);
    return copyThisObject[key as keyof T];
  }

  /**
   * 指定した値を持つkeyの配列を返却。該当のものがなければ空の配列を返却。
   */
  findKeys(val: T[keyof T]): T[keyof T][] {
    const targetKeysArray: T[keyof T][] = [];
    for (const [key, value] of Object.entries(this._obj)) {
      if(value === val) {
        targetKeysArray.push(key as T[keyof T]);
      }
    }
    return targetKeysArray;
  }
}

/**
 * check script
 * 完成したら、以下のスクリプトがすべてOKになる。
 */

//  type obj = Record<string, string>;

type newObj<T> = {
  [key in keyof T]: T[key];
}

type newObjKeyType<T> = T extends {[key in keyof T]: infer key} ? key : string;

const obj1 = { a: '01', b: '02'};
const wrappedObj1 = new ObjectWrapper<typeof obj1>(obj1);
if (wrappedObj1.obj.a === '01') {
  console.log('OK: get obj()');
} else {
  console.error('NG: get obj()');
}

if (
  wrappedObj1.set('c', '03') === false &&
  wrappedObj1.set('b', '04') === true &&
  wrappedObj1.obj.b === '04'
) {
  console.log('OK: set(key, val)');
} else {
  console.error('NG: set(key, val)');
}

if (wrappedObj1.get('b') === '04' && wrappedObj1.get('c') === undefined) {
  console.log('OK: get(key)');
} else {
  console.error('NG: get(key)');
}

const obj2 = { a: '01', b: '02', bb: '02', bbb: '02' };
const wrappedObj2 = new ObjectWrapper<typeof obj2>(obj2);
const keys = wrappedObj2.findKeys('02');
if (
  wrappedObj2.findKeys('03').length === 0 &&
  keys.includes('b') &&
  keys.includes('bb') &&
  keys.includes('bbb') &&
  keys.length === 3
) {
  console.log('OK: findKeys(val)');
} else {
  console.error('NG: findKeys(val)');
}
