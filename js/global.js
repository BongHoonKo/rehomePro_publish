'use strict';

window.addEventListener("DOMContentLoaded", function() {
  var tabs = document.querySelectorAll('[role="tab"]');
  var tabList = document.querySelector('[role="tablist"]');

    // 탭
    if(tabs) {
      tabs = [].slice.call(tabs);
      tabs.forEach(function(tab) {
        tab.addEventListener("click", changeTabs);
      });
    }
  
    var tabFocus = 0;
    
    if(tabList) {
      tabList.addEventListener("keydown", function(e) {
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
    var accrBtns = document.querySelectorAll('.accordian .accordian-controls');
    if(accrBtns) {
      accrBtns = [].slice.call(accrBtns);
      accrBtns.forEach(function(accr) {
        accr.addEventListener("click", handleAccordian);
      });
    }

    insertPageList();
  });

  function handleAccordian(e) {
    var target = e.currentTarget;
    var parent = target.parentNode;
    var grandparent = parent.parentNode;

    var parentExpanded = parent.querySelectorAll('[aria-expanded="true"]');
    parentExpanded = [].slice.call(parentExpanded);
    parentExpanded.forEach(function(t) {t.setAttribute("aria-expanded", false)});

    target.setAttribute("aria-expanded", true);

    var grandExpanded = grandparent.querySelectorAll('.accordian-content');
    grandExpanded = [].slice.call(grandExpanded);
    grandExpanded.forEach(function(p) {p.setAttribute("hidden", true);});
  
    grandparent.parentNode
      .querySelector("#" + target.getAttribute("aria-controls"))
      .removeAttribute("hidden");
  }
  
  function changeTabs(e) {
    var target = e.currentTarget;
    var parent = target.parentNode;
    var grandparent = parent.parentNode;
  
    var parentExpanded = parent.querySelectorAll('[aria-selected="true"]');
    parentExpanded = [].slice.call(parentExpanded);
    parentExpanded.forEach(function(t) {t.setAttribute("aria-selected", false);});
  
    target.setAttribute("aria-selected", true);
  
    var grandExpanded = grandparent.querySelectorAll('[role="tabpanel"]');
    grandExpanded = [].slice.call(grandExpanded);
    grandExpanded.forEach(function(p) {p.setAttribute("hidden", true);});
  
    console.log(target.getAttribute("aria-controls"));
    grandparent.parentNode
      .querySelector("#" + target.getAttribute("aria-controls"))
      .removeAttribute("hidden");
  }


  var closeModal = function(e) {
    e.currentTarget.closest('.modal').classList.remove('active');
  }

/* 퍼블리싱 페이지 보기 ( 아래로 추후 삭제 ) */
function insertPageList() {
  var list = ['c-register-info','commute-management','c-site-detail','c-site-list','site-register','site-list','site-detail','guide','notice-list','design-detail','design-list','design-register','index','login','member-management','mypage','phone-verify','register-complete','register-info'];
  var html = '';
  list.forEach(function(item) {
      html += '<li><a href="/'+ item +'.html">'+ item +'</a></li>'
  });
  document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin','<ul class="view-site">'+ html +'</ul>');

  document.getElementsByTagName('body')[0].insertAdjacentHTML('afterbegin','<button class="test-btn" onclick="showSiteList(this);"></button>');
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
  var sideMenu = document.querySelector('.side-menu');
  sideMenu.classList.add('active');
}
function removeSideMenu() {
  var sideMenu = document.querySelector('.side-menu');
  sideMenu.classList.remove('active');
}