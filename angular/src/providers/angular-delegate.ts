import { ApplicationRef, ComponentFactoryResolver, Injectable, InjectionToken, Injector, NgZone, ViewContainerRef } from '@angular/core';
import { FrameworkDelegate, ViewLifecycle } from '@ionic/core';
import { NavParams } from '../directives/navigation/nav-params';


@Injectable()
export class AngularDelegate {

  constructor(
    private zone: NgZone,
    private appRef: ApplicationRef
  ) {}

  create(
    resolver: ComponentFactoryResolver,
    injector: Injector,
    location?: ViewContainerRef,
  ) {
    return new AngularFrameworkDelegate(resolver, injector, location, this.appRef, this.zone);
  }
}


export class AngularFrameworkDelegate implements FrameworkDelegate {

  private elRefMap = new WeakMap<HTMLElement, any>();

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private location: ViewContainerRef,
    private appRef: ApplicationRef,
    private zone: NgZone,
  ) {}

  attachViewToDom(container: any, component: any, params?: any, cssClasses?: string[]): Promise<any> {
    return new Promise(resolve => {
      this.zone.run(() => {
        const el = attachView(
          this.resolver, this.injector, this.location, this.appRef, this.elRefMap,
          container, component, params, cssClasses
        );
        resolve(el);
      });
    });
  }

  removeViewFromDom(_container: any, component: any): Promise<void> {
    return new Promise(resolve => {
      this.zone.run(() => {
        const componentRef = this.elRefMap.get(component);
        if (componentRef) {
          componentRef.destroy();
          this.elRefMap.delete(component);
        }
        resolve();
      });
    });
  }
}

export function attachView(
  resolver: ComponentFactoryResolver,
  injector: Injector,
  location: ViewContainerRef|undefined,
  appRef: ApplicationRef,
  elRefMap: WeakMap<HTMLElement, any>,
  container: any, component: any, params: any, cssClasses: string[]
) {
  const factory = resolver.resolveComponentFactory(component);
  const childInjector = Injector.create(getProviders(params), injector);
  const componentRef = (location)
    ? location.createComponent(factory, location.length, childInjector)
    : factory.create(childInjector);

  const instance = componentRef.instance;
  const hostElement = componentRef.location.nativeElement;
  if (params) {
    Object.assign(instance, params);
  }
  for (const clazz of cssClasses) {
    hostElement.classList.add(clazz);
  }
  bindLifecycleEvents(instance, hostElement);
  container.appendChild(hostElement);

  if (!location) {
    appRef.attachView(componentRef.hostView);
  }

  componentRef.changeDetectorRef.reattach();
  elRefMap.set(hostElement, componentRef);
  return hostElement;
}

const LIFECYCLES = [
  ViewLifecycle.WillEnter,
  ViewLifecycle.DidEnter,
  ViewLifecycle.WillLeave,
  ViewLifecycle.DidLeave,
  ViewLifecycle.WillUnload
];

export function bindLifecycleEvents(instance: any, element: HTMLElement) {
  LIFECYCLES.forEach(eventName => {
    element.addEventListener(eventName, (ev: CustomEvent) => {
      if (typeof instance[eventName] === 'function') {
        instance[eventName](ev.detail);
      }
    });
  });
}

const NavParamsToken = new InjectionToken<any>('NavParamsToken');


function getProviders(params: {[key: string]: any}) {
  return [
    {
      provide: NavParamsToken, useValue: params
    },
    {
      provide: NavParams, useFactory: provideNavParamsInjectable, deps: [NavParamsToken]
    }
  ];
}

function provideNavParamsInjectable(params: {[key: string]: any}) {
  return new NavParams(params);
}
