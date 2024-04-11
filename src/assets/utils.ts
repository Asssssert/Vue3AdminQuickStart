import { useRouter } from 'vue-router'

// 创建一个导出的函数
export function goTo(routeName: string, routeParams?: Record<string, any>) {
    const router = useRouter(); // 在setup函数中调用时获取路由实例
    
    if (!router) {
      throw new Error('没有找到路由');
    }
  
    // 根据名称和可选参数进行跳转
    router.push({ name: routeName, params: routeParams });
  }
  
  // 或者如果想直接使用path而非name
  export function goToPath(path: string, query?: Record<string, any>) {
    const router = useRouter();
  
    if (!router) {
      throw new Error('没有找到路由');
    }
  
    // 根据路径和可选查询参数进行跳转
    router.push({ path, query });
  }