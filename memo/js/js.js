// // Load dữ liệu khi trang vừa mở
// window.onload = function () {
//   loadMemos();
//   initializeCloseButtons();
//   initializeListClicks();
// };

// // Hàm load memos từ localStorage
// function loadMemos() {
//   var saved = localStorage.getItem("myMemos");
//   if (saved) {
//     document.getElementById("myUL").innerHTML = saved;
//     initializeCloseButtons();
//     initializeListClicks();
//   }
// }

// // Khởi tạo các nút close
// function initializeCloseButtons() {
//   var close = document.getElementsByClassName("close");
//   for (var i = 0; i < close.length; i++) {
//     close[i].onclick = function (e) {
//       e.stopPropagation();
//       var parentLi = this.parentElement;

//       Swal.fire({
//         title: '削除しますか？',
//         text: "このメモを削除してもよろしいですか？",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#f44336',
//         cancelButtonColor: '#3085d6',
//         confirmButtonText: 'はい、削除します',
//         cancelButtonText: 'キャンセル'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           parentLi.remove();
//           saveMemos();

//           Swal.fire({
//             title: '削除しました！',
//             text: 'メモが削除されました。',
//             icon: 'success',
//             timer: 1500,
//             showConfirmButton: false
//           });
//         }
//       });
//     };
//   }
// }

// // Khởi tạo sự kiện click cho li để toggle memo
// function initializeListClicks() {
//   var items = document.querySelectorAll('#myUL li');
//   for (var i = 0; i < items.length; i++) {
//     items[i].onclick = function (e) {
//       // Không toggle nếu click vào nút close
//       if (e.target.classList.contains('close')) return;
//       this.classList.toggle('expanded');
//     }
//   }
// }

// // Lưu memos vào localStorage
// function saveMemos() {
//   var content = document.getElementById("myUL").innerHTML;
//   localStorage.setItem("myMemos", content);
// }

// // Thêm memo mới
// function newElement() {
//   var keyValue = document.getElementById("textKey").value.trim();
//   var memoValue = document.getElementById("textMemo").value.trim();

//   if (keyValue === '') {
//     Swal.fire({
//       icon: "error",
//       title: "キーを入力してください！",
//     });
//     return;
//   }

//   if (memoValue === '') {
//     Swal.fire({
//       icon: "error",
//       title: "メモを入力してください！",
//     });
//     return;
//   }

//   var li = document.createElement("li");
//   var tbody= document.createElement("tbody")
//   // Tạo phần Key
//   var keySpan = document.createElement("span");
//   keySpan.className = "memo-key";
//   keySpan.textContent = keyValue;
//   li.appendChild(keySpan);

//   // Tạo phần Memo content
//   var memoDiv = document.createElement("div");
//   memoDiv.className = "memo-content";
//   memoDiv.textContent = memoValue;
//   li.appendChild(memoDiv);

//   // Tạo nút close
//   var span = document.createElement("SPAN");
//   span.className = "close";
//   span.textContent = "×";
//   span.onclick = function (e) {
//     e.stopPropagation();
//     var parentLi = this.parentElement;

//     // Hiển thị confirm dialog
//     Swal.fire({
//       title: '削除しますか？',
//       text: "このメモを削除してもよろしいですか？",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#f44336',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'はい、削除します',
//       cancelButtonText: 'キャンセル'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Nếu chấp nhận thì xóa
//         parentLi.remove();
//         saveMemos();

//         Swal.fire({
//           title: '削除しました！',
//           text: 'メモが削除されました。',
//           icon: 'success',
//           timer: 1500,
//           showConfirmButton: false
//         });
//       }
//     });
//   };
//   li.appendChild(span);
//   // Click vào li để toggle memo
//   li.onclick = function (e) {
//     if (e.target.classList.contains('close')) return;
//     this.classList.toggle('expanded');
//   };

//   document.getElementById("myUL").appendChild(li);
//   document.getElementById("textKey").value = "";
//   document.getElementById("textMemo").value = "";

//   saveMemos();

//   Swal.fire({
//     icon: "success",
//     title: "追加しました！",
//     timer: 1500,
//     showConfirmButton: false
//   });
// }
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
            if (key=="" || value== "") {
                window.alert("Key、Memoはいずれも必須 (ひっす)です。");
                return;
            } else {
                localStorage.setItem(key, value);
                viewStorage();
                let w_msg = "LocalStorageに" + key + " " + value + "を保存(ほぞん)しました。"; 
                window.alert(w_msg);
                document.getElementById("textKey").value = "";
                document.getElementById("textMemo").value = "";
            }
        },false
    );
};

function selectTable(){
  const select= document.getElementById("select");
  select.addEventListener("click",
    function(e){
      e.preventDefault();
      selectRadioBtn();
    },false
  );
};

function selectRadioBtn(){
  let w_sel="0";
  const radio1= document.getElementsByName("radio1");
  const table1= document.getElementById("table1");

  for(let i=0;i <radio1.length;i++){
    if(radio1[i].checked){
      document.getElementById("textKey").value= table1.rows[i+1].cells[1].firstChild.data;
      document.getElementById("textMemo").value= table1.rows[i+1].cells[2].firstChild.data;
      return w_sel="1";
    }
  }
window.alert("1つ選択してください");
};

function  viewStorage() {
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

        td1.innerHTML = "<input name='radio1' type='radio'>";
        td2.innerHTML = w_key;
        td3.innerHTML = localStorage.getItem(w_key);

    }

}