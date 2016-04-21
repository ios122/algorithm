/**
 * 插入排序.
 *
 * @param  {array} A 一个无序的数组.
 * @return {array}   一个有序的数组.
 */
function insertion_sort(A)
{
  for (var j = 1; j < A.length; j++) {
    key = A[j];
    // 插入 A[j] 到 已经排序的序列 A[1...j-1].
    i = j - 1;
    while (i >= 0 && A[i] > key) {
      A[i + 1] = A[i];
      i = i - 1;
    }

    A[i + 1] = key;
  }
}
