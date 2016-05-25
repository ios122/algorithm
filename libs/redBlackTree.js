'use strict';
/**
 * 二叉搜索树--红黑树.
 */

/**
 * 左旋.
 *
 * 当在某个点 x 上做左旋时,假设它的右孩子为y,且y不为T.nil;x可以为其右孩子不是T.nil结点的
 * 树内任意结点;左旋以x到y的链为"支轴"进行,它使y成为该子树新的根结点,x成为y的左孩子,y的左孩子
 * 成为x的右孩子.
 *
 * @param  {object} T T 二叉搜索树,{root: object,nil:null}.
 * @param  {object} x {key:object,p:object, left:object, right:object}.
 */
function leftRotate(T, x){
  let y = x.right;
  x.right = y.left;
  if (T.nil !== y.left) {
    y.left.p = x;
  }
  y.p = x.p;
  if (x.p === T.nil) {
    T.root = y;
  }else if (x === x.p.left) {
    x.p.left = y;
  }else {
    x.p.right = y;
  }
  y.left = x;
  x.p = y;
}

/**
 * 右旋.
 *
 * 当在某个点 x 上做右旋时,假设它的父结点为y,且y不为T.nil;x可以为其左孩子不是T.nil结点的
 * 树内任意结点的左孩子;右旋以x到y的链为"支轴"进行,它使x成为该子树新的根结点,y成为x的右孩子,x的右孩子
 * 成为y的左孩子.
 *
 * @param  {object} T 二叉搜索树,{root: object,nil:null}.
 * @param  {object} x {key:object,p:object, left:object, right:object}.
 */
function rightRotate(T, x){
  let y = x.p;
  x.left = y.right;
  if (T.nil !== y.right) {
    y.right.p = x;
  }
  y.p = x.p;
  if (x.p === T.nil) {
    T.root = y;
  }else if (x === x.p.right) {
    x.p.right = y;
  }else {
    x.p.left = y;
  }
  y.p = x;
  x.right = y;
}

/**
 * 插入
 *
 * @param  {object} T 红黑树,{root: object,nil:null, red: `RED`, black: `BLACK`}.
 * @param  {object} z {key:v, p:null, left:null, right:null, color:null}
 */
function rbInsert(T,z){
  let y = T.nil;
  let x = T.root;
  while (x !== T.nil) {
    y = x;
    if (z.key < x.key) {
      x = x.left;
    }else {
      x = x.right;
    }
  }
  z.p = y;
  if (y === T.nil) {
    T.root = z;
  }else if (z.key < y.key) {
    y.left = z;
  }else {
    y.right = z;
  }
  z.left = T.nil;
  z.right = T.nil;
  z.color = T.red;
  rbInsertFixup(T, z);
}

/**
 * 在插入结点z后,保持红黑树性质.
 *
 * @param  {object} T 红黑树,{root: object,nil:null, red: `RED`, black: `BLACK`}
 * @param  {object} z {key:object, p:object, left:object, right:object, color:object}
 */
function rbInsertFixup(T, z) {
  while (z.p.color === T.red) {
    if (z.p === z.p.p.left) {
      let y = z.p.p.left;
      if (y.color === T.red) {
        z.p.color = T.black;
        y.color = T.black;
        z.p.p.color = T.red;
        z = z.p.p;
      }else {
        if (z === z.p.right) {
          z = z.p;
          leftRotate(T, z.p.p);
        }
        z.p.color = T.black;
        z.p.p.color = T.red;
        rightRotate(T,z.p.p);
      }
    }else {
      let y = z.p.p.right;
      if (y.color === T.red) {
        z.p.color = T.black;
        y.color = T.black;
        z.p.p.color = T.red;
        z = z.p.p;
      }else{
        if (z === z.p.left) {
          z = z.p;
          rightRotate(T, z.p.p);
        }
        z.p.color = T.black;
        z.p.p.color = T.red;
        leftRotate(T,z.p.p);
      }
    }
    T.root.color = T.black;
  }
}

/**
 * 用一颗以 v 为根的子树来替换一棵以 u 为根的子树.(红黑树版本)
 *
 * @param  {object} T 红黑树,{root: object,nil:null, red: `RED`, black: `BLACK`}.
 * @param  {object} u 结点,{key:object,p:object, left:object, right:object, color: object,}.
 * @param  {object} v 结点,{key:object,p:object, left:object, right:object, color: object,}.
 */
