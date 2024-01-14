import {Component, Input} from '@angular/core';
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {ConfirmationService} from "primeng/api";

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrl: './delete-btn.component.sass'
})
export class DeleteBtnComponent {

    @Input() id: number = 0;
    @Input() service: any;
    @Input() funcaoListar: any;

    protected readonly faTrash = faTrash;

    constructor(private confirmationService: ConfirmationService) { }

    delete(){
        this.confirmationService.confirm({
            header: 'Confirmação',
            message: 'Você tem certeza que deseja excluir?',
            accept: () => {
                this.service.delete(this.id, this.funcaoListar);
                this.confirmationService.close()
            },
            reject: () => {
                this.confirmationService.close()
            }
        })
    }

}
