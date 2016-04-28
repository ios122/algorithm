'use strict';

/**
 * 求解最大子数组问题的分治算法.返回个下标元组的最大子数组的边界,并返回最大子数组中值的和.
 *
 * @param  {array} A    下标元组.
 * @param  {number} low  左边界.
 * @param  {number} high 右边界.
 * @return {object}     有三个属性: low,high, sum.
 */
function find_maximum_subarray(A, low, high)
{
  if (low === high) {
    return {low: low, high: high, sum: A[low]}; // 基础情况: 只有一个元素.
  }else {
    var mid = Math.floor((low + high) / 2);

    var left = find_maximum_subarray(A, low, mid);
    var right = find_maximum_subarray(A, mid + 1, high);
    var cross = find_max_crossing_subarray(A, low, mid, high);

    if (left.sum >= right.sum && left.sum >= cross.sum) {
      return left;
    }else if (right.sum >= left.sum && right.sum >= cross.sum) {
      return right;
    }else {
      return cross;
    }
  }
}

/**
 * 返回一个下标元组划定跨越中点的最大子数组的边界,并返回最大子数组中值的和.
 * @param  {array} A     下标元组.
 * @param  {number} low  较小边界.
 * @param  {number} mid  "中"点.
 * @param  {number} high 较大边界.
 * @return {object} 有三个属性: low,high, sum.
 */
function find_max_crossing_subarray(A, low, mid, high)
{
  var left_sum = Number.NEGATIVE_INFINITY;
  var sum = 0;
  var max_left = low;

  for (var i = mid; i >= low; i--) {
    sum += A[i];
    if (sum > left_sum) {
      left_sum = sum;
       max_left = i;
    }
  }

  var right_sum = Number.NEGATIVE_INFINITY;
  var max_right = high;
  sum = 0;

  for (var j = mid + 1; j <= high; j++) {
    sum += A[j];

    if (sum > right_sum) {
      right_sum = sum;
      max_right = j;
    }
  }

  return {low: max_left, high: max_right, sum: left_sum + right_sum};
}
