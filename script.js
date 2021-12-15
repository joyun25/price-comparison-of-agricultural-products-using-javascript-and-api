// Selectors
const tabParent = document.querySelector('.tab_parent');
const tabs = document.querySelectorAll('.tab');
const filterTitlePc = document.querySelector('.info_filter_title-pc');
const filterSubPc = document.querySelector('.info_filter_sub-pc');
const filterSubItemPcs = document.querySelectorAll('.info_filter_subItem-pc');
const filterTitleMb = document.querySelector('.info_filter_title-mb');
const filterSubMb = document.querySelector('.info_filter_sub-mb');
const filterSubItemMbs = document.querySelectorAll('.info_filter_subItem-mb');

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