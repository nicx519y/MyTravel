import { RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class SimpleReuseStrategy implements RouteReuseStrategy {

	private static waitDelete:string;
  public static storedRoutes: Map<string, DetachedRouteHandle> = new Map<string, DetachedRouteHandle>();
 
  constructor(){};
   
 //离开路由时触发，是否缓存即将被丢弃的组件
 shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return true;
  }
 
 //离开路由时触发，缓存即将被丢弃的组件
 store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
   if(SimpleReuseStrategy.waitDelete && SimpleReuseStrategy.waitDelete==this.getRouteUrl(route)){
            //如果待删除是当前路由则不存储快照
            SimpleReuseStrategy.waitDelete=null
            return;
   }
   SimpleReuseStrategy.storedRoutes.set(this.getRouteUrl(route), handle);
  }
 
 //进入路由时触发，是否允许还原路由
 shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!SimpleReuseStrategy.storedRoutes.get(this.getRouteUrl(route))
  }
 
 //进入路由时触发，还原路由
 retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig) {
            return null
    }
        return SimpleReuseStrategy.storedRoutes.get(this.getRouteUrl(route))
  }
 
 //进入路由时触发，是否同一路由时复用路由
 shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    let result: boolean = future.routeConfig === curr.routeConfig;
    return result;
  }
 
 //拿到当前路由路径 =》关键
 private getRouteUrl(route: ActivatedRouteSnapshot){
        return route['_routerState'].url;
    }
 
 //删除快照
 public static deleteRouteSnapshot(name:string):void{
        if(this.storedRoutes.get(name)){
           this.storedRoutes.delete(name);
        }else{
            this.waitDelete=name;
        }
 }
}