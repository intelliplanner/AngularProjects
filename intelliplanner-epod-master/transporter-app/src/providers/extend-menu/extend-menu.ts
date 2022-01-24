import { Injectable } from '@angular/core';
import { Platform, Menu, MenuType, MenuController, Animation } from 'ionic-angular';

@Injectable()
export class ExtendMenuProvider {
  constructor() {}
}

// Default 3D menu type
class Menu3DType extends MenuType {
  constructor(menu: Menu, plt: Platform) {
    super(plt);

    const scale = 0.8;
    const correction = (plt.width() - (scale * plt.width())) / 2;
    const contentOpenedX = ((plt.width() - correction - 42) * (menu.isRightSide ? -1 : 1)) + 'px';
    const contentAni = new Animation(plt, menu.getContentElement());

    contentAni.fromTo('translateX', '0px', contentOpenedX);
    contentAni.fromTo('scale', '1', scale);
    this.ani.add(contentAni);
  }
}
MenuController.registerType('3d', Menu3DType);
