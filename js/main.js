let showForm = document.querySelector('form')
let showFormDate = document.querySelector('.date')
let list = document.querySelector('ul.list')

function currency(date) {
  const api = new XMLHttpRequest()
  let apiUrl = 'https://cbu.uz/oz/arkhiv-kursov-valyut/json/'
  console.log(!date);
  if (date) {
    apiUrl += 'all/' + date + '/'
    console.log(apiUrl);
    api.open('GET', apiUrl)
  } else {
    console.log('err');
  }
  api.send()
  api.addEventListener('readystatechange', () => {
    if (api.readyState === 4 && api.status === 200) {
      let data = JSON.parse(api.responseText)
      list.innerHTML = ''
      data.forEach(item => {
        list.innerHTML += `
          <li>
            <div class="title">
              <div class="name">${item.CcyNm_UZ}</div>
              <div class="desc">${item.Ccy} = ${item.Rate}</div>
            </div>
            <div class="rate">
              ${item.Diff > 0 ? '<span class="up"><i class="fi fi-rr-arrow-trend-up"></i></span>' : '<span class="down"><i class="fi fi-rr-arrow-trend-down"></i></span>'}
              <span>${item.Diff > 0 ? '+' + item.Diff : item.Diff}</span>
            </div>
          </li>
      `
      });
    }
  })
}
// currency()

showForm.addEventListener('submit', (e) => {
  e.preventDefault()
  currency(showFormDate.value)
  console.log(typeof showFormDate.value);
})