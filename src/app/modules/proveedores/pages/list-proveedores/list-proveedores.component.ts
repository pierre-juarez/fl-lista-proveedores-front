import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSidenav } from '@angular/material/sidenav';
import { ProveedoresService } from '../../services/proveedores.services';
import { Proveedor } from '../../interfaces/proveedor.interface';
import { ProveedorDetail } from '../../interfaces/proveedor-detail.interface';
import { Marca } from '../../interfaces/marca.interface';
import { catchError, switchMap, tap, throwError } from 'rxjs';

@Component({
  standalone: false,
  templateUrl: './list-proveedores.component.html',
  styleUrl: './list-proveedores.component.scss',
})
export class ListProveedoresComponent {
  displayedColumns: string[] = ['id', 'nombre', 'estado', 'correos', 'accion'];
  dataSource = new MatTableDataSource<Proveedor>([]);

  isSidebarAddOpen = false;
  isSidebarEditOpen = false;
  isSidebarViewOpen = false;
  estadoMock = 'Inactivo';
  proveedorSelected: ProveedorDetail | null = null;
  marcaSelected: Marca | null = null;
  correosList: string[] = [];

  proveedorSeleccionado: number | null = null;
  isActive = false;
  weekDays = [
    { id: 0, letter: 'D' },
    { id: 1, letter: 'L' },
    { id: 2, letter: 'M' },
    { id: 3, letter: 'M' },
    { id: 4, letter: 'J' },
    { id: 5, letter: 'V' },
    { id: 6, letter: 'S' },
  ];
  selectedDays = new Set<number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('sidebar') sidebar!: MatSidenav;
  @ViewChild('mailContainer', { static: false }) mailContainer!: ElementRef;

  constructor(private proveedoresService: ProveedoresService) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (
      !this.isSidebarAddOpen ||
      !this.isSidebarEditOpen ||
      !this.isSidebarViewOpen
    ) {
      document.documentElement.classList.remove('no-scroll');
    }
  }

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores() {
    this.proveedoresService.getProveedores().subscribe(
      (proveedores) => {
        console.log('Proveedores recibidos:', proveedores);
        this.dataSource = new MatTableDataSource(proveedores);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error al obtener proveedores:', error);
      }
    );
  }

  getCorreosDisplay(correos: string, containerWidth: number) {
    if (!correos) return { visible: [], count: 0 };

    const correoList = correos.split(',');
    let visibleCorreos = [];
    let count = correoList.length;

    // Simulación: Solo dejamos los primeros 2 visibles
    if (correoList.length > 2) {
      visibleCorreos = correoList.slice(0, 2);
      count = correoList.length - 2;
    } else {
      visibleCorreos = correoList;
      count = 0;
    }

    return { visible: visibleCorreos, count };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddSidebar() {
    document.documentElement.classList.add('no-scroll');
    this.isSidebarAddOpen = true;
  }

  closeAddSidebar() {
    document.documentElement.classList.remove('no-scroll');
    this.isSidebarAddOpen = false;
  }

  closeViewSidebar() {
    document.documentElement.classList.remove('no-scroll');
    this.isSidebarViewOpen = false;
  }

  closeEditSidebar() {
    document.documentElement.classList.remove('no-scroll');
    this.isSidebarEditOpen = false;
  }

  saveProveedor() {
    console.log('Guardando proveedor...');
    // TODO: Lógica para guardar
    this.closeAddSidebar();
  }

  dayMapping: { [key: string]: { id: number; letter: string } } = {
    DOMINGO: { id: 0, letter: 'D' },
    LUNES: { id: 1, letter: 'L' },
    MARTES: { id: 2, letter: 'M' },
    MIÉRCOLES: { id: 3, letter: 'M' },
    JUEVES: { id: 4, letter: 'J' },
    VIERNES: { id: 5, letter: 'V' },
    SÁBADO: { id: 6, letter: 'S' },
  };

  reverseMapping: { [id: number]: string } = {
    0: 'DOMINGO',
    1: 'LUNES',
    2: 'MARTES',
    3: 'MIÉRCOLES',
    4: 'JUEVES',
    5: 'VIERNES',
    6: 'SÁBADO',
  };

  loadDays(days: string) {
    this.selectedDays.clear();
    console.log('days:', days);

    days.split(',').forEach((day) => {
      const dayTrimmed = day.toUpperCase().trim();
      const dayObj = this.dayMapping[dayTrimmed];
      if (dayObj) {
        this.selectedDays.add(dayObj.id);
      }
    });

    console.log('selectedDays:', this.selectedDays);
  }

  toggleDay(id: number) {
    if (this.selectedDays.has(id)) {
      this.selectedDays.delete(id);
    } else {
      this.selectedDays.add(id);
    }

    if (this.proveedorSelected !== null) {
      this.proveedorSelected.DIAS_EJECUCION = this.getDays();
    }
    console.log(
      'Días de ejecución actualizados:',
      this.proveedorSelected!.DIAS_EJECUCION
    );
  }

  getDays(): string {
    return Array.from(this.selectedDays)
      .map((id) => this.reverseMapping[id] || id.toString())
      .join(',');
  }

  viewDetail(idProveedor: number) {
    this.resetData();
    this.proveedoresService
      .getProveedorById(idProveedor)
      .pipe(
        tap((proveedor) => {
          this.proveedorSelected = proveedor;
          this.correosList = proveedor.CORREO_PROVEEDOR.split(',');
          console.log('Proveedor detalle recibido:', proveedor);
        }),
        switchMap((proveedor) =>
          this.proveedoresService.getMarcaById(proveedor.MARCAS)
        ),
        tap((marca) => {
          this.marcaSelected = marca;
          console.log('Marca detalle recibido:', marca);
          document.documentElement.classList.add('no-scroll');
          this.isSidebarViewOpen = true;
          console.log('Sidebar abierto?', this.isSidebarViewOpen);
        }),
        catchError((error) => {
          console.error('Error en la carga de datos:', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  edit(idProveedor: number) {
    this.resetData();
    this.proveedoresService
      .getProveedorById(idProveedor)
      .pipe(
        tap((proveedor) => {
          this.proveedorSelected = proveedor;
          this.correosList = proveedor.CORREO_PROVEEDOR.split(',');
          this.loadDays(proveedor.DIAS_EJECUCION);
          console.log('Proveedor edit recibido:', proveedor);
          console.log('Días de ejecución:', proveedor.DIAS_EJECUCION);
        }),
        switchMap((proveedor) =>
          this.proveedoresService.getMarcaById(proveedor.MARCAS)
        ),
        tap((marca) => {
          this.marcaSelected = marca;
          console.log('Marca edit recibido:', marca);
          document.documentElement.classList.add('no-scroll');
          this.isSidebarEditOpen = true;
          console.log('Sidebar abierto?', this.isSidebarViewOpen);
        }),
        catchError((error) => {
          console.error('Error en la carga de datos:', error);
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  resetData() {
    this.proveedorSelected = null;
    this.marcaSelected = null;
    this.correosList = [];
    this.selectedDays.clear();
  }

  addEmail() {
    console.log('Agregar correo clickeado');
  }
}
