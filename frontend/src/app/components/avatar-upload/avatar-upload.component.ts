import { Component, OnInit, Output } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-avatar-upload',
  templateUrl: './avatar-upload.component.html',
  styleUrls: ['./avatar-upload.component.css'],
})
export class AvatarUploadComponent implements OnInit {
  @Output() avatarUploaded = new EventEmitter();

  constructor(private fileUploadService: FileUploadService) {}

  avatar: File = null;

  ngOnInit(): void {}

  handleAvatarInput(files: FileList) {
    this.avatar = files.item(0);
  }

  uploadAvatar() {
    this.fileUploadService
      .postFile(this.avatar, 'avatar')
      .subscribe(() => this.avatarUploaded.emit(null));
  }
}
