'use strict';

/**
 * 随机排列数组: 原地址排列给定数组,以得到一个均匀随机的排列.
 *
 * 将给定数组随机化处理后,可用于研究算法的平均情况行为.
 * 在实际问题中,可用于一个小于最高成本的代价得到既定目的,详见P65 雇佣问题.
 *
 * @param  {array} A    给定的数组.
 */
function randomize_in_place(A)
{
  var n = A.length;
  for (var i = 0; i < n; i++) {
    var randomIdx = Math.floor(Math.random() * (n - i) + i);
    var tmp = A[i];
    A[i] = A[randomIdx];
    A[randomIdx] = tmp;
  }
}
