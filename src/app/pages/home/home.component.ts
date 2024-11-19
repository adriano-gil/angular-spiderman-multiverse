import { Component, AfterViewInit, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements AfterViewInit {



  // Método para lidar com o mouse entrando no cartão
  private handleMouseEnter(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    card.classList.add('s-card--hovered');

    // Atualiza o ID da div com a classe 's-main'
    const mainDiv = document.querySelector('.s-main') as HTMLElement;
    if (mainDiv) {
      mainDiv.id = `${card.id}-hovered`;
    }
  }

  // Método para lidar com o mouse saindo do cartão
  private handleMouseLeave(event: MouseEvent): void {
    const card = event.currentTarget as HTMLElement;
    card.classList.remove('s-card--hovered');

    // Reseta o ID da div com a classe 's-main'
    const mainDiv = document.querySelector('.s-main') as HTMLElement;
    if (mainDiv) {
      mainDiv.id = '';
    }
  }

  // Método para adicionar listeners aos cartões
  private addEventListenersToCards(): void {
    const cardElements = document.getElementsByClassName('s-card') as HTMLCollectionOf<HTMLElement>;

    Array.from(cardElements).forEach((card) => {
      card.addEventListener('mouseenter', (event) => this.handleMouseEnter(event));
      card.addEventListener('mouseleave', (event) => this.handleMouseLeave(event));
    });
  }

  // Método para selecionar o item do carrossel
  private selectCarouselItem(selectedButtonElement: HTMLElement): void {
    const selectedItem = selectedButtonElement.id;
    const carousel = document.querySelector('.s-cards-carousel') as HTMLElement;

    if (!carousel) return;  // Verifica se o carrossel existe no DOM

    const transform = carousel.style.transform;
    const rotateY = transform.match(/rotateY\((-?\d+deg)\)/i);

    if (rotateY) {
      const rotateYDeg = -120 * (Number(selectedItem) - 1);
      carousel.style.transform = transform.replace(rotateY[0], `rotateY(${rotateYDeg}deg)`);
    }

    // Atualiza o estado ativo dos botões
    const activeButtonElement = document.querySelector('.s-controller__button--active') as HTMLElement;
    if (activeButtonElement) {
      activeButtonElement.classList.remove('s-controller__button--active');
    }
    selectedButtonElement.classList.add('s-controller__button--active');
  }

  // Método para adicionar listeners aos botões
  private addEventListenersToButtons(): void {
    const buttonElements = document.getElementsByClassName('s-controller__button') as HTMLCollectionOf<HTMLElement>;

    Array.from(buttonElements).forEach((button) => {
      button.addEventListener('click', () => this.selectCarouselItem(button));
    });
  }

  // ngAfterViewInit é chamado após a visualização ser inicializada
    ngAfterViewInit(): void {
    // Inicializa os listeners de eventos para os cartões
    this.addEventListenersToCards();

    // Inicializa os listeners de eventos para os botões de controle do carrossel
    this.addEventListenersToButtons();
  }


}

