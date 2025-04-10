function registerBook() {
  const category = document.getElementById('category');
  if (category.value == '') {
    alert('카테고리를 선택해주세요');
    return;
  }

  const bookName = document.getElementById('bookname');
  if (bookName.value == '') {
    alert('도서명을 입력해주세요');
    return;
  }

  const bookPrice = document.getElementById('bookprice');
  if (bookPrice.value == '') {
    alert('가격을 입력해주세요');
    return;
  }

  const tbody = document.getElementById('book-list-tbody');
  const tr = document.createElement('tr');

  const td = document.createElement('td');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  const td3 = document.createElement('td');
  const td4 = document.createElement('td');
  const deletebutton = document.createElement('button');

  td.append(bookNumber());
  td1.append(category.value);
  td2.append(bookName.value);
  td3.append(bookPrice.value);
  td4.append(deletebutton);

  tr.appendChild(td);
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);

  deletebutton.textContent = '삭제';
  deletebutton.addEventListener('click', () => {
    tr.remove();
    listNumberCheck();
  });

  const list = document.querySelectorAll('#book-list-tbody tr');
  if (list != '') {
    for (let i = 0; i < list.length; i++) {
      const listTd = list[i].querySelectorAll('td');
      if (listTd[1].textContent == category.value && listTd[2].textContent == bookName.value) {
        alert('같은 카테고리 안에 동일한 책이 중복되어 있습니다');
        return;
      }
    }

    tbody.appendChild(tr);

    category.value = '';
    bookName.value = '';
    bookPrice.value = '';
    bookNumber();
    alert('도서가 성공적으로 등록되었습니다');
  }

  // const sortbutton = document.getElementById('#sort-select');
  // sortbutton.addEventListener('change', () => {
  //   console.log('di');
  // });
};

// 초기 번호부여
function bookNumber() {
  const list = document.querySelectorAll('#book-list-tbody tr');
  return list.length + 1;
};

// 번호 재부여
function listNumberCheck() {
  const list = document.querySelectorAll('#book-list-tbody tr');
  for (let i = 0; i < list.length; i++) {
    list[i].querySelector('td').textContent = i + 1;
  };
};

// 정렬려려렬려려려ㅕㅕ려dkdkdkkkkkkkkkkkkkkkkkkkkkkkkkkk
function bookSorts() {
  const select = document.getElementById('sort-select');

  const list = document.querySelectorAll('#book-list-tbody tr');

  if (list != null) {
    if (select.value == 'ascending') {
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - i - 1; j++) {
          const a = list[j].querySelectorAll('td');
          console.log('a: ', a);
          const b = list[j + 1].querySelectorAll('td');
          console.log('b: ', b);
          if (a[3] > b[3]) {
            list[j] = b;
            list[j + 1] = a;
          }
        }
      }
    } else if (select.value == 'descending') {
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length - i - 1; j++) {
          const a = list[j].querySelectorAll('td');
          const b = list[j + 1].querySelectorAll('td');
          if (b[3] > a[3]) {
            list[j] = b;
            list[j + 1] = a;
          }
        }
      }
    }
  }
  const tr = document.querySelectorAll('#book-list-tbody-tr');
  list.forEach(row => tr.appendChild(row));
};

// 정렬 다시 dkdksadfsakndfkanowibg
function bookSort1() {
  const select = document.getElementById('sort-select');
  const list = Array.from(document.querySelectorAll('#book-list-tbody tr'));
  const body = document.querySelectorAll('book-list-tbody tr');
  if (list != null) {
    if (select.value == 'ascending') {
      list.sort((a, b) => {
        a.querySelectorAll('td')[3] > b.querySelectorAll('td')[3] ? 1 : -1
      });
    } else if (select.value == 'descending') {

    }
  }
}


// 검색기능
function search() {
  const searchText = document.getElementById('search-input');
  const list = document.querySelectorAll('#book-list-tbody tr');
  list.forEach((tr) => {
    tr.hidden = false;
  });
  if (searchText.value == '') {
    return;
  }
  list.forEach((tr) => {
    const td = tr.querySelectorAll('td')[2];
    if (td.textContent != searchText.value) {
      tr.hidden = true;
    }
  });
}