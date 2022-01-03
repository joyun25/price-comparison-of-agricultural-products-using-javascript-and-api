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
let currentList;

// Functions
function writeResults (categoryList) {
    tbody.innerHTML = '';
    let str = '';
    currentList = categoryList;
    currentList.forEach(item => {
        str += `
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
    tbody.innerHTML = str;
}

function writeUnFind (){
    tbody.innerHTML = `
        <tr>
            <td colspan="7" class="table_info text_align_center">查詢不到當日的交易資訊</td>
        </tr>
    `;
}

function sort (item) {
    if (item.textContent.includes('上價')) {
        let sortList = currentList.sort(function(a, b){
            return a.上價 - b.上價;
        });
        writeResults (sortList);
    } else if (item.textContent.includes('中價')) {
        let sortList = currentList.sort(function(a, b){
            return a.中價 - b.中價;
        });
        writeResults (sortList);
    } else if (item.textContent.includes('下價')) {
        let sortList = currentList.sort(function(a, b){
            return a.下價 - b.下價;
        });
        writeResults (sortList);
    } else if (item.textContent.includes('平均價')) {
        let sortList = currentList.sort(function(a, b){
            return a.平均價 - b.平均價;
        });
        writeResults (sortList);
    } else {
        let sortList = currentList.sort(function(a, b){
            return a.交易量 - b.交易量;
        });
        writeResults (sortList);
    }
}

function judgeAndWrite (categoryList){
    if (document.documentElement.scrollWidth > 767) {
        if (filterTitlePc == ''){
            writeResults (categoryList);
        } else {
            currentList = categoryList;
            sort(filterTitlePc);
        }
    } else {
        if (filterTitleMb == ''){
            writeResults (categoryList);
        } else {
            currentList = categoryList;
            sort(filterTitleMb);
        }
    }
}

// Event Listener
// --tabs switch
tabParent.addEventListener('click', e => {
    if (e.target.classList.contains('tab')){
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        e.target.classList.add('active');
        currentList = '';
        infoText.textContent = '';
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="table_info text_align_center">請輸入並搜尋想比價的作物名稱</td>
            </tr>
        `;
    } else {
        return
    }
})

// --filter Pc
filterTitlePc.addEventListener('click', () => {
    if (currentList == '' || currentList == undefined || currentList == null){
        filterSubPc.classList.toggle('d-none');
        filterSubItemPcs.forEach(subItem => {
            subItem.addEventListener('click', () => {
                filterTitlePc.innerHTML = `${subItem.textContent} <i class="fas fa-caret-down"></i>`;
                filterSubPc.classList.add('d-none');
            })
        });
    } else {
        filterSubPc.classList.toggle('d-none');
        filterSubItemPcs.forEach(subItem => {
            subItem.addEventListener('click', e => {
                sort (e.target);
                filterTitlePc.innerHTML = `${subItem.textContent} <i class="fas fa-caret-down"></i>`;
                filterSubPc.classList.add('d-none');
            })
        });
    }
})

// --filter Mb
filterTitleMb.addEventListener('click', () => {
    if (currentList == '' || currentList == undefined || currentList == null) {
        filterSubMb.classList.toggle('info_filter_sub-mb-open');
        filterSubItemMbs.forEach(subItem => {
            subItem.addEventListener('click', () => {
                filterTitleMb.innerHTML = `${subItem.textContent}&nbsp;<i class="fas fa-sort"></i>`;
                filterSubMb.classList.remove('info_filter_sub-mb-open');
            })
        });
    } else {
        filterSubMb.classList.toggle('info_filter_sub-mb-open');
        filterSubItemMbs.forEach(subItem => {
            subItem.addEventListener('click', e => {
                sort (e.target);
                filterTitleMb.innerHTML = `${subItem.textContent}&nbsp;<i class="fas fa-sort"></i>`;
                filterSubMb.classList.remove('info_filter_sub-mb-open');
            })
        });
    }
})

// axios
axios.get('https://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx')
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
    // --submit
    searchSubmit.addEventListener('click', () => {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="table_info text_align_center">資料載入中...</td>
            </tr>
        `;
        
        if (searchInput.value.trim() == '') {
            alert('請輸入作物名稱');
        } else if (tabs[0].classList.contains('active')){
            let vegetableList = vegetable.filter(function(item){
                return item.作物名稱.includes(searchInput.value.trim());
            });
            infoText.textContent = `查看「${searchInput.value.trim()}」的比價結果`;
            if (vegetableList == '') {
                writeUnFind ();
            } else {
                judgeAndWrite (vegetableList);
            }
            
        } else if (tabs[1].classList.contains('active')){
            let fruitList = fruit.filter(function(item){
                return item.作物名稱.includes(searchInput.value.trim());
            });
            infoText.textContent = `查看「${searchInput.value.trim()}」的比價結果`;
            if (fruitList == '') {
                writeUnFind ();
            } else {
                judgeAndWrite (fruitList);
            }

        } else {
            let flowerList = flower.filter(function(item){
                return item.作物名稱.includes(searchInput.value.trim());
            });
            infoText.textContent = `查看「${searchInput.value.trim()}」的比價結果`;
            if (flowerList == '') {
                writeUnFind ();
            } else {
                judgeAndWrite (flowerList);
            }
        }
        searchInput.value = '';
    })
})
