import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  standalone: false,
  templateUrl: './list-proveedores.component.html',
  styleUrl: './list-proveedores.component.scss',
})
export class ListProveedoresComponent {
  displayedColumns: string[] = ['id', 'nombre', 'estado', 'correos', 'accion'];
  dataSource = new MatTableDataSource(PROVEEDORES_DATA);
  isSidebarOpen = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('sidebar') sidebar!: MatSidenav;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSidebar() {
    console.log('Abriendo sidebar');
    this.isSidebarOpen = true;
  }

  closeSidebar() {
    console.log('Cerrando sidebar');
    this.isSidebarOpen = false;
  }

  viewDetail(element: any) {
    console.log('Detalle de:', element);
  }

  edit(element: any) {
    console.log('Editando:', element);
  }
}

const PROVEEDORES_DATA = [
  {
    id: 1,
    nombre: 'Adidas',
    estado: 'Activo',
    correos:
      'marilu.lzquierdo@adidas.com, othercrrreos@adidas.com, othkjafajkfajkfjkafjker@adidas.com',
    numberMail: 9,
  },
  {
    id: 2,
    nombre: 'Puma',
    estado: 'Activo',
    correos: 'camila.vela@puma.com',
    numberMail: 1,
  },
  {
    id: 3,
    nombre: 'Skechers',
    estado: 'Inactivo',
    correos: 'renzo.bernardo@skechers.com',
    numberMail: 1,
  },
  {
    id: 4,
    nombre: 'Ksdepor',
    estado: 'Activo',
    correos: 'rebates@people-grupodepor.com',
    numberMail: 1,
  },
  {
    id: 5,
    nombre: 'Calimod',
    estado: 'Inactivo',
    correos: 'kmorales@calimod.com.pe',
    numberMail: 1,
  },
  {
    id: 6,
    nombre: 'Test 6',
    estado: 'Activo',
    correos: 'test@test.com',
    numberMail: 1,
  },
  {
    id: 7,
    nombre: 'Fashionfitnessgroup',
    estado: 'Activo',
    correos: 'test@test.com',
    numberMail: 1,
  },
  {
    id: 8,
    nombre: 'Test 8',
    estado: 'Activo',
    correos: 'test@test.com',
  },
  {
    id: 9,
    nombre: 'Test 9',
    estado: 'Activo',
    correos: 'test@test.com',
    numberMail: 1,
  },
];
