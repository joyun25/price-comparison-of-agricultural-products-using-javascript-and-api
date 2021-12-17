// Selectors
const tabParent = document.querySelector('.tab_parent');
const tabs = document.querySelectorAll('.tab');
const searchInput = document.querySelector('#search_input');
const searchSubmit = document.querySelector('.search_submit');
const filterTitlePc = document.querySelector('.info_filter_title-pc');
const filterSubPc = document.querySelector('.info_filter_sub-pc');
const filterSubItemPcs = document.querySelectorAll('.info_filter_subItem-pc');
const filterTitleMb = document.querySelector('.info_filter_title-mb');
const filterSubMb = document.querySelector('.info_filter_sub-mb');
const filterSubItemMbs = document.querySelectorAll('.info_filter_subItem-mb');
const infoText = document.querySelector('.info_text');
const tbody = document.querySelector('.tbody');

// Functions
function categoryList (categoryList) {
    categoryList.forEach(item => {
        tbody.innerHTML += `
            <tr>
                <td class="table_content table_first">${item.作物名稱}</td>
                <td class="table_content">${item.市場名稱}</td>
                <td class="table_content">${item.上價}</td>
                <td class="table_content">${item.中價}</td>
                <td class="table_content">${item.下價}</td>
                <td class="table_content">${item.平均價}</td>
                <td class="table_content">${item.交易量}</td>
            </tr>
        `;
    });
}

function unFind (){
    tbody.innerHTML = `
        <tr>
            <td colspan="7" class="table_info text_align_center">查詢不到當日的交易資訊</td>
        </tr>
    `;
}

// Event Listener
// --tabs switch
tabParent.addEventListener('click', e => {
    if (e.target.classList.contains('tab')){
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        e.target.classList.add('active');
        infoText.innerText = '';
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="table_info text_align_center">請輸入並搜尋想比價的作物名稱</td>
            </tr>
        `;
    } else {
        return
    }
})

// --search
searchSubmit.addEventListener('click', () => {
    tbody.innerHTML = `
        <tr>
            <td colspan="7" class="table_info text_align_center">資料載入中...</td>
        </tr>
    `;
    // axios
    axios.get('	https://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx')
    .then(function(response) {
    // selector
        const data = response.data;
        const vegetable = data.filter(function(item){
            return item.種類代碼 == 'N04';
        });
        const fruit = data.filter(function(item){
            return item.種類代碼 == 'N05';
        });
        const flower = data.filter(function(item){
            return item.種類代碼 == 'N06';
        });
    
        if (searchInput.value == '') {
            alert('請輸入作物名稱');
        } else if (tabs[0].classList.contains('active')){
            let vegetableList = vegetable.filter(function(item){
                return item.作物名稱.includes(searchInput.value);
            });
            infoText.innerText = `查看「${searchInput.value}」的比價結果`;
            tbody.innerHTML = '';
            if (vegetableList == '') {
                unFind ();
            } else {
                categoryList (vegetableList);
            }
            
        } else if (tabs[1].classList.contains('active')){
            let fruitList = fruit.filter(function(item){
                return item.作物名稱.includes(searchInput.value);
            });
            infoText.innerText = `查看「${searchInput.value}」的比價結果`;
            tbody.innerHTML = '';
            if (fruitList == '') {
                unFind ();
            } else {
                categoryList (fruitList);
            }

        } else {
            let flowerList = flower.filter(function(item){
                return item.作物名稱.includes(searchInput.value);
            });
            infoText.innerText = `查看「${searchInput.value}」的比價結果`;
            tbody.innerHTML = '';
            if (flowerList == '') {
                unFind ();
            } else {
                categoryList (flowerList);
            }
        }
        searchInput.value = '';
    })
})

// --filter PC
filterTitlePc.addEventListener('click', () => {
    filterSubPc.classList.toggle('d-none');
    filterSubItemPcs.forEach(subItem => {
        subItem.addEventListener('click', () => {
            filterTitlePc.innerHTML = `${subItem.innerText} <i class="fas fa-caret-down"></i>`;
            filterSubPc.classList.add('d-none');
        })
    });
})

// --filter Mb
filterTitleMb.addEventListener('click', () => {
    filterSubMb.classList.toggle('info_filter_sub-mb-open');
    filterSubItemMbs.forEach(subItem => {
        subItem.addEventListener('click', () => {
            filterTitleMb.innerHTML = `${subItem.innerText}&nbsp;<i class="fas fa-sort"></i>`;
            filterSubMb.classList.remove('info_filter_sub-mb-open');
        })
    });
})

console.log('1');