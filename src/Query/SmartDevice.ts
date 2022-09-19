import { QueryRowFormat } from "@itwin/core-common";
import { ScreenViewport } from "@itwin/core-frontend";

export class SmartDeviceQuery {
    static async getSmartDeviceData(vp: ScreenViewport) {

        const _iModel = vp.iModel;

        const washingMachineQuery = `
        SELECT Origin, EcClassId, EcInstanceId  FROM REVITDynamic.Toshiba_washingmachine_aw_dc_12kg
        `;
        const smartTVQuery = `
        SELECT Origin, EcClassId, EcInstanceId  FROM REVITDynamic.display_lcd_panasonic_hospitality
        `;
    
        const washingMachineResults = _iModel.query(washingMachineQuery, undefined, { rowFormat: QueryRowFormat.UseJsPropertyNames });
        const smartTvResults = _iModel.query(smartTVQuery, undefined, { rowFormat: QueryRowFormat.UseJsPropertyNames });
        const values = [];
    
        for await (const row of washingMachineResults){
            row.smartDeviceType = "Washer";
            row.smartDeviceId = "washer001";
            values.push(row);
        }
        for await (const row of smartTvResults){
            row.smartDeviceType = "TV";
            row.smartDeviceId = "tv001";
            values.push(row);
        }
    
        return values;
      }
}