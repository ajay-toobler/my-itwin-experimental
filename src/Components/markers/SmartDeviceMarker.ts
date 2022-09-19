import { XAndY, XYAndZ } from "@itwin/core-geometry";
import { EmphasizeElements, IModelApp, Marker } from "@itwin/core-frontend";
import { ColorDef, FeatureOverrideType } from "@itwin/core-common";
import { ElementColorStatus } from "../../Customizer/ElementColorStatus";

export class SmartDeviceMarker extends Marker {
  private _smartDeviceId: string;
  private _smartDeviceType: string;
  private _EcInstanceId: string;

  constructor(
    location: XYAndZ,
    size: XAndY,
    smartDeviceId: string,
    smartDeviceType: string,
    cloudData: any,
    EcInstanceId: any,
  ) {
    super(location, size);

    this._smartDeviceId = smartDeviceId;
    this._smartDeviceType = smartDeviceType;
    this._EcInstanceId = EcInstanceId;

    this.setImageUrl(`/${this._smartDeviceType}.png`);
    // this.title = this.populateTitle(cloudData);
    // this.updateColor(cloudData);
  }

   updateTitle(cloudData:any){
    this.title = this.populateTitle(cloudData);
  }

   updateColor(cloudData: any){
    ElementColorStatus.updateDeviceColorStatus(
      cloudData,
      {
        id: this._EcInstanceId,
        smartDeviceId : this._smartDeviceId
      }
    );
  }

  private populateTitle(cloudData: any) {
    /*
     "speaker001": { 
      "Notifications": 2, 
      "song Playing": true,
      "Song Name": "All I Want for Christmas Is You",
      "Song Artist": "Mariah Carey"
    },
  */
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
