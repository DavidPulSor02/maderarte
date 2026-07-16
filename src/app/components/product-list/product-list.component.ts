import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

const WOODS = ['Roble', 'Nogal', 'Pino', 'Caoba'] as const;
const CATS = ['Mesas', 'Sillas', 'Estantes', 'Armarios'] as const;

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="catalog-layout">
      <aside class="filters-panel">
        <div class="filters-title">Filtrar</div>

        <div class="filter-group">
          <div class="filter-group-header"><h4>Tipo de madera</h4></div>
          @for (wood of woods; track wood) {
            <label class="filter-item">
              <input type="checkbox" [checked]="selectedWoods()[wood]" (change)="toggleWood(wood)" />
              <span>{{ wood }}</span>
            </label>
          }
        </div>

        <div class="filter-group">
          <div class="filter-group-header"><h4>Categoría</h4></div>
          @for (cat of cats; track cat) {
            <label class="filter-item">
              <input type="checkbox" [checked]="selectedCats()[cat]" (change)="toggleCat(cat)" />
              <span>{{ cat }}</span>
            </label>
          }
        </div>

        <div class="filter-group">
          <div class="filter-group-header"><h4>Precio máximo</h4></div>
          <div class="price-range">
            <input
              type="range"
              min="0"
              max="50000"
              step="500"
              [value]="priceMax()"
              (input)="priceMax.set(+$any($event.target).value)"
            />
            <div class="price-labels">
              <span>$ 0</span><span>$ {{ priceMax() | number: '1.0-0' }} MXN</span>
            </div>
          </div>
        </div>

        <button class="btn-clear" (click)="clearFilters()">Limpiar filtros</button>
      </aside>

      <section class="products-panel">
        <div class="products-toolbar">
          <p class="products-count">
            <span>{{ filteredProducts().length }}</span> productos
          </p>
        </div>

        @if (addedMsg()) {
          <div class="added-toast">✓ {{ addedMsg() }}</div>
        }

        @if (catalogError()) {
          <div class="catalog-error">{{ catalogError() }}</div>
        }

        @if (loading()) {
          <div class="catalog-loading">Cargando catálogo…</div>
        } @else if (filteredProducts().length === 0 && !catalogError()) {
          <div class="empty-catalog">
            <p>No encontramos muebles con esos filtros.</p>
            <button class="btn-clear" (click)="clearFilters()">Limpiar filtros</button>
          </div>
        }

        <div class="products-grid">
          @for (product of filteredProducts(); track product.id) {
            <article class="product-card">
              <div class="product-img">
                <img [src]="product.image" [alt]="product.name" (error)="onImgError($event)" />
                <span
                  class="badge-stock"
                  [ngClass]="product.status === 'available' ? 'badge-available' : 'badge-low'"
                >
                  {{ product.status === 'available' ? 'Disponible' : 'Bajo inventario' }}
                </span>
              </div>
              <div class="product-body">
                <div class="product-cat">{{ product.cat }}</div>
                <div class="product-name">{{ product.name }}</div>
                <p class="product-desc">{{ product.description }}</p>

                <div class="product-wood-row">
                  <label>Madera</label>
                  <select
                    [value]="woodChoice(product)"
                    (change)="setWood(product.id, $any($event.target).value)"
                  >
                    @for (wood of availableWoods(product); track wood) {
                      <option [value]="wood">{{ wood }}</option>
                    }
                  </select>
                </div>

                <div class="product-price-row">
                  <div>
                    <div class="price-label">Desde</div>
                    <div class="product-price">
                      $ {{ priceFor(product) | number: '1.0-0' }} <small>MXN</small>
                    </div>
                  </div>
                  <div class="product-stock">Stock: {{ product.stock }}</div>
                </div>

                <button class="btn-add" (click)="addToCart(product)">+ Agregar a cotización</button>
              </div>
            </article>
          }
        </div>
      </section>
    </div>
  `,
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = this.productService.products;
  loading = this.productService.loading;
  catalogError = this.productService.error;
  woods = WOODS;
  cats = CATS;

  priceMax = signal(50000);
  searchQuery = this.productService.search; // búsqueda compartida con el header
  addedMsg = signal('');

  selectedWoods = signal<Record<string, boolean>>(
    Object.fromEntries(WOODS.map((w) => [w, true]))
  );
  selectedCats = signal<Record<string, boolean>>(
    Object.fromEntries(CATS.map((c) => [c, true]))
  );

  // Madera elegida por tarjeta (id -> madera).
  private woodChoiceMap = signal<Record<number, string>>({});

  private activeWoods = computed(() =>
    WOODS.filter((w) => this.selectedWoods()[w])
  );

  filteredProducts = computed<Product[]>(() => {
    const activeWoods = this.activeWoods();
    const cats = this.selectedCats();
    const q = this.searchQuery().trim().toLowerCase();
    const max = this.priceMax();

    return this.products().filter((p) => {
      if (!cats[p.cat]) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;

      // Precios solo de las maderas seleccionadas que ofrece el producto.
      const prices = activeWoods
        .filter((w) => p.basePrice[w] !== undefined)
        .map((w) => p.basePrice[w]);
      if (prices.length === 0) return false; // ninguna madera seleccionada disponible

      const minPrice = Math.min(...prices);
      return minPrice <= max;
    });
  });

  /** Maderas del producto que además están activas en el filtro. */
  availableWoods(p: Product): string[] {
    const active = this.activeWoods();
    const list = Object.keys(p.basePrice).filter((w) => active.includes(w as any));
    return list.length ? list : Object.keys(p.basePrice);
  }

  woodChoice(p: Product): string {
    const chosen = this.woodChoiceMap()[p.id];
    const available = this.availableWoods(p);
    return chosen && available.includes(chosen) ? chosen : available[0];
  }

  priceFor(p: Product): number {
    return p.basePrice[this.woodChoice(p)] ?? Math.min(...Object.values(p.basePrice));
  }

  setWood(id: number, wood: string) {
    this.woodChoiceMap.set({ ...this.woodChoiceMap(), [id]: wood });
  }

  toggleWood(wood: string) {
    this.selectedWoods.set({ ...this.selectedWoods(), [wood]: !this.selectedWoods()[wood] });
  }

  toggleCat(cat: string) {
    this.selectedCats.set({ ...this.selectedCats(), [cat]: !this.selectedCats()[cat] });
  }

  clearFilters() {
    this.selectedWoods.set(Object.fromEntries(WOODS.map((w) => [w, true])));
    this.selectedCats.set(Object.fromEntries(CATS.map((c) => [c, true])));
    this.priceMax.set(50000);
    this.searchQuery.set('');
  }

  addToCart(p: Product) {
    const wood = this.woodChoice(p);
    this.cartService.addToCart(p, wood);
    this.addedMsg.set(`${p.name} (${wood}) agregado a la cotización`);
    setTimeout(() => this.addedMsg.set(''), 2500);
  }

  /** Si la imagen del producto no carga, muestra un placeholder de madera. */
  onImgError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img.dataset['fallback']) return; // evita bucle
    img.dataset['fallback'] = '1';
    img.src =
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="450">
          <rect width="600" height="450" fill="#EDE6D8"/>
          <text x="50%" y="50%" fill="#8B6B4A" font-family="serif" font-size="34"
            text-anchor="middle" dominant-baseline="middle">Muebles Zajo</text>
        </svg>`
      );
  }
}
