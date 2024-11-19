import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Film {
  id: string;
  logo: string;
  year: number;
  director: string;
  synopsis: string;
  gallery: string[];
  trailer: string;
  bgclip: string;  // Campo para o vídeo de fundo
  bgimg: string;
}

interface Character {
  id: string;
  name: string;
  navicon: string;  // Campo para o ícone do personagem
  films: Film[];
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  characterId: string = '';
  filmId: string = '';
  characterData: Character | undefined;  // Agora tipado corretamente
  filmData: Film | undefined;  // Tipo explícito para o filme
  films: Film[] = [];  // Tipo explícito para a lista de filmes
  navIcon: string = '';  // Campo para armazenar o ícone do personagem


  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    // Acompanhar os parâmetros da URL (ID do personagem e ID do filme)
    this.route.params.subscribe((params) => {
      this.characterId = params['characterId'];  // ID do personagem
      this.filmId = params['filmId'];  // ID do filme
      this.loadCharacterData();
    });
  }

  loadCharacterData(): void {
    // Carregar os dados do JSON
    this.http.get<Character[]>('assets/data/characters.json').subscribe((data) => {
      // Encontrar o personagem com base no characterId
      this.characterData = data.find((char) => char.id === this.characterId);

      if (this.characterData) {
        // Carregar o ícone de navegação (navicon) do personagem
        this.navIcon = this.characterData.navicon;

        // Encontrar o filme dentro da lista de filmes do personagem
        this.filmData = this.characterData.films.find((film) => film.id === this.filmId);
        this.films = this.characterData.films;  // Armazenar todos os filmes do personagem

        // Carregar o vídeo de fundo (bgclip) do filme selecionado

      }
    });
  }
}
