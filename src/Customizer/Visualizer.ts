import { QueryRowFormat } from "@itwin/core-common";
import { IModelConnection, ScreenViewport } from "@itwin/core-frontend";

export class Visualization {

  public static hideHouseExterior = async (vp: ScreenViewport) => {

    const categoryIds = await Visualization.getCategoryIds(vp.iModel);
    vp.changeCategoryDisplay(categoryIds, false);
  }

  // HIDING CATEGROIES.
  private static getCategoryIds = async (iModel: IModelConnection) => {

    const categoriesToHide = [
      "'OST_Roofs'",
      "'OST_Walls'",
      "'OST_Windows'"
    ]

    const query = `SELECT ECInstanceId FROM Bis.Category
        WHERE CodeValue IN (${categoriesToHide.toString()})`;

    const result = iModel.query(query, undefined, { rowFormat: QueryRowFormat.UseJsPropertyNames });
    const categoryIds = [];

    for await (const row of result) {
      console.log("====row====",row)
      categoryIds.push(row.id);
    }

    console.log("======categoryIds====",categoryIds)

    return categoryIds;
  }
}