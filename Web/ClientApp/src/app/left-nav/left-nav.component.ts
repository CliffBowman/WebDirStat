import { Component, OnInit } from '@angular/core';
import { TreemapService, IDriveInfo } from '../treemap/treemap.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss']
})
export class LeftNavComponent implements OnInit {

  constructor(private treemapService: TreemapService) {
  }

  public pathControl: FormControl;
  public drives: IDriveInfo[];

  public ngOnInit(): void {
    this.pathControl = new FormControl('C:\\Program Files');
    this.loadDrives();
  }

  private loadDrives(): void {
    this.treemapService.getDrives().subscribe((response: IDriveInfo[]) => {
      this.drives = response;
    });
  }

  public viewFolders() {
    //this.treemapService.getFolderStats(this.pathControl.value).subscribe((response: JSON) => {
    //  this.data = response;
    //}, error => console.error(error));

    // TODO
  }

  public viewFiles() {
    //this.treemapService.getFileStats(this.pathControl.value).subscribe((response: JSON) => {
    //  this.data = response;
    //}, error => console.error(error));

    // TODO
  }
}
