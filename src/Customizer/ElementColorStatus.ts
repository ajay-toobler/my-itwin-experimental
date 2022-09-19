import { ColorDef, FeatureOverrideType } from "@itwin/core-common";
import { EmphasizeElements, IModelApp } from "@itwin/core-frontend";

export class ElementColorStatus {
  // static updateDevicesColorStatus(cloudData: any, smartDeviceDatas: any[]) {
  //   smartDeviceDatas.forEach((value) => {
  //     this.updateDeviceColorStatus(cloudData, value)
  //   });
  // }

  static updateDeviceColorStatus(cloudData:any, smartDeviceData: any){
    const vp = IModelApp.viewManager.selectedView!;
    const emph = EmphasizeElements.getOrCreate(vp);

    emph.overrideElements(
      smartDeviceData.id,
      vp,
      ColorDef.fromString(cloudData["Color Status"]),
      FeatureOverrideType.ColorOnly,
      false
    );
  }
}
