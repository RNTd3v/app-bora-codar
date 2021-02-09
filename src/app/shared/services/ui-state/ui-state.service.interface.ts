import { UIState } from '@cms/core';
import { Observable } from 'rxjs';

export abstract class IUIStateService {

  abstract setUIState(uiState: UIState): void;

  abstract get UIState$(): Observable<UIState>;

  abstract get isLoadingAction$(): Observable<boolean>;

  abstract get isLoadingPage$(): Observable<boolean>;

}
