/**
 * 按给定的时间延迟执行一次事件
 * @param fn 抖动函数
 * @param delay 延迟多少毫秒执行
 * @returns {Function}
 */
const throttle = function (fn: (...args: any[]) => any, delay?: number) {
  let timer: number | null;
  return (...args: any[]) => {
    if (timer) return false;
    timer = setTimeout(function () {
      // @ts-ignore
      fn && fn.apply(this, args);
    }, delay);
  };
};

export default throttle;
