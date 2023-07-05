/** 
 * 评论类型
  */
export enum ViewTypeEnum {
  /** 
   * 文章 
   */
  ARTICLE = 1,
  /** 
   * 视频
   */
  VIDEO = 2,
  /**
   * 帖子
   */
  POST = 3,
  /**
   * 评论
   */
  VIEW = 4
}

export const ViewTypeMap = new Map([
  [ViewTypeEnum.ARTICLE, 'article'],
  [ViewTypeEnum.VIDEO, 'video'],
  [ViewTypeEnum.POST, 'post'],
  [ViewTypeEnum.VIEW, 'view'],
])

