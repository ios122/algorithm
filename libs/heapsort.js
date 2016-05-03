'use strict';

/**
 * 堆排序.
 *
 * @param  {array} A 数组.
 */
function heapsort(A){
  buildMaxHeap(A);
  for (var i = A.length - 1; i > 0; i--) {
    exchage(A,0,i);
    A.heapSize = A.heapSize - 1;
    maxHeapify(A, 0);
  }
}

/**
 * 建堆.自底向上,将数组转换为最大堆.
 *
 * @param  {array} A 数组.
 */
function buildMaxHeap(A) {
  A.heapSize = A.length;
  for (var i = Math.floor(A.length / 2) - 1; i >= 0; i--) {
    maxHeapify(A, i);
  }
}

/**
 * 通过让A[i]的值在最大堆中"逐级下降",从而使得以下标i为根节点的子树重新遵循最大堆的性质.
 *
 * 最大堆的性质指除了根以外的所有结点i都要满足: A[parent[i]] >= A[i]
 *
 * @param  {array} A  数组.
 * @param  {number} i 特定下标.
 */
function maxHeapify(A, i) {
  var l = left(i);
  var r = right(i);
  var largest;
  if (l <= A.heapSize - 1 && A[l] > A[i]) {
    largest = l;
  }else {
    largest = i;
  }
  if (r <= A.heapSize - 1 && A[r] > A[largest] ) {
    largest = r;
  }
  if (largest !== i) {
    exchage(A, i, largest);
    maxHeapify(A, largest);
  }
}

/**
 * 在数组对应的堆结构中,计算某下标的父节点的下标.
 * @param  {number} i 下标.
 * @return {number} 父节点的下标.
 */
function parent(i) {
  return Math.ceil(i / 2) - 1;
}

/**
 * 在数组对应的堆结构中,计算某下标的左孩子的下标.
 * @param  {number} i 下标.
 * @return {number} 左孩子的下标.
 */
function left(i) {
  return 2 * i + 1;
}

/**
 * 在数组对应的堆结构中,计算某下标的右孩子的下标.
 * @param  {number} i 下标.
 * @return {number} 右孩子的下标.
 */
function  right(i) {
  return 2 * (i + 1);
}

/**
 * 交换数组中指定位置上的元素.
 * @param  {array} A 数组.
 * @param  {number} i 数组下标.
 * @param  {number} j 数组下标.
 */
function exchage(A, i, j) {
  var tmp = A[i];
  A[i] = A[j];
  A[j] = tmp;
}
