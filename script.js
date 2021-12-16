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

// Axios
axios.get('	https://data.coa.gov.tw/Service/OpenData/FromM/FarmTransData.aspx')
.then(function(response) {

    // Selector
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
    
    // Tabs Switch
    tabParent.addEventListener('click', e => {
        if (e.target.classList.contains('tab')){
            tabs.forEach(tab => {
                tab.classList.remove('active');
            });
            e.target.classList.add('active');
        } else {
            return
        }
    })

    // Search Submit
    searchSubmit.addEventListener('click', () => {
        if (searchInput.value == '') {
            alert('請輸入作物名稱');
        } else if (tabs[0].classList.contains('active')){
            console.log(vegetable[0]);
        } else if (tabs[1].classList.contains('active')){
            console.log(fruit[0]);
        } else {
            console.log(flower[0]);
        }
        searchInput.value = '';
    })
})

// Filter PC
filterTitlePc.addEventListener('click', () => {
    filterSubPc.classList.toggle('d-none');
    filterSubItemPcs.forEach(subItem => {
        subItem.addEventListener('click', () => {
            filterTitlePc.innerHTML = `${subItem.innerText} <i class="fas fa-caret-down"></i>`;
            filterSubPc.classList.add('d-none');
        })
    });
})

// Filter Mb
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