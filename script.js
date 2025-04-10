let books = [];

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

  const book = {
    id: bookNumber(),
    category: category.value,
    title: bookName.value,
    price: bookPrice.value,
  }
  const list = document.querySelectorAll('#book-list-tbody tr');
  
  // 중복 검사
  if (list != null) {
    for (let i = 0; i < list.length; i++) {
      const listTd = list[i].querySelectorAll('td');
      if (listTd[1].textContent == book.category && listTd[2].textContent == book.title) {
        alert('같은 카테고리 안에 동일한 책이 중복되어 있습니다');
        return;
      }
    }
  }
  books.push(book);
  tableLoad();
  category.value = '';
  bookName.value = '';
  bookPrice.value = '';
  alert('도서가 성공적으로 등록되었습니다');
}

function bookNumber() {
  const list = document.querySelectorAll('#book-list-tbody tr');
  return list.length + 1;
};

// 테이블 재생성
function tableLoad() {
  const tbody = document.getElementById('book-list-tbody');
  tbody.innerHTML = '';

  books.forEach(book => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.id}</td>
    <td>${book.category}</td>
    <td>${book.title}</td>
    <td>${book.price}</td>
    <td>
      <button onclick="deleteBook(${book.id})">삭제</button></td>
    `;
    tbody.appendChild(row);
  });
}

// 정렬
function bookSort() {
  const select = document.getElementById('sort-select');
  if (select.value == 'ascending') {
    books.sort((a, b) => {
      if (a.price > b.price) {
        return 1;
      } else if (a.price < b.price) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (select.value == 'descending') {
    books.sort((a, b) => {
      if (a.price < b.price) {
        return 1;
      } else if (a.price > b.price) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  tableLoad();
}

// 삭제버튼
function deleteBook(bookid) {
  books.splice(bookid - 1, 1);
  bookNumberCheck();
  tableLoad();
}

// 번호 재배열
function bookNumberCheck() {
  for (let i = 0; i < books.length; i++) {
    books[i].id = i + 1;
  }
}

// 검색
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
  searchText.value = '';
}