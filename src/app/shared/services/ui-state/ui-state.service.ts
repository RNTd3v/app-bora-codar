import { Injectable } from '@angular/core';
import { IUIStateService, UIState } from '@cms/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UiStateService implements IUIStateService {

  private UIState = new BehaviorSubject<UIState>(UIState.notInitialized);

  constructor() {}

  setUIState(uiState: UIState): void {
    this.UIState.next(uiState);
  }

  get UIState$(): Observable<UIState> {
    return this.UIState.asObservable();
  }

  get isLoadingAction$(): Observable<boolean> {
    return this.UIState$.pipe(map(uiState => uiState == UIState.loadingAction))
  }

  get isLoadingPage$(): Observable<boolean> {
    return this.UIState$.pipe(map(uiState => uiState === UIState.loadingPage))
  }

}
