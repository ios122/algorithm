'use strict';

/**
选择问题
输入: 一个包含n个(互异的)数的集合A和一个整数i,1 <= i <= n;
输出: 元素 x ∈ A,且 A 中恰好有 i - 1 个其他元素小于它.
 */

/**
 * 期望为线性时间的选择算法.
 *
 * @param  {array} A 无序的元素集合.
 * @param  {number} p 起始点.
 * @param  {number} r 结束点.
 * @param  {number} i 第 i 小.
 * @return {number}   A 中, p ~ r 范围内, 第 i 小的元素.
 */
function randomizedSelect(A, p, r, i) {
  if (p === r) {
    return A[p];
  }
  var q = randomizedPartition(A, p, r);
  var k = q - p + 1;
  if (i === k) {
    return A[q];
  } if (i < k) {
    return randomizedSelect(A, p, q - 1, i);
  }else {
    return randomizedSelect(A, q + 1, r, i - k);
  }
}

// ----------- 以下工具代码摘自 randomizedQuicksort.js  ----------

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

// -------------- 补充两个随机数算法. -----------------

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
 * 随机产生n个位于p~r之间的互异的整数.
 *
 * @param  {number} p 最小值.
 * @param  {number} r 最大值.
 * @param  {number} n 数量.
 * @return {array} n个位于p~r之间的互异的整数.
 */
function randomNotEqual(p, r, n) {
  if (n > r - p + 1) {
    n = r - p + 1;
  }

  if (n <= 0) {
    return [];
  }

  var C = [];

  for (var i = p; i <= r; i++) {
    C[i] = 0;
  }

  var randoms = [];

  for (var j = 0; j < n; j++) {
    var randomElement;
    do {
       randomElement = random(p, r);
    } while (0 !== C[randomElement]);
    randoms.push(randomElement);
    C[randomElement] = C[randomElement] + 1;
  }

  return randoms;
}
