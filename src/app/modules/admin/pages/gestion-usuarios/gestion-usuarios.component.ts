import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: false,
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.scss',
})
export class GestionUsuariosComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'estado',
    'email',
    'lastUpdated',
    'status',
    'accion',
  ];
  dataSource = new MatTableDataSource(LIST_USERS);
  isSidebarAddOpen = false;
  isSidebarEditOpen = false;
  isActive = false;

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

  edit(element: any) {
    this.isSidebarEditOpen = true;
    console.log('Editando:', element);
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

  closeEditSidebar() {
    console.log('Cerrando EDIT sidebar');
    this.isSidebarEditOpen = false;
  }
}

const LIST_USERS = [
  {
    id: 1,
    rol: 'Admin',
    nombre: 'Juan Perez Alvarez',
    email: 'juanperez@footloose.pe',
    lastUpdated: '2023-01-01',
    status: 'Activo',
  },
  {
    id: 2,
    rol: 'Visor',
    nombre: 'Juan Perez Alvarez',
    email: 'juanperez@footloose.pe',
    lastUpdated: '2023-01-01',
    status: 'Activo',
  },
  {
    id: 3,
    rol: 'Admin',
    nombre: 'Juan Perez Alvarez',
    email: 'juanperez@footloose.pe',
    lastUpdated: '2023-01-01',
    status: 'Activo',
  },
  {
    id: 4,
    rol: 'Visor',
    nombre: 'Juan Perez Alvarez',
    email: 'juanperez@footloose.pe',
    lastUpdated: '2023-01-01',
    status: 'Activo',
  },
  {
    id: 5,
    rol: 'Admin',
    nombre: 'Juan Perez Alvarez',
    email: 'juanperez@footloose.pe',
    lastUpdated: '2023-01-01',
    status: 'Activo',
  },
  {
    id: 6,
    rol: 'Visor',
    nombre: 'Juan Perez Alvarez',
    email: 'juanperez@footloose.pe',
    lastUpdated: '2023-01-01',
    status: 'Activo',
  },
];
