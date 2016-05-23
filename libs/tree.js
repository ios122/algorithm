'use strict';
/**
 * 二叉搜索树.
 */

/**
 * 中序遍历二叉树,并返回结点有序关键字信息.
 *
 * @param  {object} x {key:number,p:number, left:number, right:number}.
 * @return {array}  A 有序存放搜索树种的关键字.
 */
function inorderTreeWalk(x) {
  if (null === x) {
    return [];
  }else {
    return inorderTreeWalk(x.left).concat(x.key, inorderTreeWalk(x.right));
  }
}

/**
 * 在指定结点查找具有关键字k的结点的指针.
 *
 * @param  {object} x 结点,{key:number, p:number,left:number, right:number}.
 * @param  {number} k 要查找的结点的关键字.
 * @return {object}   要查找的结点,{key:number,p:number, left:number, right:number}.
 */
function treeSearch(x, k) {
  if (null === x || k === x.key) {
    return x;
  }
  if (k < x.key) {
    return treeSearch(x.left, k);
  }else {
    return treeSearch(x.right, k);
  }
}

/**
 * 使用迭代法,在指定结点查找具有关键字k的结点的指针.
 *
 * @param  {object} x 结点,{key:number,p:number, left:number, right:number}.
 * @param  {number} k 要查找的结点的关键字.
 * @return {object}   要查找的结点,{key:number,p:number, left:number, right:number}.
 */
function iterativeTreeSearch(x, k){
  while (null !== x && k !== x.key) {
    if (k < x.key) {
      x = x.left;
    }else {
      x = x.right;
    }
  }
  return x;
}

/**
 * 关键字最小的结点.
 * @param  {object} x 结点,{key:number, p:number,left:number, right:number}.
 * @return {object}   关键字最小的结点.,{key:number,p:number, left:number, right:number}.
 */
function treeMinimum(x) {
  while (x.left !== null) {
    x = x.left;
  }
  return x;
}

/**
 * 关键字最大的结点.
 * @param  {object} x 结点,{key:number,p:number, left:number, right:number}.
 * @return {object}   关键字最大的结点,{key:number, p:number,left:number, right:number}.
 */
function treeMaximum(x) {
  while (x.right !== null) {
    x = x.right;
  }
  return x;
}

/**
 * 返回结点x的后继.
 *
 * 后继,指以关键字排序,此结点的后一个元素.
 *
 * @param  {object} x 结点,{key:number,p:number, left:number, right:number}.
 * @return {object}   后继,{key:number,p:number, left:number, right:number}.
 */
function treeSuccessor(x) {
  if (x.right !== null) {
    return treeMinimum(x.right);
  }
  let y = x.p;
  while (y !== null && x === y.right) {
    x = y;
    y = y.p;
  }
  return y;
}

/**
 * 返回结点x的前驱.
 *
 * 前驱,指以关键字排序,此结点的后一个元素.
 *
 * @param  {object} x 结点,{key:number,p:number, left:number, right:number}.
 * @return {object}   后继,{key:number,p:number, left:number, right:number}.
 */
function treePredecessor(x){
  if (x.left !== null) {
    return treeMaximum(x.left);
  }
  let y = x.p;
  while (y !== null && x === y.left) {
    x = y;
    y = y.p;
  }
  return y;
}

/**
 * 将一个新值 v 插入到一棵二叉搜索树T中.
 *
 * @param  {object} T 二叉搜索树,{root: object}.
 * @param  {object} z {key:v,p:null, left:null, right:null}.
 */
function treeInsert(T, z){
  let y = null;
  let x = T.root;
  while (x !== null) {
    y = x;
    if (z.key < x.key) {
      x = x.left;
    }else {
      x = x.right;
    }
  }
  z.p = y;
  if (y === null) {
    T.root = z;
  }else if (z.key < y.key) {
    y.left = z;
  }else {
    y.right = z;
  }
}

/**
 * 用一颗以 v 为根的子树来替换一棵以 u 为根的子树.
 * @param  {object} T 二叉搜索树,{root: object}.
 * @param  {object} u 结点,{key:number,p:number, left:number, right:number}.
 * @param  {object} v 结点,{key:number,p:number, left:number, right:number}.
 */
function transplant(T,u,v) {
  if (u.p === null) {
    T.root = v;
  }else if (u === u.p.left) {
    u.p.left = v;
  }else {
    u.p.right = v;
  }
  if (v !== null) {
    v.p = u.p;
  }
}

/**
 * 从子树T删除结点z.
 *
 * @param  {object} T 二叉搜索树,{root: object}.
 * @param  {object} z 待删除结点,{key:number,p:number, left:number, right:number}.
 */
function treeDelete(T, z) {
  if (z.left === null) {
    transplant(T, z, z.right);
  }else if (z.right === null) {
    transplant(T, z, z.left);
  }else {
    let y = treeMinimum(z.right);
    if (y.p !== z) {
      transplant(T, y, y.right);
      y.right = z.right;
      y.right.p = y;
    }
    transplant(T, z, y);
    y.left = z.left;
    y.left.p = y;
  }
}

/**
 * 随机构建二叉搜索树.
 *
 * @param  {array} A 关键字数组.
 * @return {object}   二叉搜索树,{root: object}.
 */
function randomBuild(A)
{
  randomizeInPlace(A);
  let T = {root: null};
  for (let i = 0; i < A.length; i++) {
    treeInsert(T, {key:A[i],p:null, left:null, right:null});
  }
  return T;
}

/**
 * 随机排列数组: 原地址排列给定数组,以得到一个均匀随机的排列.
 *
 * 将给定数组随机化处理后,可用于研究算法的平均情况行为.
 * 在实际问题中,可用于一个小于最高成本的代价得到既定目的,详见P65 雇佣问题.
 *
 * @param  {array} A    给定的数组.
 */
function randomizeInPlace(A)
{
  var n = A.length;
  for (var i = 0; i < n; i++) {
    var randomIdx = Math.floor(Math.random() * (n - i) + i);
    var tmp = A[i];
    A[i] = A[randomIdx];
    A[randomIdx] = tmp;
  }
}
