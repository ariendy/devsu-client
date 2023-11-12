import {Component, OnInit} from '@angular/core';
import jsPDF from 'jspdf';
import {MovimientoService} from '../../services/movimiento.service';
import {Movimiento} from '../../models/movimiento.model';
import {MessageService} from '../../services/message.service';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {FileService} from '../../services/file.service';

@Component({
  selector: 'app-reporte-view',
  templateUrl: './reporte-view.component.html',
  styleUrls: ['./reporte-view.component.scss']
})
export class ReporteViewComponent implements OnInit {

  start: string;
  end: string;
  movimientos: Movimiento[];

  constructor(
    private movimientoService: MovimientoService,
    private messageservice: MessageService,
    private fileService: FileService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) {
  }

  ngOnInit(): void {
  }


  printPDF(): void {
    if (this.canGenerateReport()) {
      const pdf = new jsPDF();

      // Title
      pdf.setFontSize(16);
      pdf.text('Listado de Movimientos', 20, 20);

      // Table header
      pdf.setFontSize(10);
      const headers = ['Fecha', 'Cliente', 'Cuenta', 'Tipo', 'Saldo Inicial', 'Estado', 'Movimiento', 'Saldo Disponible'];
      const headersSpaces = [20, 20, 25, 22, 20, 21, 20, 20];
      const headerY = 30;
      headers.forEach((header, index) => {
        pdf.text(header, 10 + index * headersSpaces[index], headerY);
      });

      // Table data
      const data = [];

      this.movimientos.forEach(m => {
        data.push([
          this.datePipe.transform(m.fecha, 'dd/MM/yyyy'), m.cliente, m.numeroCuenta, m.tipoCuenta ?? '',
          this.currencyPipe.transform(m.saldoInicial), m.estadoCuenta ? 'True' : 'False',
          this.currencyPipe.transform(m.valor), this.currencyPipe.transform(m.saldo)
        ]);
      });

      const rowHeight = 10;
      const startY = headerY + 10;

      data.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          pdf.text(cell, 10 + cellIndex * headersSpaces[cellIndex], startY + rowIndex * rowHeight);
        });
      });

      // Save the PDF as a Blob
      const pdfBlob = pdf.output('blob');

      // Create a data URL from the Blob
      const pdfDataUrl = URL.createObjectURL(pdfBlob);

      // Open the data URL in a new tab
      window.open(pdfDataUrl, '_blank');
    }

  }

  buscarMovimientos(): void {
    if (this.validateData()) {
      this.movimientoService.getAllMovimientosByDateRange(this.start, this.end).subscribe((res: Movimiento[]) => {
        this.movimientos = res;
      },
        error => this.messageservice.sendErrorMessage(error.error));
    }

  }

  downloadJSON(): void {
    if (this.canGenerateReport()) {
      this.fileService.downloadJsonFile(this.movimientos, 'listado-de-movimientos.json');
    }
  }

  private validateData(): boolean {

    if (!this.start) {
      this.messageservice.sendErrorMessage('Por favor introduzca la fecha de inicio.');
      return false;
    }

    if (!this.end) {
      this.messageservice.sendErrorMessage('Por favor introduzca la fecha de fin.');
      return false;
    }


    return true;
  }

  private canGenerateReport(): boolean {
    if (!(this.movimientos && this.movimientos.length)) {
      this.messageservice.sendErrorMessage('No hay movimientos para generar el reporte.');
      return false;
    }
    return true;
  }

}
