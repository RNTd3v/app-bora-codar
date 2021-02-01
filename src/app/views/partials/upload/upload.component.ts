import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@cms/environment';
import { finalize } from 'rxjs/operators';
import { IUploadService } from './service/upload.service.interface';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  @Input() isAvatar = false;
  @Input() data: any;
  @Input() accept = 'image/*';

  @Output() uploadedTheFile = new EventEmitter();

  file: File = null;
  isLoadingAction = false;

  backgroundPreview: string | ArrayBuffer = null;

  constructor(private service: IUploadService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.backgroundPreview = !!this.data && this.data.avatar ? `${environment.IMAGE_URL}${this.data.avatar}` : null;
  }

  uploadFile(event: Event): void {

    this.file = (event.target as HTMLInputElement).files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => this.backgroundPreview = fileReader.result;
    fileReader.readAsDataURL(this.file);

    this.submitUploadFile();
  }

  private submitUploadFile(): void {

    let formData = new FormData();
    this.isLoadingAction = true;

    if (this.isAvatar) {

      formData.append('avatar', this.file);

      this.service.saveUserAvatar(formData, this.data.id)
        .pipe(finalize(() => this.isLoadingAction = false))
        .subscribe({
          next: () => {
            this.file = null;
            this.snackBar.open('Arquivo salvo com sucesso!', null, { duration: 2000});
            this.uploadedTheFile.emit();
          }
        });
    }
  }

  get noFileUpload(): boolean {
    return !this.file;
  }

  get backgroundImage(): string {
    const urlDefault = `/assets/icons/${this.isAvatar ? 'user.svg' : 'photo.svg'}`;
    return `url(${!!this.backgroundPreview ? this.backgroundPreview : urlDefault})`;
  }

}
