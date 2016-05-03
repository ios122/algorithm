'use strict';

/**
 * 快速排序的随机化版本.对整个数组排序,可使用 A(0, A.length - 1);
 *
 * @param  {array} A 数组.
 * @param  {number} p 起始下标.
 * @param  {number} r 结束下标.
 */
function randomizedQuicksort(A, p, r) {
  if (p < r) {
    var q = randomizedPartition(A, p, r);
    randomizedQuicksort(A, p, q - 1);
    randomizedQuicksort(A, q + 1, r);
  }
}

/**
 * 随机化的子数组原址重排.
 *
 * @param  {array} A 数组.
 * @param  {number} p 下标
 * @param  {number} r 下标.
 * @return {number}   下标,下标左侧的元素总是小于右侧的元素.
 */
function randomizedPartition(A, p, r) {
  var i = random(p, r);
  exchage(A, r, i);
  return partition(A, p, r);
}

/**
 * 子数组原址重排.
 *
 * @param  {array} A 数组.
 * @param  {number} p 下标
 * @param  {number} r 下标.
 * @return {number}   下标,下标左侧的元素总是小于右侧的元素.
 */
function partition(A, p, r) {
  var x =  A[r];
  var i = p - 1;
  for (var j = p; j <= r - 1; j++) {
    if (A[j] <= x) {
      i = i + 1;
      exchage(A, i, j);
    }
  }
  exchage(A, i + 1, r);
  return i + 1;
}

/**
 * 返回一个 [p, r]之间的随机整数,包含p和r.
 *
 * @param  {number} p 最小值.
 * @param  {number} r 最大值.
 * @return {number}   返回一个 [p, r]之间的随机整数,包含p和r.
 */
function random(p, r) {
  return Math.floor(Math.random() * (1 + r - p)) + p;
}

/**
 * 交换数组中指定下标的元素.
 *
 * @param  {array} A 数组.
 * @param  {number} i 元素下标.
 * @param  {number} j 元素下标.
 * @return {number}   元素下标.
 */
function exchage(A, i, j){
  var tmp = A[i];
  A[i] = A[j];
  A[j] = tmp;
}
