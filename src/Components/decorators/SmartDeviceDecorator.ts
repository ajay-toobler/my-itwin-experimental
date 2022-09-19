import {
  DecorateContext,
  Decorator,
  IModelApp,
  Marker,
} from "@itwin/core-frontend";
import { SmartDeviceMarker } from "../markers/SmartDeviceMarker";

export class SmartDeviceDecorator implements Decorator {
  private _markerSet: any[];

  constructor(smartDeviceData: any, cloudData: any) {
    this._markerSet = [];

    this.addMarkers(smartDeviceData, cloudData);
  }

  private async addMarkers(smartDeviceData: any[], cloudData: any) {
    smartDeviceData.forEach((value) => {
      const smartDeviceMarker = new SmartDeviceMarker(
        { x: value.origin.x, y: value.origin.y, z: value.origin.z },
        { x: 40, y: 40 },
        value.smartDeviceId,
        value.smartDeviceType,
        cloudData[value.smartDeviceId],
        value.id
      );

      smartDeviceMarker.updateTitle(cloudData[value.smartDeviceId]);
      smartDeviceMarker.updateColor(cloudData[value.smartDeviceId]);

      this._markerSet.push(smartDeviceMarker);
    });
  }

  public decorate(context: DecorateContext): void {
    this._markerSet.forEach((marker) => {
      marker.addDecoration(context);
    });
  }

  public updateDecorate(cloudData: any) {
    // console.log("============vp============", vp);
    this._markerSet.forEach((marker) => {
      marker.updateTitle(cloudData[marker._smartDeviceId]);
      marker.updateColor(cloudData[marker._smartDeviceId]);
    });

    // const vp = IModelApp.viewManager.selectedView;
    // if (vp) {
    //   vp.invalidateDecorations();
    // }
  }
}
