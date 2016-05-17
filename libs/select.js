'use strict';

/**
选择问题
输入: 一个包含n个(互异的)数的集合A和一个整数i,1 <= i <= n;
输出: 元素 x ∈ A,且 A 中恰好有 i - 1 个其他元素小于它.
 */

/**
 * 最坏情况为线性时间的选择算法.
 *
 * @param  {array} A 无序的不同的元素集合.
 * @param  {number} i 第 i 小.
 * @return {number}   A 中, 第 i 小的元素.
 */
function select(A, i) {
  if (1 === A.length) {
    return A[0];
  }

  let medians = [];
  for (let i = 0; i < A.length; i += 5) {
    let subLength = Math.min(5, A.length - i);
    let sub = A.slice(i, i + subLength);
    insertionSort(sub);
    medians.push(sub[Math.ceil(sub.length / 2) - 1]);
  }
  let x = select(medians, Math.ceil(medians.length / 2));
  let k = partitionX(A, x) + 1;
  if (k === i) {
    return x;
  }else if(i < k){
    let sub = A.slice(0, k - 1);
    return select(sub, i);
  }else {
    let sub = A.slice(k, A.length);
    i = i - k;
    return select(sub, i);
  }
}

/**
 * 插入排序.
 *
 * @param  {array} A 一个无序的数组.
 * @return {array}   一个有序的数组.
 */
function insertionSort(A)
{
  for (var j = 1; j < A.length; j++) {
    var key = A[j];
    // 插入 A[j] 到 已经排序的序列 A[1...j-1].
    var i = j - 1;
    while (i >= 0 && A[i] > key) {
      A[i + 1] = A[i];
      i = i - 1;
    }

    A[i + 1] = key;
  }
}

/**
 * 子数组原址重排,修改版,允许自定义大小值的分割点.
 *
 * @param  {array}  A 数组.
 * @param  {number} i 大小值的分割点.
 * @return {number}   下标,下标左侧的元素总是小于右侧的元素.
 */
function partitionX(A, x) {
  let i = -1;
  for (let j = 0; j < A.length; j++) {
    if (A[j] <= x) {
      i = i + 1;
      exchage(A, i, j);
    }
  }

  return i;
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
