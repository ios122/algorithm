'use strict';
/* 优先队列的一些基本操作.
  此处是一个简化的模型,直接使用关键字本身作为元素;
  在真实的应用中,每个元素中还需要存储对应对象的句柄.
  */

/**
 * 返回队列中具有最大键字的元素.
 *
 * @param  {array} A 队列.由数组存储,对应一个最大堆结构.
 * @return {number}   具有最大键字的元素.
 */
function heapMaximum(A) {
  return A[0];
}

/**
 * 去掉并返回队列中具有最大关键字的元素.
 *
 * @param  {array} A 最大优先队列.
 * @return {number} 队列中具有最大关键字的元素.
 */
function heapExtractMax(A) {
  if (A.heapSize < 1) {
    throw('heap underflow');
  }
  var max = A[0];
  A[0] = A[A.heapSize - 1];
  A.heapSize = A.heapSize - 1;
  maxHeapify(A, 1);
  return max;
}

/**
 * 将元素A[i]的关键字更新为新值.
 *
 * @param  {array} A   最大优先队列.
 * @param  {number} i   元素下标.
 * @param  {number} key 关键字新值.
 */
function heapIncreaseKey(A, i, key) {
  if (key < A[i]) {
    throw('new key is smaller than current key');
  }
  A[i] = key;
  while (i > 0 && A[parent(i)] < A[i]) {
    exchage(A, i, parent(i));
    i = parent(i);
  }
}

/**
 * 插入操作.
 *
 * @param  {array} A   最大优先队列.
 * @param  {number} key 要插入到A中的新元素的关键字.
 */
function maxHeapInsert(A, key) {
  A.heapSize = A.heapSize + 1;
  A[A.heapSize - 1] = Number.NEGATIVE_INFINITY;
  heapIncreaseKey(A,A.heapSize - 1, key);
}

// -------- 以下为最大堆的一些基本方法.如有变更,以heapsort.js中的方法为准. -------------
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
