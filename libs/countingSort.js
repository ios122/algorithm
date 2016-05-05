'use strict';
/*
计数排序,假设n个输入元素的每一个都是在 0 到 k 区间内的一个整数,其中 k 为某个证书.当 k = O(n)时,
排序的运行时间为 Θ(n).
计数排序的基本思想是: 对每一个输入元素 x, 确定小于 x 的元素个数.利用这一信息,就可以直接把 x 放到
它在输入数组中的位置上了.
 */
/**
 * 计数排序.
 *
 * @param  {array} A 待排序元素.
 * @param  {array} B 存放排序的输出.
 * @param  {array} k 输入区间在[0,k]范围内,包含k.
 */
function countingSort(A, B, k) {
  var C = [];
  for (var i = 0; i <=k ; i++) {
    C[i] = 0;
  }
  for (var j = 0; j < A.length; j++) {
    C[A[j]] = C[A[j]] + 1;
  }
  for (i = 1; i <= k ; i++) {
    C[i] = C[i] + C[i - 1];
  }
  for (j = A.length - 1; j >= 0; j--) {
    B[C[A[j]] - 1] = A[j];
    C[A[j]] = C[A[j]] - 1;
  }
}
