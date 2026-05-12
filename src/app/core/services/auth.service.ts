import {Injectable} from '@angular/core';
import {Token} from '../models/token';
import {AUTH_TOKEN_KEY_NAME} from '../constants/const';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public setToken(token: Token): boolean {
    if (!token || token.trim() === '') {
      return false
    }
    try {
      localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
      return true;
    } catch (error) {
      console.error('Error set token to localStorage:', error);
      return false;
    }
  }

  public getToken(): Token | null {
    try {
      const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
      if (token) {
        return token;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error get token to localStorage:', error);
      return null;
    }
  }

  public removeToken(): boolean {
    try {
      localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
      return true;
    } catch (error) {
      console.error('Error remove token to localStorage:', error);
      return false;
    }
  }
}

