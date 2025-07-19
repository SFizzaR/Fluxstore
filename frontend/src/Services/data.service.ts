import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class dataService {
  private total: number = 0
  private pageSubject = new BehaviorSubject<string>('Shop');
  page$ = this.pageSubject.asObservable();

  setPage(page: string) {
    this.pageSubject.next(page);
    localStorage.setItem('currentPage', page);
  }

  loadInitialPage() {
    const saved = localStorage.getItem('currentPage');
    this.pageSubject.next(saved ? saved : 'Welcome');
  }

  setTotal(total: number) {
    this.total = total
  }

  getTotal(): number {
    return this.total
  }
}