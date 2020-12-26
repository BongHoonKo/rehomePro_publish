'use strict';

window.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('[role="tab"]');
    const tabList = document.querySelector('[role="tablist"]');

    // 탭
    if(tabs) {
      tabs.forEach(tab => {
        tab.addEventListener("click", changeTabs);
      });
    }
  
    let tabFocus = 0;
    
    if(tabList) {
      tabList.addEventListener("keydown", e => {
        // Move right
        if (e.keyCode === 39 || e.keyCode === 37) {
          tabs[tabFocus].setAttribute("tabindex", -1);
          if (e.keyCode === 39) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
              tabFocus = 0;
            }
            // Move left
          } else if (e.keyCode === 37) {
            tabFocus--;
            if (tabFocus < 0) {
              tabFocus = tabs.length - 1;
            }
          }
    
          tabs[tabFocus].setAttribute("tabindex", 0);
          tabs[tabFocus].focus();
        }
      });
    }

    // 아코디언
    let accrBtns = document.querySelectorAll('.accordian .accordian-controls');
    if(accrBtns) {
      accrBtns.forEach(accr => {
        accr.addEventListener("click", handleAccordian);
      });
    }

    insertPageList();
  });

  function handleAccordian(e) {
    const target = e.currentTarget;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    parent
      .querySelectorAll('[aria-expanded="true"]')
      .forEach(t => t.setAttribute("aria-expanded", false));

    target.setAttribute("aria-expanded", true);

    grandparent
      .querySelectorAll('.accordian-content')
      .forEach(p => p.setAttribute("hidden", true));
  
    grandparent.parentNode
      .querySelector(`#${target.getAttribute("aria-controls")}`)
      .removeAttribute("hidden");
  }
  
  function changeTabs(e) {
    const target = e.currentTarget;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;
  
    parent
      .querySelectorAll('[aria-selected="true"]')
      .forEach(t => t.setAttribute("aria-selected", false));
  
    target.setAttribute("aria-selected", true);
  
    grandparent
      .querySelectorAll('[role="tabpanel"]')
      .forEach(p => p.setAttribute("hidden", true));
  
    console.log(target.getAttribute("aria-controls"));
    grandparent.parentNode
      .querySelector(`#${target.getAttribute("aria-controls")}`)
      .removeAttribute("hidden");
  }


  let closeModal = function(e) {
    e.currentTarget.closest('.modal').classList.remove('active');
  }

/* 퍼블리싱 페이지 보기 ( 아래로 추후 삭제 ) */
function insertPageList() {
  let list = ['terms','c-channel-list','member-list','index','home','login','register','faq','c-site-list','channel-list','channel-detail','cs','my-info','notice-list','save-list','site-detail','site-list','welcome'];
  let html = '';
  list.forEach(item => {
      html += '<li><a href="/'+ item +'.html">'+ item +'</a></li>'
  });
  //document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin','<ul class="view-site">'+ html +'</ul>');

  //document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin','<button class="test-btn" onclick="showSiteList(this);"></button>');
}

function showSiteList(e) {
  if(e.classList.contains('active')) {
      e.classList.remove('active');
      document.querySelector('.view-site').classList.remove("active");
  }
  else {
      e.classList.add('active');
      document.querySelector('.view-site').classList.add("active");
  }
}

function showSideMenu() {
  let sideMenu = document.querySelector('.side-menu');
  sideMenu.classList.add('active');
}
function removeSideMenu() {
  let sideMenu = document.querySelector('.side-menu');
  sideMenu.classList.remove('active');
}