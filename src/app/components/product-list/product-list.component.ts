import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="catalog-layout">
      <div class="filters-panel">
        <div class="filter-group">
          <div class="filter-group-header">
            <h4>Tipo de madera</h4><span>▲</span>
          </div>
          <div class="filter-item">
            <input type="checkbox" id="f-roble" checked (change)="filterProducts()">
            <label for="f-roble">Roble</label>
          </div>
          <div class="filter-item">
            <input type="checkbox" id="f-nogal" checked (change)="filterProducts()">
            <label for="f-nogal">Nogal</label>
          </div>
          <div class="filter-item">
            <input type="checkbox" id="f-pino" checked (change)="filterProducts()">
            <label for="f-pino">Pino</label>
          </div>
          <div class="filter-item">
            <input type="checkbox" id="f-caoba" checked (change)="filterProducts()">
            <label for="f-caoba">Caoba</label>
          </div>
        </div>
        <div class="filter-group">
          <div class="filter-group-header">
            <h4>Categoría</h4><span>▲</span>
          </div>
          <div class="filter-item">
            <input type="checkbox" id="f-mesas" checked (change)="filterProducts()">
            <label for="f-mesas">Mesas</label>
          </div>
          <div class="filter-item">
            <input type="checkbox" id="f-sillas" checked (change)="filterProducts()">
            <label for="f-sillas">Sillas</label>
          </div>
          <div class="filter-item">
            <input type="checkbox" id="f-estantes" checked (change)="filterProducts()">
            <label for="f-estantes">Estantes</label>
          </div>
          <div class="filter-item">
            <input type="checkbox" id="f-armarios" checked (change)="filterProducts()">
            <label for="f-armarios">Armarios</label>
          </div>
        </div>
        <div class="filter-group">
          <div class="filter-group-header">
            <h4>Rango de precio</h4><span>▲</span>
          </div>
          <div class="price-range">
            <input type="range" min="0" max="50000" [value]="priceMax()" step="500" (input)="updatePriceFilter($any($event.target).value)">
            <div class="price-labels"><span>$ 0</span><span>$ {{ priceMax() | number:'1.0-0' }} MXN</span></div>
          </div>
          <button class="btn-clear" (click)="clearFilters()">Limpiar filtros</button>
        </div>
      </div>
      <div class="products-panel">
        <p class="products-count">Mostrando <span>{{ filteredProducts().length }}</span> productos</p>
        <div class="products-grid">
          <div class="product-card" *ngFor="let product of filteredProducts()">
            <div class="product-img">
              <img [src]="product.image" [alt]="product.name" class="product-img-custom">
              <span class="badge-stock" [ngClass]="product.status === 'available' ? 'badge-available' : 'badge-low'">
                {{ product.status === 'available' ? 'Disponible' : 'Bajo inventario' }}
              </span>
            </div>
            <div class="product-body">
              <div class="product-cat">{{ product.cat }}</div>
              <div class="product-name">{{ product.name }}</div>
              <div class="product-wood-row">
                <label>Tipo de madera</label>
                <select [id]="'wood-' + product.id" (change)="updatePrice(product.id)">
                  <option *ngFor="let wood of Object.keys(product.basePrice)" [value]="wood">{{ wood }}</option>
                </select>
              </div>
              <div>
                <div style="font-size:.7rem;color:var(--text-light)">Desde</div>
                <div class="product-price" [id]="'price-' + product.id">
                  $ {{ product.basePrice['Roble'] | number:'1.0-0' }} <small>MXN</small>
                </div>
              </div>
              <button class="btn-add" (click)="addToCart(product.id)">+ Agregar a cotización</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products = this.productService.products;
  priceMax = signal(50000);
  
  filteredProducts = computed(() => {
    const woods = this.getSelectedWoods();
    const cats = this.getSelectedCats();
    
    return this.products().filter(p => {
      if (!cats.includes(p.cat)) return false;
      const price = Math.min(...Object.values(p.basePrice));
      if (price > this.priceMax()) return false;
      return true;
    });
  });

  Object = Object;

  getSelectedWoods(): string[] {
    const w: string[] = [];
    ['roble', 'nogal', 'pino', 'caoba'].forEach(x => {
      if ((document.getElementById('f-' + x) as HTMLInputElement)?.checked) {
        w.push(x.charAt(0).toUpperCase() + x.slice(1));
      }
    });
    return w;
  }

  getSelectedCats(): string[] {
    const c: string[] = [];
    ['mesas', 'sillas', 'estantes', 'armarios'].forEach(x => {
      if ((document.getElementById('f-' + x) as HTMLInputElement)?.checked) {
        c.push(x.charAt(0).toUpperCase() + x.slice(1));
      }
    });
    return c;
  }

  updatePriceFilter(val: string) {
    this.priceMax.set(parseInt(val));
  }

  filterProducts() {
    // Component updates automatically via computed
  }

  clearFilters() {
    ['f-roble', 'f-nogal', 'f-pino', 'f-caoba', 'f-mesas', 'f-sillas', 'f-estantes', 'f-armarios'].forEach(id => {
      (document.getElementById(id) as HTMLInputElement).checked = true;
    });
    this.priceMax.set(50000);
    (document.querySelector('.price-range input') as HTMLInputElement).value = '50000';
  }

  updatePrice(id: number) {
    const p = this.products().find(x => x.id === id);
    if (!p) return;
    const woodEl = document.getElementById('wood-' + id) as HTMLSelectElement;
    const wood = woodEl?.value || 'Roble';
    const priceEl = document.getElementById('price-' + id);
    if (priceEl) {
      priceEl.innerHTML = '$ ' + p.basePrice[wood].toLocaleString() + ' <small>MXN</small>';
    }
  }

  addToCart(id: number) {
    const p = this.products().find(x => x.id === id);
    if (!p) return;
    
    const woodEl = document.getElementById('wood-' + id) as HTMLSelectElement;
    const wood = woodEl?.value || 'Roble';
    
    console.log('Added to cart:', p.name, wood);
  }
}
