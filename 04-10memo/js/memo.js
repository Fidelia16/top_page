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
                Swal.fire({
                    title: "Memo app",
                    html: "Key、Memoはいずれも必須 (ひっす)です。",
                    icon: "error",
                    allowOutsideClick: false
                });
                return;
            } else {
                const key = document.getElementById("textKey").value;
                const value = document.getElementById("textMemo").value;
                Swal.fire({
                    title: "Memo app",
                    html: `「${key}」と値「${value}」を保存しますか？`,
                    showDenyButton: true,
                    showDenyButton:true,
                    confirmButtonText: "はい",
                    denyButtonText: `いいえ`,
                    allowOutsideClick:false
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire("Saved!", "", "success");
                        localStorage.setItem(key, value);
                        viewStorage();
                        Swal.fire({
                            title: "LocalStorageに" + key + " " + value + "を保存(ほぞん)しました。",
                            icon: "success",
                            draggable: true,
                            allowOutsideClick: false
                        });
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    } else if (result.isDenied) {
                        Swal.fire("まだ保存しません", "", "info");
                    }
                });

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
        let td4 = document.createElement("td");

        // list[i].appendChild(tr);

        list.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        td1.innerHTML = "<input name='radio1' type='checkbox'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);
        td4.innerHTML= "<img src='img/trash_icon.png' class='trash'>";
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
                Swal.fire({
                    title: "Memo app",
                    html: "一つ選んでくださいませ。",
                    icon: "error",
                    allowOutsideClick:false
                });
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
    Swal.fire({
        html: "一つ選んでくださいませ。",
        title: "Memo app",
        icon: "error",
        allowOutsideClick:false
    });
}
//no thing

function delLocalStorage() {
    const del = document.getElementById("del");
    del.addEventListener("click",
        function (e) {
            e.preventDefault();
            const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
            const checkedCount = checkedCheckboxes.length;

            if (checkedCount === 0) {
                Swal.fire({
                    title: "Memo app",
                    html: "削除対象を一つ以上選んでください。",
                    icon: "error",
                    allowOutsideClick:false
                });
                return;
            }
            const keysToDelete = [];
            checkedCheckboxes.forEach(checkbox => {
                // (<tr>)checkbox
                const row = checkbox.closest("tr");
                // 2 (cells[1]) vì checkbox ô 1
                keysToDelete.push(row.cells[1].innerHTML);
            });
            Swal.fire({
                title: "Memo app",
                html: `${checkedCount} 件のデータを削除しますか？`,
                icon: "warning",
                showDenyButton:true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "はい",
                denyButtonText:"いいえ",
                allowOutsideClick:false
            }).then((result) => {
                if (result.isConfirmed) {
                    keysToDelete.forEach(key => {
                        localStorage.removeItem(key);
                        let w_msg = `${checkedCount} 件のデータを LocalStorage から削除しました。`;
                        Swal.fire({
                            title: "Memo app",
                            html: w_msg,
                            icon: "success",
                            draggable: true,
                            allowOutsideClick:false
                        });


                        viewStorage();
                        document.getElementById("textKey").value = "";
                        document.getElementById("textMemo").value = "";
                    })
                }
            });
        }, false
    );
    const table1 = document.getElementById("table1");

table1.addEventListener("click", (e) => {
    if (e.target.classList.contains("trash") === true) {
        let index = e.target.parentNode.parentNode.rowIndex;
        const key = table1.rows[index].cells[1].firstChild.data;
        const value = table1.rows[index].cells[2].firstChild.data;

        let w_delete = `LocalStorageから \n ${key} ${value} \nを削除しますか？`;

        Swal.fire({
            title: "Memo app",
            html: w_delete,
            type: "question",
            showCancelButton: true
        }).then((result) => {
            if (result.value === true) {
                localStorage.removeItem(key);
                viewStorage();

                let w_msg = `LocalStorageから${key} ${value}を削除(delete)しました！`;
                
                Swal.fire({
                    title: "Memo app",
                    html: w_msg,
                    type: "success",
                    allowOutsideClick: false
                });
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        });
    }
});
};
function allClearLocalStorage() {
    const allClear = document.getElementById("allClear");
    allClear.addEventListener("click",
        function (e) {
            e.preventDefault();
            Swal.fire({
                title: "Memo app",
                html: "LocalStorageのデータを全て削除します。\nよろしいでしょうか？",
                icon: "warning",
                showDenyButton:true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "はい?",
                denyButtonText:"いいえ"
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear();
                    viewStorage();
                    let w_msg = "LocalStorageのデータを全て削除しました。"
                    document.getElementById("textKey").value = "";
                    document.getElementById("textMemo").value = "";
                }
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Memo app",
                        html: "LocalStorageのデータを全て削除しました。",
                        icon: "success"
                    });
                }
            });
        }, false
    );
};