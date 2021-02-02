import { DialogData } from "@cms/core";

export abstract class IDialogService {
  abstract openDialog(dialogData: DialogData<any>): Promise<boolean>;
}
