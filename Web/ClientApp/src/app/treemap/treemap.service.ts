import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreemapService {

  constructor(
    @Inject('BASE_URL') private baseUrl: string,
    private httpClient: HttpClient) {
  }

  public getFolderStats(path: string): Observable<JSON> {
    return this.httpClient.post<JSON>(`${this.baseUrl}FilesystemStats/GetFolderStats`, {
      path: path,
    });
  }

  public getFileStats(path: string): Observable<JSON> {
    return this.httpClient.post<JSON>(`${this.baseUrl}FilesystemStats/GetFileStats`, {
      path: path,
    });
  }
}
