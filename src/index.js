var ObjectWrapper = /** @class */ (function () {
    /***
     * 引数のオブジェクトのコピーを this._objに設定
     */
    function ObjectWrapper(_obj) {
        this._obj = _obj;
    }
    Object.defineProperty(ObjectWrapper.prototype, "obj", {
        /**
         * this._objのコピーを返却
         * @return Object
         */
        get: function () {
            return this._obj;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * this._obj[key] に valを設定。keyがthis._objに存在しない場合、falseを返却
     * @param key オブジェクトのキー
     * @param val オブジェクトの値
     */
    ObjectWrapper.prototype.set = function (key, val) {
        if (!(key in this._obj)) {
            return false;
        }
        else {
            this._obj[key] = val;
            return true;
        }
    };
    /**
     * 指定したキーの値のコピーを返却
     * 指定のキーが存在しない場合 undefinedを返却
     * @param key オブジェクトのキー
     */
    ObjectWrapper.prototype.get = function (key) {
        if (!(key in this._obj)) {
            return undefined;
        }
        else {
            return this._obj[key];
        }
    };
    /**
     * 指定した値を持つkeyの配列を返却。該当のものがなければ空の配列を返却。
     */
    ObjectWrapper.prototype.findKeys = function (val) {
        var targetKeysArray = [];
        for (var _i = 0, _a = Object.entries(this._obj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (value === val) {
                targetKeysArray.push(key);
            }
        }
        return targetKeysArray;
    };
    return ObjectWrapper;
}());
/**
 * check script
 * 完成したら、以下のスクリプトがすべてOKになる。
 */
var obj1 = { a: '01', b: '02' };
var wrappedObj1 = new ObjectWrapper(obj1);
if (wrappedObj1.obj.a === '01') {
    console.log('OK: get obj()');
}
else {
    console.error('NG: get obj()');
}
if (wrappedObj1.set('c', '03') === false &&
    wrappedObj1.set('b', '04') === true &&
    wrappedObj1.obj.b === '04') {
    console.log('OK: set(key, val)');
}
else {
    console.error('NG: set(key, val)');
}
if (wrappedObj1.get('b') === '04' && wrappedObj1.get('c') === undefined) {
    console.log('OK: get(key)');
}
else {
    console.error('NG: get(key)');
}
var obj2 = { a: '01', b: '02', bb: '02', bbb: '02' };
var wrappedObj2 = new ObjectWrapper(obj2);
var keys = wrappedObj2.findKeys('02');
if (wrappedObj2.findKeys('03').length === 0 &&
    keys.includes('b') &&
    keys.includes('bb') &&
    keys.includes('bbb') &&
    keys.length === 3) {
    console.log('OK: findKeys(val)');
}
else {
    console.error('NG: findKeys(val)');
}
