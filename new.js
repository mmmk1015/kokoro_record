$(document).ready(function () {

    const saveStorage = function (key, val) {
        localStorage.setItem(key, JSON.stringify(val));
    };

    const getStorage = function (key) {
        const obj = localStorage.getItem(key);
        return JSON.parse(obj);
    };

    const add = function () {
        const ttl = $(".memoForm #title").val();
        bdy = $(".memoForm #body").val();
        addMemo(ttl, bdy);
        saveMemo(ttl, bdy);
    };

    const addMemo = function (ttl, bdy) {
        const template =
            '<input type="text" id="title" class="form-control" readonly="readonly" value="%s"/>' +
            '<textarea class="form-control" rows="3" id="body" readonly="readonly">%s</textarea>';
        template = template.replace('%s', ttl).replace('%s', bdy);


        $("#memoArea").append(template);

        $(".memoForm #title").val('');
        $(".memoForm #body").val('');
    }

    memoArr = [];
    const storageKey = 'memoObj';

    const saveMemo = function (ttl, bdy) {
        const memoObj = {
            ttl: ttl,
            bdy: bdy
        };
        memoArr.push(memoObj);
        saveStorage(storageKey, memoArr);
    }

    const resetMemo = function () {
        $("#memoArea").children().remove();
        window.localStorage.clear();
    }

    const readMemo = function () {
        const memoObjs = getStorage(storageKey);
        if (memoObjs.length == null) return;
        for (const i = 0; i < memoObjs.length; i++) {
            const memoObj = memoObjs[i];
            const ttl = memoObj.ttl;
            const bdy = memoObj.bdy;
            const memoObj = {
                ttl: ttl,
                bdy: bdy
            };
            memoArr.push(memoObj);
            saveStorage(storageKey, memoArr);
            addMemo(ttl, bdy);
        }
    };

    //ページ読込み時にメモ復帰
    readMemo();

    //イベントハンドル
    $("#btnAdd").on('click', function () {
        add();
    });
    $("#btnReset").on('click', function () {
        resetMemo();
    });

});