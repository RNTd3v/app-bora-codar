import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '@cms/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DialogComponent, IDialogService } from '..';

@Injectable()
export class DialogService implements IDialogService {

  private subscription = new Subscription();

  private _isLoadingAction = new BehaviorSubject<boolean>(false);
  isLoadingAction = this._isLoadingAction.asObservable();

  constructor(private dialog: MatDialog) { }

  openDialog(dialogData: DialogData<any>): Promise<boolean> {

    const { width, componentData } = dialogData;

    const dialogRef = this.dialog.open(DialogComponent, {
      width,
      maxWidth: '780px',
      data: { ... dialogData, componentData }
    });

    this.subscription.add(
      dialogRef.afterOpened()
        .pipe(finalize(() => this._isLoadingAction.next(true))) // TODO: Criar um UIStatus service
        .subscribe());

    return new Promise<boolean>((resolve) => {
      this.subscription.add(
        dialogRef.afterClosed()
          .subscribe({ next: confirmed => resolve(confirmed)}));
    });
  }
}
