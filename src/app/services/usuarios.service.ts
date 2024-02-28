import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  api = 'http://localhost:3000/usuarios'
  constructor(private http: HttpClient) { }

  buscarUsuarios() {
    return this.http.get<IUsuario[]>(this.api);
  }

  buscarUsuarioPorId(id: number) {
    return this.http.get<IUsuario>(`${this.api}/${id}`);
  }

  cadastrarEditarUsuario(usuario: IUsuario) {
    if (usuario.id) {
      return this.http.put(`${this.api}/${usuario.id}`, usuario);
    }
    return this.http.post(this.api, usuario);
  }

  removerUsuario(id:number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
