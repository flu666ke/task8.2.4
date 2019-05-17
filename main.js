'use strict'

var menu = ['Prices', 'Events', 'Service', 'Contacts'];
var prices = ['<500$', '<2000$', '>2000$'];
var events = ['Sale', 'New', 'Other'];
var service = ['Order', 'Rent'];
var contacts = ['Mail', 'Address', 'Twitter'];

function CreateMenu(data, id_name, firstUl, firstLi, subUl, subLi) {
    let container = document.querySelector(id_name);

    function CreateSubMenu(ar1, ar2) {
        let ul = document.createElement('ul');
        ul.className = firstUl;

        for (let i of ar1) {
            let li = document.createElement('li');
            li.className = firstLi;
            li.innerHTML = i;

            let ul2 = document.createElement('ul');
            ul2.className = subUl;

            for (let j of ar2) {
                let li2 = document.createElement('li');
                li2.className = subLi;
                let a = document.createElement('a');
                a.setAttribute('href', '#');
                a.innerHTML = j;

                li2.appendChild(a);
                ul2.appendChild(li2);
            }

            li.appendChild(ul2);
            ul.appendChild(li);

            (data => data = data.shift())(data);
            break;
        }

        container.appendChild(ul);
    }

    CreateSubMenu(data, prices);
    CreateSubMenu(data, events);
    CreateSubMenu(data, service);
    CreateSubMenu(data, contacts);

    let btn = document.createElement('button');
    btn.innerHTML = 'Menu';
    btn.className = 'hidden-btn';
    container.appendChild(btn);

    menu = ['Prices', 'Events', 'Service', 'Contacts'];
}

CreateMenu(menu, '#menu', 'first-lvl-ul-top', 'first-lvl-li-top', 'second-lvl-ul-top', 'second-lvl-li-top');
CreateMenu(menu, '#menu2', 'first-lvl-ul-left', 'first-lvl-li-left', 'second-lvl-ul-left', 'second-lvl-li-left');


var showSubMenu = function (elem, setSubclass) {
    document.querySelector(elem).onclick = function (e) {
        let target = e.target;

        if (target.tagName == 'UL') {
            target.childNodes[0].childNodes[1].classList.toggle(setSubclass);
        } else if (target.tagName == 'LI') {
            target.childNodes[1].classList.toggle(setSubclass);
        } else {
            return;
        }
    }
}

showSubMenu('#menu', 'show-second-lvl-ul-top');
showSubMenu('#menu2', 'show-second-lvl-ul-left');


window.onresize = () => {
    let smallMenuTop = document.querySelector('#menu');
    let smallMenuLeft = document.querySelector('#menu2');
    let btn = document.querySelector('.hidden-btn');

    function adaptive(smallSize, smallMenu, smallMenuClass, showSmallMenuClass, classMenu) {
        if (smallSize.matches) {
            smallMenu.className = smallMenuClass;

            smallMenu.onmouseover = function () {
                this.classList.add(showSmallMenuClass);
            }
            smallMenu.onmouseout = function () {
                this.classList.toggle(showSmallMenuClass);
            }
        } else {
            smallMenu.className = classMenu;
        }
    }

    adaptive(window.matchMedia('all and (max-width: 480px)'), smallMenuTop, 'small-menu-top', 'show-small-menu-top', 'menu');
    adaptive(window.matchMedia('all and (max-width: 480px)'), smallMenuLeft, 'small-menu-left', 'show-small-menu-left', 'menu2');

    function btnMenu(smallSize) {
        if (smallSize.matches) {
            smallMenuTop.className = 'hidden-menu';

            btn.onclick = function () {
                smallMenuTop.classList.toggle('show-menu');
            }
            showSubMenu('#menu', 'sub-hidden-menu');
        } else {
            showSubMenu('#menu', 'show-second-lvl-ul-top');
        }
    }
    btnMenu(window.matchMedia('all and (max-width: 400px)'));
}