export class PromiseTools {
  static sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * promise 队列任务
   *
   * for循环执行效率太低，每个都需要等待上一个执行完才可以继续下一个循环
   *
   * promise.all 并行执行太多，可能导致io阻塞，例如数据库链接太多，导致数据库链接异常
   *
   * 使用分割的方式，一次执行定量的promise，保证效率与安全
   */
  static async queue<T, K>(dataList: T[], callBack: (item: T, index: number) => Promise<K> | K, spliceLength = 5): Promise<K[]> {
    if (!dataList?.length) {
      return [];
    }
    const list: K[] = [];
    for (let i = 0; i < dataList.length; i += spliceLength) {
      const step = i + spliceLength < dataList.length ? spliceLength : dataList.length - i;
      const promiseList = new Array(step).fill(0).map((_, index) => callBack(dataList[i + index], i + index));
      const result = await Promise.all(promiseList);
      list.push(...result);
    }
    return list;
  }
}