function rbTransplant(T, u, v) {
  if (u.p === T.nil) {
    T.root = v;
  }else if (u === u.p.left) {
    u.p.left = v;
  }else {
    u.p.right = v;
  }
  v.p = u.p;
}

/**
 * 从子树T删除结点z.(红黑树版本)
 *
 * @param  {object} T 红黑树,{root: object,nil:null, red: `RED`, black: `BLACK`}.
 * @param  {object} z 待删除结点,{key:object,p:object, left:object, right:object, color:color}.
 */
function rbDelete(T, z) {
  let  y = z;
  let yOriginalColor = y.color;
  let x = T.nil;
  if (z.left === T.nil) {
    x = z.right;
    rbTransplant(T, z.z.right);
  }else if (z.right === T.nil) {
    let x = z.left;
    rbTransplant(T, z, z.left);
  }else {
    y = treeMinimum(z.right);
    yOriginalColor = y.color;
    x = y.right;
    if (y.p === z) {
      x.p = y;
    }else {
      rbTransplant(T, y, y.right);
      y.right = z.right;
      y.right.p = y;
    }
    rbTransplant(T, z.y);
    y.left = z.left;
    y.left.p = y;
    y.color = z.color;
  }
  if (yOriginalColor === T.black) {
    rbDeleteFixup(T, x);
  }
}

/**
 * 删除结点的辅助过程,通过改变颜色和执行旋转来恢复红黑性质.
 *
 * @param  {object} T 红黑树,{root: object,nil:null, red: `RED`, black: `BLACK`}.
 * @param  {object} z 待删除结点,{key:object,p:object, left:object, right:object, color:color}.
 */
function rbDeleteFixup(T, x) {
  while (x !== T.root && x.color === T.black) {
    if (x === x.p.left) {
      let w = x.p.right;
      if (w.color === T.red) {
        w.color = T.black;
        x.p.color = T.red;
        leftRotate(T, x.p);
        w = x.p.right;
      }
      if (w.left.color === T.black && w.right.color === T.black) {
        w.color = T.red;
        x = x.p;
      }else{
       if (w.right.color === T.black) {
         w.left.color = T.black;
         w.color = T.red;
         rightRotate(T, w);
         w = x.p.right;
       }
       w.color = x.p.color;
       x.p.color = T.black;
       w.right.color = T.black;
       leftRotate(T, x.p);
       x = T.root;
      }
    }else {
      let w = x.p.left;
      if (w.color === T.red) {
        w.color = T.black;
        x.p.color = T.red;
        rightRotate(T, x.p);
        w = x.p.left;
      }
      if (w.right.color === T.black && w.left.color === T.black) {
        w.color = T.red;
        x = x.p;
      }else{
       if (w.left.color === T.black) {
         w.right.color = T.black;
         w.color = T.red;
         leftRotate(T, w);
         w = x.p.left;
       }
       w.color = x.p.color;
       x.p.color = T.black;
       w.left.color = T.black;
       rightRotate(T, x.p);
       x = T.root;
      }
    }
    x.color = T.black;
  }
}

// -------------------------------------
/* 顺序统计树: 只是简单地在每个结点上存储附加信息的一颗红黑树.x.size,表示以x为根的子树(包括x
本身)的(内)结点数,即这颗子树的大小.x.size = x.left.size + x.right.size + 1;
(定义T.nil.size = 0;)
 */

/**
 * 返回顺序统计树中以x为根的子树中包含第i小关键字的结点的指针.
 *
 * @param  {object} x {key:object,p:object, left:object, right:object, color:color, size: number}.
 * @param  {number} i 第i小.
 * @return {object}   以x为根的子树中包含第i小关键字的结点的指针.
 */
function osSelect(x, i){
  let r = x.left.size + 1;
  if (i === r) {
    return x;
  }else if (i < r) {
    return osSelect(x.left, i);
  }else {
    return osSelect(x.right, i - r);
  }
}

/**
 * 返回对T中序遍历对应的线性顺序中x的位置.
 *
 * @param  {object} T 红黑树,{root: object,nil:null, red: `RED`, black: `BLACK`}.
 * @param  {object} x {key:object,p:object, left:object, right:object, color:color, size: number}.
 * @return {number}   对T中序遍历对应的线性顺序中x的位置.
 */
function osRank(T, x) {
  let r = x.left.size + 1;
  let y = x;
  while (y !== T.root) {
    if (y === y.p.right) {
      r = r + y.p.left.size + 1;
    }
    y = y.p;
  }
  return r;
}

// ---------- 摘自 tree.js 的方法.
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
