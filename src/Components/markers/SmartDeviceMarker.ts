import { XAndY, XYAndZ } from "@itwin/core-geometry";
import {
  BeButtonEvent,
  EmphasizeElements,
  IModelApp,
  Marker,
} from "@itwin/core-frontend";
import { ColorDef, FeatureOverrideType } from "@itwin/core-common";
import { ElementColorStatus } from "../../Customizer/ElementColorStatus";

export class SmartDeviceMarker extends Marker {
  private _smartDeviceId: string;
  private _smartDeviceType: string;
  private _EcInstanceId: string;
  private _mouseMoveLatestEvent?: BeButtonEvent;

  constructor(
    location: XYAndZ,
    size: XAndY,
    smartDeviceId: string,
    smartDeviceType: string,
    cloudData: any,
    EcInstanceId: any
  ) {
    super(location, size);

    this._smartDeviceId = smartDeviceId;
    this._smartDeviceType = smartDeviceType;
    this._EcInstanceId = EcInstanceId;
    this._mouseMoveLatestEvent = undefined;

    this.setImageUrl(`/${this._smartDeviceType}.png`);
  }

  onMouseMove(ev: BeButtonEvent): void {
    this._mouseMoveLatestEvent = ev;
    super.onMouseMove(ev);
  }

  onMouseLeave(): void {
    this._mouseMoveLatestEvent = undefined;
    super.onMouseLeave();
  }

  updateTitle(cloudData: any) {
    this.title = this.populateTitle(cloudData);
    if (this._mouseMoveLatestEvent && this._isHilited) {
      super.onMouseMove(this._mouseMoveLatestEvent);
    }
  }

  updateColor(cloudData: any) {
    ElementColorStatus.updateDeviceColorStatus(cloudData, {
      id: this._EcInstanceId,
      smartDeviceId: this._smartDeviceId,
    });
    if (this._mouseMoveLatestEvent && this._isHilited) {
      super.onMouseMove(this._mouseMoveLatestEvent);
    }
  }

  private populateTitle(cloudData: any) {
    let smartTable = "";
    for (const [key, value] of Object.entries(cloudData)) {
      smartTable += `
        <tr>
          <th>${key}</th>
          <th>${value}</th>
        </tr>
      `;
    }

    const smartTableDiv = document.createElement("div");
    smartTableDiv.className = "smart-table";
    smartTableDiv.innerHTML = `
     <h3>${this._smartDeviceId}</h3>
     <table>
      ${smartTable}
     </table>
    `;

    return smartTableDiv;
  }
}
