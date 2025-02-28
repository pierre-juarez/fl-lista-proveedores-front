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
  // dataSource = new MatTableDataSource(PROVEEDORES_DATA);
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

  ngAfterViewInit() {
    // Vuelve a renderizar cuando el tamaño esté listo
    // setTimeout(() => {
    //   this.mailContainer.nativeElement.offsetWidth;
    // });
  }

  getProveedores() {
    this.proveedoresService.getProveedores().subscribe(
      (proveedores) => {
        console.log('Proveedores recibidos:', proveedores);
        this.dataSource = new MatTableDataSource(proveedores); // Asigna los datos a la tabla
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
    // Lógica para guardar
    this.closeAddSidebar();
  }

  viewDetail(idProveedor: number) {
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
    this.proveedoresService.getProveedorById(idProveedor).subscribe(
      (proveedor) => {
        this.proveedorSelected = proveedor;
        console.log('Proveedor detalle recibido:', proveedor);
      },
      (error) => {
        console.error('Error al obtener proveedor:', error);
      }
    );
    // this.proveedorSelected = element;
    document.documentElement.classList.add('no-scroll');
    this.isSidebarEditOpen = true;
  }

  addEmail() {
    console.log('Agregar correo clickeado');
  }
}
