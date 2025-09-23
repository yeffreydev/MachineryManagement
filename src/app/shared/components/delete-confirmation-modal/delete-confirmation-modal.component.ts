import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-confirmation-modal',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = 'Confirmar Eliminación';
  @Input() message: string = '¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.';
  @Input() itemName: string | undefined = '';

  @Output() confirmDelete = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();

  constructor(library: FaIconLibrary) {
    library.addIcons(faExclamationTriangle);
  }

  onConfirm(): void {
    this.confirmDelete.emit();
  }

  onCancel(): void {
    this.cancelDelete.emit();
  }
}