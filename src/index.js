// change require to es6 import style
import $ from 'jquery';
import './style.scss';

let timer = 0;

setInterval(() => {
  timer += 1;
  const foo = `You've been on this page for ${timer} seconds`;
  $('#main').html(foo);
}, 1000);
