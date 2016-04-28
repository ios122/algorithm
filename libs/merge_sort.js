/* 归并排序。
@A  要排序的数组。
@p  排序起点。
@r  排序终点。

注意：
  若 p >= r,则该子数组中，最多只有一个元素，所以已经排好序。
  为了排序整个序列，需要初始调用 merge_sort(A, 0, A.length - 1)。
 */
function merge_sort(A, p, r)
{
  if (p < r)
  {
    var q = parseInt((p + r) / 2);
    merge_sort(A, p, q);
    merge_sort(A, q + 1, r);
    merge(A, p, q, r);
  }
}

/**
 * 归并排序中的“合并”
 *
 * 将 p->q  与 q->r 合并为 q->r;
 * p<=q<r;
 * A[p,q] 和A[q+1, r]都已排好序。
 *
 * @param  {array} A  要排序的数组。
 * @param  {number} p 起点。
 * @param  {number} q 中点。
 * @param  {number} r 终点。
 */
function merge(A, p, q, r)
{
  var n1 = q - p + 1;
  var n2 = r - q;
  var L = [], R = [];
  for (var i = 0; i < n1; i++)
  {
    L[i] = A[p + i];
  }
  for (var j = 0; j < n2; j++)
  {
    R[j] = A[q + j + 1];
  }
  L[n1] = Number.POSITIVE_INFINITY;
  R[n2] = Number.POSITIVE_INFINITY;
  i = 0;
  j = 0;
  for (var k = p; k <= r; k++)
  {
    if (L[i] <= R[j])
    {
      A[k] = L[i];
      i ++;
    }
    else
    {
      A[k] = R[j];
      j ++;
    }
  }
}
