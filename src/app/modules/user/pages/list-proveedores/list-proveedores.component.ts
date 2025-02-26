import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';

interface Proveedor {
  id: string;
  value: string;
}

@Component({
  standalone: false,
  templateUrl: './list-proveedores.component.html',
  styleUrl: './list-proveedores.component.scss',
})
export class ListProveedoresComponent {
  displayedColumns: string[] = ['id', 'nombre', 'estado', 'correos', 'accion'];
  dataSource = new MatTableDataSource(PROVEEDORES_DATA);
  isSidebarAddOpen = false;
  isSidebarEditOpen = false;
  isSidebarViewOpen = false;
  estadoMock = 'Inactivo';
  proveedores: Proveedor[] = [
    { id: '1', value: 'Proveedor A' },
    { id: '2', value: 'Proveedor B' },
    { id: '3', value: 'Proveedor C' },
    { id: '4', value: 'Proveedor D' },
  ];
  proveedorSeleccionado: number | null = null;
  isActive = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('sidebar') sidebar!: MatSidenav;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    console.log('Proveedores:', this.proveedores);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddSidebar() {
    console.log('Abriendo ADD sidebar desde loader');
    this.isSidebarAddOpen = true;
    console.log('Sidebar abierto?', this.isSidebarAddOpen);
  }

  closeAddSidebar() {
    console.log('Cerrando ADD sidebar');
    this.isSidebarAddOpen = false;
  }

  closeViewSidebar() {
    console.log('Cerrando VIEW sidebar');
    this.isSidebarViewOpen = false;
  }

  closeEditSidebar() {
    console.log('Cerrando EDIT sidebar');
    this.isSidebarEditOpen = false;
  }

  saveProveedor() {
    console.log('Guardando proveedor...');
    // Lógica para guardar
    this.closeAddSidebar();
  }

  viewDetail(element: any) {
    console.log('Detalle de:', element);
    console.log('Abriendo VIEW sidebar desde loader');
    this.isSidebarViewOpen = true;
    console.log('Sidebar abierto?', this.isSidebarViewOpen);
  }

  edit(element: any) {
    console.log('Editando:', element);
    this.isSidebarEditOpen = true;
  }

  addEmail() {
    console.log('Agregar correo clickeado');
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
