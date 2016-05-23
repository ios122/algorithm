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
 * @param  {object} T T 二叉搜索树,{root: object}.
 * @param  {object} x {key:object,p:object, left:object, right:object}.
 */
function leftRotate(T, x){

}

/**
 * 右旋.
 *
 * 当在某个点 x 上做右旋时,假设它的父结点为y,且y不为T.nil;x可以为其左孩子不是T.nil结点的
 * 树内任意结点的左孩子;右旋以x到y的链为"支轴"进行,它使x成为该子树新的根结点,y成为x的右孩子,x的右孩子
 * 成为y的左孩子.
 *
 * @param  {object} T 二叉搜索树,{root: object}.
 * @param  {object} x {key:object,p:object, left:object, right:object}.
 */
function rightRotate(T, x){

}

/**
 * 插入
 *
 * @param  {object} T 红黑树,{root: object}.
 * @param  {object} z {key:v, p:null, left:null, right:null, color:null}
 */
function rbInsert(T,z){

}

/**
 * 在插入结点z后,保持红黑树性质.
 *
 * @param  {object} T 红黑树,{root: object}.
 * @param  {object} z {key:object, p:object, left:object, right:object, color:null}
 */
function rbInsertFixup(T, z) {

}

/**
 * 用一颗以 v 为根的子树来替换一棵以 u 为根的子树.(红黑树版本)
 *
 * @param  {object} T 二叉搜索树,{root: object}.
 * @param  {object} u 结点,{key:object,p:object, left:object, right:object, color: object,}.
 * @param  {object} v 结点,{key:object,p:object, left:object, right:object, color: object,}.
 */
function reTransplant(T, u, v) {

}

/**
 * 从子树T删除结点z.(红黑树版本)
 *
 * @param  {object} T 二叉搜索树,{root: object}.
 * @param  {object} z 待删除结点,{key:object,p:object, left:object, right:object, color:color}.
 */
function reDelete(T, z) {

}

/**
 * 删除结点的辅助过程,通过改变颜色和执行旋转来恢复红黑性质.
 *
 * @param  {object} T 二叉搜索树,{root: object}.
 * @param  {object} z 待删除结点,{key:object,p:object, left:object, right:object, color:color}.
 */
function reDeleteFixup(T, x) {

}
