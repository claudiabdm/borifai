import { Injectable } from '@angular/core';
import { PlaylistsService } from './playlists.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  openModal(targetModal){
    clearTimeout();
    targetModal.modal.nativeElement.firstElementChild.classList.add('reusable-modal--show');
    targetModal.modalVisible = true;
  };

  closeModal(targetModal){
    clearTimeout();
    targetModal.modal.nativeElement.firstElementChild.classList.remove('reusable-modal--show');
    setTimeout(()=> targetModal.modalVisible = false, 350);
  }


}
