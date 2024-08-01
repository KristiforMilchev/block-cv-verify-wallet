import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import Web3 from 'web3';
import { isAddress } from 'web3-validator';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private router: Router) {}
  activeIndex: number = 1;
  formatDate(date: Date): string {
    let format = moment(date);
    var d = format.format('DD/MM/YY');
    return d == 'Invalid date' ? '--' : d;
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  NavigateTo(page: string) {
    this.router.navigate([page]);
  }

  currentPage(): string {
    return this.router.url;
  }

  navigateToReplace(page: string) {
    try {
      this.router
        .navigate([page], {
          replaceUrl: true,
        })
        .then((x) => {
          console.log('realoading');
          window.location.reload();
        })
        .catch((x) => {
          console.log(x);
        });
    } catch (ex) {
      console.log(ex);
    }
  }

  convertToGb(size?: number) {
    if (size == null) return 0;

    return size / 1024;
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  formatCurrencyStr(value: string): string {
    if (value == '') return '$ 0';
    const numberValue = parseFloat(value);

    if (!isNaN(numberValue)) {
      return numberValue.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return '$ 0';
    }
  }

  isValidETHAddress(address: string): boolean {
    return isAddress(address);
  }
}
