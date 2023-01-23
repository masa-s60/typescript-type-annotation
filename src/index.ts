type stringKeyAndValue = {
  [key: string]: string
}

class ObjectWrapper {
  private _obj;
  
  /***
   * 引数のオブジェクトのコピーを this._objに設定
   */
  constructor(_obj: stringKeyAndValue) {
    this._obj = _obj;
  }

  /**
   * this._objのコピーを返却
   * @return Object
   */
  get obj(): stringKeyAndValue {
    return this._obj;
  }

  /**
   * this._obj[key] に valを設定。keyがthis._objに存在しない場合、falseを返却
   * @param key オブジェクトのキー
   * @param val オブジェクトの値
   */
  set(key: string, val: string): boolean | undefined {
    if(!(key in this._obj)) {
      return false;
    } else {
      this._obj[key] = val
      return true;
    }
  }
  /**
   * 指定したキーの値のコピーを返却
   * 指定のキーが存在しない場合 undefinedを返却
   * @param key オブジェクトのキー
   */
  get(key: string): string | undefined {
    if (!(key in this._obj)) {
      return undefined;
    } else {
      return this._obj[key];
    }
  }

  /**
   * 指定した値を持つkeyの配列を返却。該当のものがなければ空の配列を返却。
   */
  findKeys(val: string): string[] {
    const targetKeysArray: string[] = [];
    for (const [key, value] of Object.entries(this._obj)) {
      if(value === val) {
        targetKeysArray.push(key);
      }
    }
    return targetKeysArray;
  }
}

/**
 * check script
 * 完成したら、以下のスクリプトがすべてOKになる。
 */
const obj1: stringKeyAndValue = { a: '01', b: '02' };
const wrappedObj1: ObjectWrapper = new ObjectWrapper(obj1);
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

const obj2: stringKeyAndValue = { a: '01', b: '02', bb: '02', bbb: '02' };
const wrappedObj2: ObjectWrapper = new ObjectWrapper(obj2);
const keys: string[] = wrappedObj2.findKeys('02');
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
