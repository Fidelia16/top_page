"use strict"

// ページ本体が読み込まれたタイミングで実行するコード
window.addEventListener("DOMContentLoaded",
    function () {
        // 1.localStorageが使えるか確認
        if (typeof localStorage == "undefined") {
            window.alert("このブラウザはLocal Storage機能が実装されていません");
            return;
        } else {

            viewStorage(); //get data from storage
            saveLocalStorage(); //2.localStorageへの保存 (ほぞん) |
            delLocalStorage();
            allClearLocalStorage();
            selectTable();
        }
    }
);

//2.localStorageへの保存 (ほぞん)
function saveLocalStorage() {
    const save = document.getElementById("save");
    save.addEventListener("click",
        function (e) {
            e.preventDefault();
            const key = document.getElementById("textKey").value;
            const value = document.getElementById("textMemo").value;
            // 値の入力チェック
            if (key == "" || value == "") {
                window.alert("Key、Memoはいずれも必須 (ひっす)です。");
                return;
            } else {
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                let w_confirm = confirm(`「${key}」と値「${value}」を保存しますか？`)
                if (w_confirm) {
                    localStorage.setItem(key, value);
                    viewStorage();
                    let w_msg = "LocalStorageに" + key + " " + value + "を保存(ほぞん)しました。";
                    window.alert(w_msg);
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
};

function viewStorage() {
    const list = document.getElementById("list");
    while (list.rows[0]) list.deleteRow(0);

    for (let i = 0; i < localStorage.length; i++) {
        let w_key = localStorage.key(i);

        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");

        // list[i].appendChild(tr);

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        td1.innerHTML = "<input name='radio1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        $("#table1").tablesorter({
            sortList: [[1, 0]]
        });
        $("#table1").trigger("update");
    }
}

function selectTable() {
    const select = document.getElementById("select");
    select.addEventListener("click",
        function (e) {
            e.preventDefault();
            selectRadioBtn();
            const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');

            const checked = checkedCheckboxes.length;
            if (checked >= 2) {
                alert("test");
                return;
            }

        },

    );
}

function selectRadioBtn() {
    let w_sel = 0;

    const radio1 = document.getElementsByName("radio1");
    const table1 = document.getElementById("table1");

    for (let i = 0; i < radio1.length; i++) {
        if (radio1[i].checked) {
            document.getElementById("textKey").value = table1.rows[i + 1].cells[1].firstChild.data;
            document.getElementById("textMemo").value = table1.rows[i + 1].cells[2].firstChild.data;
            return w_sel = "1";
        }

    }
    window.alert("一つ選んでくださいませ。")
}
//no thing

function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_sel = 0;
            w_sel = selectRadioBtn();

            // 値の入力チェック
            if (w_sel === "1") {
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                let w_confirm = confirm(`「${key}」と値「${value}」を削除しますか？`)
                if (w_confirm) {
                    localStorage.removeItem(key);
                    let w_msg = `LocalStorage から キー「${key}」と値「${value}」を削除しました。`;
                    window.alert(w_msg);
                    viewStorage();
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
            }
        }, false
    );
};
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            let w_confirm = confirm("LocalStorageのデータを全て削除します。\nよろしいでしょうか？")
            if (w_confirm) {
                localStorage.clear();
                viewStorage();
                let w_msg = "LocalStorageのデータを全て削除しました。"
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        }, false
    );
};